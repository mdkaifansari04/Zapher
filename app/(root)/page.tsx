import { currentUser } from "@clerk/nextjs";
import { fetchUserById } from "../../libs/actions/user.actions";
import { redirect } from "next/navigation";
import { fetchAllThreads } from "../../libs/actions/thread.actions";
import ThreadCard from "../../components/cards/threadCard";

const Home = async () => {
  const user = await currentUser();
  if (!user) return redirect("/sign-in");

  const userInfo = await fetchUserById(user.id);
  if (!userInfo || !userInfo.onBoarded) {
    redirect("/onboarding");
  }

  const response = await fetchAllThreads(1, 10);

  return (
    <main className="overflow-y-auto">
      <h1 className="text-heading2-bold font-montserrat"> Home</h1>

      <section>
        {response && response.threads.length === 0 ? (
          <p className="text-dark-2 text-body-medium mt-10">No thread found</p>
        ) : (
          <div className="flex flex-col gap-3 my-11 ">
            {response?.threads.map((post) => (
              <ThreadCard
                key={post._id}
                id={post._id}
                currentUserId={user.id}
                parentId={post.parentId}
                content={post.text}
                author={post.author}
                community={post.community}
                createdAt={post.createdAt}
                comments={post.children}
              />
            ))}
          </div>
        )}
      </section>
    </main>
  );
};

export default Home;
