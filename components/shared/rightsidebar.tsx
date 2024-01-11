import React from "react";
import { fetchAllCommunity } from "../../libs/actions/community.actions";
import UserCard from "../cards/userCard";
import { fetchUserById, fetchUsers } from "../../libs/actions/user.actions";
import { redirect } from "next/navigation";
import { currentUser } from "@clerk/nextjs";

async function RightSidebar() {
  const user = await currentUser();
  if (!user) return redirect("/sign-in");
  const userInfo = await fetchUserById(user && user.id);

  if (!userInfo || !userInfo.onBoarded) {
    redirect("/onboarding");
  }

  const response = await fetchUsers(userInfo.id);
  const users = response ? response?.users : [];
  const communities = await fetchAllCommunity();
  return (
    <section className="hidden lg:flex custom-scrollbar-right border-[#27272A] !border-l-[0.001px] px-7 py-9 flex-col">
      <div className="flex flex-1 justify-start">
        <h1 className="text-2xl text-heading4-medium">Suggested Communities</h1>

        {/* <div className="mt-3">{communities.map(() => {})}</div> */}
      </div>
      <div className="flex flex-1 flex-col">
        <h1 className="text-2xl text-heading4-medium">Similar Minds</h1>
        <div className="flex flex-col gap-2 mt-10">
          {users?.map((user) => (
            <UserCard
              name={user.name}
              username={user.username}
              image={user.image}
              userId={user.id}
              key={user.id}
              className="!p-2"
              isSidebar
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default RightSidebar;
