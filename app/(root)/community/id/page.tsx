import { currentUser } from "@clerk/nextjs";
import { redirect, usePathname } from "next/navigation";
import { fetchUserById } from "../../../../libs/actions/user.actions";
import UserCard from "../../../../components/cards/userCard";
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "../../../../components/ui/tabs";
import { communityTabs, profileTabs } from "../../../../constants";
import { FadeImg } from "../../../../components/core/fadeImg";
import TabContent from "../../../../components/shared/TabContent";
import { fetchCommunityById } from "../../../../libs/actions/community.actions";
import User from "../../../../libs/model/user.model";

const Page = async ({ params }: { params: { id: string } }) => {
  const user = await currentUser();
  if (!user) return redirect("/sign-in");

  const userInfo = await User.findOne({ id: user.id });

  if (!userInfo || !userInfo.onBoarded) {
    redirect("/onboarding");
  }
  const community = await fetchCommunityById(params.id);

  if (!community) return null;
  return (
    <section className="w-full">
      <UserCard
        name={community.name}
        username={community.username}
        image={community.image}
        userId={community.id}
        bio={community.bio}
        cardType="Community"
        isProfile
      />
      <div className="mt-9">
        <Tabs className="w-full" defaultValue="threads">
          <TabsList className="w-full">
            {communityTabs.map((tab) => (
              <TabsTrigger className="tab" key={tab.value} value={tab.value}>
                <FadeImg src={tab.icon} className="w-5 h-5" />
                <p className="text-dark-2 hidden md:block">{tab.label}</p>
                {tab.value === "threads" && community.threads.length > 0 && (
                  <div className="w-5 h-5 bg-primary text-light-1 text-small-medium rounded-sm ml-2">
                    {community.threads.length}
                  </div>
                )}
              </TabsTrigger>
            ))}
          </TabsList>

          <TabsContent value="threads">
            <TabContent
              id={community.id}
              currentUserId={user.id}
              accountType="Community"
            />
          </TabsContent>

          <TabsContent value="members">
            <div className="mt-8">
              {community &&
                community.members.map((user: any) => (
                  <UserCard
                    key={user.id}
                    name={user.name}
                    username={user.username}
                    image={user.image}
                    userId={user.id}
                    bio={user.bio}
                    isProfile={false}
                  />
                ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
};

export default Page;
