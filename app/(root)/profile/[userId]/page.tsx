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
import { profileTabs } from "../../../../constants";
import { FadeImg } from "../../../../components/core/fadeImg";
import TabContent from "../../../../components/shared/TabContent";

const Page = async ({ params }: { params: { userId: string } }) => {
  const user = await currentUser();
  if (!user) return redirect("/sign-in");
  const userInfo = await fetchUserById(params.userId);

  if (!userInfo || !userInfo.onBoarded) {
    redirect("/onboarding");
  }

  return (
    <section className="w-full">
      <UserCard
        name={userInfo.name}
        username={userInfo.username}
        image={userInfo.image}
        userId={userInfo.id}
        bio={userInfo.bio}
        isProfile
      />
      <div className="mt-9">
        <Tabs className="w-full" defaultValue="threads">
          <TabsList className="w-full">
            {profileTabs.map((tab) => (
              <TabsTrigger className="tab" key={tab.value} value={tab.value}>
                <FadeImg src={tab.icon} className="w-5 h-5" />
                <p className="text-dark-2 hidden md:block">{tab.label}</p>
                {tab.value === "threads" && userInfo.threads.length > 0 && (
                  <div className="w-5 h-5 bg-primary text-light-1 text-small-medium rounded-sm ml-2">
                    {userInfo.threads.length}
                  </div>
                )}
              </TabsTrigger>
            ))}
          </TabsList>

          {profileTabs.map((tab) => (
            <TabsContent key={tab.value} value={tab.value}>
              <TabContent
                userId={userInfo.id}
                currentUserId={user.id}
                accountType="User"
                key={tab.value}
              />
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  );
};

export default Page;
