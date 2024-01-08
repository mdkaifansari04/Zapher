import React from "react";
import ThreadCard from "../cards/threadCard";
import { fetchUserThreads } from "../../libs/actions/thread.actions";

interface TabContentPropsType {
  userId: string;
  currentUserId: string;
  accountType: string;
}

const TabContent = async ({
  userId,
  currentUserId,
  accountType,
}: TabContentPropsType) => {
  const threads = await fetchUserThreads(userId);
  if (!threads) return null;
  return (
    <section className="mt-6 flex flex-col gap-3">
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
