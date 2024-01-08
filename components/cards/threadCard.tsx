import React from "react";
import { FadeImg } from "../core/fadeImg";
import Link from "next/link";
import { clx } from "../../utils/libs";

interface CardProp {
  id: string;
  currentUserId: string;
  parentId: string;
  content: string;
  author: {
    name: string;
    image: string;
    id: string;
  };
  community: {
    id: string;
    name: string;
    FadeImg: string;
  } | null;
  createdAt: string;
  comments: [any];
  isComment?: boolean;
}
function ThreadCard({
  id,
  currentUserId,
  parentId,
  content,
  author,
  community,
  createdAt,
  comments,
  isComment,
}: CardProp) {
  return (
    <article
      className={clx(`bg-dark-7 flex flex-row rounded-lg gap-x-3 `, {
        "bg-transparent px-5 py-0": isComment,
        "p-5": !isComment,
      })}
    >
      <div className="flex w-full flex-1 flex-row gap-4">
        <div className="flex flex-col items-center">
          <Link href={`/profile/${author.id}`} className="relative h-11 w-11">
            <FadeImg
              src={author.image}
              alt="user_community_FadeImg"
              className="cursor-pointer rounded-full"
            />
          </Link>

          <div className="thread-card_bar" />
        </div>
        <div className="flex flex-col">
          <h5 className="cursor-pointer text-base-semibold text-light-1">
            {author.name}
          </h5>
          <p className="mt-2 text-small-regular text-light-2">{content}</p>
          <div className={`${isComment && "mb-10"} mt-5 flex flex-col gap-3`}>
            <div className="flex gap-3.5">
              <FadeImg
                src="/assets/heart-gray.svg"
                alt="heart"
                width={24}
                height={24}
                className="cursor-pointer object-contain"
              />
              <Link href={`/thread/${id}`}>
                <FadeImg
                  src="/assets/reply.svg"
                  alt="heart"
                  width={24}
                  height={24}
                  className="cursor-pointer object-contain"
                />
              </Link>
              <FadeImg
                src="/assets/repost.svg"
                alt="heart"
                width={24}
                height={24}
                className="cursor-pointer object-contain"
              />
              <FadeImg
                src="/assets/share.svg"
                alt="heart"
                width={24}
                height={24}
                className="cursor-pointer object-contain"
              />
            </div>
          </div>
        </div>

        {isComment && comments.length > 0 && (
          <Link href={`/thread/${id}`}>
            <p className="mt-1 text-subtle-medium text-gray-1">
              {comments.length} repl{comments.length > 1 ? "ies" : "y"}
            </p>
          </Link>
        )}
      </div>
    </article>
  );
}

export default ThreadCard;
