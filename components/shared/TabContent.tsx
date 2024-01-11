import React from "react";
import ThreadCard from "../cards/threadCard";
import { fetchUserThreads } from "../../libs/actions/thread.actions";
import { fetchCommunityThreads } from "../../libs/actions/community.actions";

interface TabContentPropsType {
  id: string;
  currentUserId: string;
  accountType: "User" | "Community";
}

const TabContent = async ({
  id,
  currentUserId,
  accountType,
}: TabContentPropsType) => {
  let threads: any[] = [];

  if (accountType === "User") {
    const userThreads = await fetchUserThreads(id);

    if (userThreads !== undefined) {
      threads = userThreads;
    } else {
      return null; // Handle the case where userThreads is undefined
    }
  } else {
    const communityThreads = await fetchCommunityThreads(id);
    if (communityThreads !== undefined) {
      threads = communityThreads;
    } else {
      return null;
    }
  }

  return (
    <section className="mt-6 flex flex-col gap-3">
      {threads.length === 0 && (
        <p className="text-dark-2 text-base-medium mt-5">No thread found</p>
      )}
      {threads.map((thread) => (
        <ThreadCard
          key={thread._id}
          id={thread._id}
          currentUserId={currentUserId}
          parentId={thread.parentId}
          content={thread.text}
          author={thread.author}
          community={thread.community}
          createdAt={thread.createdAt}
          comments={thread.children}
        />
      ))}
    </section>
  );
};

export default TabContent;
