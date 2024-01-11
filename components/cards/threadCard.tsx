import { FadeImg } from "../core/fadeImg";
import Link from "next/link";
import { clx, formatDateString } from "../../utils/libs";
import ShareModal from "../shared/shareModal";
import RepostModal from "../shared/repostModal";
import CreateThreadDrawer from "../shared/repostModal";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerTrigger,
} from "../ui/drawer";
import CreateThreadForm from "../form/createThreadForm";
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
    image: string;
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
  let commentProfile: string[] = [];

  if (comments.length > 0) {
    comments.forEach((comment) => {
      if (!commentProfile.includes(comment.author.image)) {
        commentProfile.push(comment.author.image);
      }
    });
  }

  return (
    <div
      className={clx(
        `flex flex-col relative bg-dark-7 rounded-lg backdrop-blur-lg`,
        {
          "bg-transparent px-5 py-0": isComment,
          "p-5 pb-6": !isComment,
        }
      )}
    >
      <article className={clx(` flex flex-row  gap-x-3`)}>
        <div className="flex w-full flex-1 flex-row gap-4">
          <div className="flex flex-col items-center justify-between">
            <Link href={`/profile/${author.id}`} className="relative h-11 w-11">
              <FadeImg
                src={author.image}
                alt="user_community_FadeImg"
                className="cursor-pointer rounded-full"
              />
            </Link>

            <div className="thread-card_bar"> </div>
            <Link href={`/thread/${id}`}>
              <div className="flex z-10 ">
                {commentProfile.length > 0 ? (
                  <>
                    {commentProfile.map((comment, index) => (
                      <>
                        <FadeImg
                          key={index}
                          src={comment}
                          className={clx(`w-7 h-7 rounded-full relative my-1`, {
                            "left-2 shadow-sm": index === 0,
                            "right-1 shadow-md": index !== 0,
                            "!left-0 !right-0": commentProfile.length === 1,
                          })}
                        />
                      </>
                    ))}
                  </>
                ) : (
                  ""
                )}
              </div>
            </Link>
          </div>
          <div className="flex flex-col w-auto md:w-[65%] lg:w-[70%]">
            <h5 className="cursor-pointer text-base-semibold text-light-1">
              {author.name}
            </h5>
            <p className="mt-2 text-small-regular text-light-2 tracking-tight leading-5">
              {content}
            </p>
            <div className={`${isComment && "mb-10"} mt-5 flex flex-col gap-2`}>
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
                <CreateThreadDrawer
                  content={content}
                  iconImage="/assets/repost.svg"
                />
                <ShareModal
                  url={`${process.env.APP_URL}/thread/${id}`}
                  iconImage="/assets/share.svg"
                />
              </div>
            </div>

            {!isComment && comments.length > 0 && (
              <Link className="cursor-pointer" href={`/thread/${id}`}>
                <p className="text-subtle-medium text-slate-600 relative -bottom-3 -left-3">
                  {comments.length} {comments.length > 1 ? "Replies" : "Reply"}
                </p>
              </Link>
            )}
          </div>

          {isComment && comments.length > 0 && (
            <Link className="cursor-pointer" href={`/thread/${id}`}>
              <p className="mt-1 text-subtle-medium text-gray-1 !cursor-pointer">
                {comments.length} repl{comments.length > 1 ? "ies" : "y"}
              </p>
            </Link>
          )}
        </div>
      </article>
      <div className="relative">
        {community && (
          <div className="flex flex-row text-slate-600 mt-2 text-subtle-medium items-center gap-1">
            <p className="cursor cursor-pointer">
              {formatDateString(createdAt).toUpperCase()} -{" "}
              <Link href={`/community/${community.id}`}>
                <span className="hover:text-primary transition-all ease-in-out duration-150">
                  {community.name}
                </span>
              </Link>
            </p>
            <Link href={`/community/${community.id}`}>
              <FadeImg
                className="w-4 h-4 rounded-full cursor-pointer"
                src={community.image}
              />
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default ThreadCard;
