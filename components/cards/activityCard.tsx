import React from "react";
import { FadeImg } from "../core/fadeImg";
import Link from "next/link";

interface ActivityCardPropType {
  image: string;
  author: string;
  threadId: string;
}

function ActivityCard({ image, author, threadId }: ActivityCardPropType) {
  return (
    <article className="activity-card bg-dark-6">
      <FadeImg src={image} className="w-6 h-6 rounded-full object-fill" />

      <p className=" text-light-2 !text-small-medium">
        <Link href={`/thread/${threadId}`}>
          <span className="tracking-tight text-primary mr-1 font-montserrat">
            {author}
          </span>
        </Link>
        replied to your post
      </p>
    </article>
  );
}

export default ActivityCard;
