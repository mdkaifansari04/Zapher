import SearchBar from "../../../components/form/search";
import { currentUser } from "@clerk/nextjs";
import { fetchUserById } from "../../../libs/actions/user.actions";
import { redirect, usePathname } from "next/navigation";
import { fetchAllCommunity } from "../../../libs/actions/community.actions";
import CommunityCard from "../../../components/cards/communityCard";
async function Page() {
  const user = await currentUser();
  if (!user) return redirect("/sign-in");
  const userInfo = await fetchUserById(user && user.id);
  if (!userInfo || !userInfo.onBoarded) {
    redirect("/onboarding");
  }

  const communities = await fetchAllCommunity();
  if (!communities) return null;
  return (
    <section className="">
      <h1 className="text-heading2-bold font-montserrat">Communities</h1>
      <SearchBar
        userId={user.id}
        placeholder={"Search community"}
        className="mt-6"
      />

      {communities.length === 0 ? (
        <p className="text-body-semibold text-dark-2 mt-14">
          No Communities found !
        </p>
      ) : (
        <div className="mt-7 grid grid-cols-1 md:grid-col-2 gap-4">
          {communities &&
            communities?.map((community: any) => (
              <CommunityCard
                key={community.id}
                id={community.id}
                bio={community.bio}
                imgUrl={community.image}
                name={community.name}
                members={community.members}
                username={community.username}
              />
            ))}
        </div>
      )}
    </section>
  );
}

export default Page;
