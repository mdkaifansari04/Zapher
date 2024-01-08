import { getActivity } from "../../../libs/actions/thread.actions";
import { currentUser } from "@clerk/nextjs";
import { fetchUserById } from "../../../libs/actions/user.actions";
import { redirect } from "next/navigation";
import ActivityCard from "../../../components/cards/activityCard";

async function Page() {
  const user = await currentUser();
  if (!user) return redirect("/sign-in");
  const userInfo = await fetchUserById(user && user.id);

  if (!userInfo || !userInfo.onBoarded) {
    redirect("/onboarding");
  }
  const activity = await getActivity(userInfo._id);
  if (!activity) return null;
  return (
    <section className="">
      <h1 className="text-heading2-bold font-montserrat">Activity</h1>

      <div className="activity-section mt-9 flex flex-col gap-3">
        {activity.length === 0 && (
          <p className="text-dark-2 text-base-medium"> No activity found</p>
        )}
        {activity?.map((item: any) => (
          <ActivityCard
            key={item._id}
            image={item.author.image}
            author={item.author.name}
            threadId={item.parent}
          />
        ))}
      </div>
    </section>
  );
}

export default Page;
