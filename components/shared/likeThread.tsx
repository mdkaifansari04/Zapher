"use client";

import { FadeImg } from "../core/fadeImg";
import { likeThread } from "../../libs/actions/thread.actions";

const LikeThread = ({
  threadId,
  userId,
  liked,
}: {
  threadId: string;
  userId: string;
  liked: boolean;
}) => {
  return (
    <FadeImg
      src={liked ? "/assets/heart-filled.svg" : "/assets/heart-gray.svg"}
      alt="heart"
      width={24}
      height={24}
      className="cursor-pointer object-contain"
      onClick={() => {
        likeThread(threadId, userId);
        console.log("liked");
      }}
    />
  );
};
export default LikeThread;
