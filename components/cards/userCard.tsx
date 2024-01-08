import Link from "next/link";
import { FadeImg } from "../core/fadeImg";
import { Button } from "../ui/button";
import { clx } from "../../utils/libs";

interface UserCardTypeProps {
  name: string;
  username: string;
  image: string;
  userId: string;
  isProfile?: boolean;
  bio?: string;
}

const UserCard = ({
  name,
  username,
  image,
  userId,
  isProfile,
  bio,
}: UserCardTypeProps) => {
  return (
    <article
      className={clx(
        `user-card p-5 rounded-md transition-all duration-150 ease-in-out `,
        {
          "!px-5 !py-3": !isProfile,
        }
      )}
    >
      <Link href={`/profile/${userId}`}>
        <div className="flex gap-3 cursor-pointer group">
          <FadeImg
            src={image}
            className={clx(`w-12 h-12 object-fill rounded-full`, {
              "w-16 h-16 mr-1": isProfile,
            })}
          />
          <div className="flex flex-col ">
            <h3
              className={clx(`text-base-semibold text-light-1 `, {
                "text-heading2-bold": isProfile,
              })}
            >
              {name}
            </h3>
            <p
              className={`text-small-medium text-gray-1 group-hover:text-primary`}
            >
              @{username}
            </p>
          </div>
        </div>
        <div className="mt-4">
          <p className="text-light-1 text-base-medium">{bio}</p>
        </div>
      </Link>

      <div className={`${isProfile && "hidden"}`}>
        <Link href={`/profile/${userId}`}>
          <Button
            className="font-montserrat text-base-semibold tracking-tight px-5 !mt-0 leading-4 rounded-full"
            size={"sm"}
            type="submit"
          >
            View
          </Button>
        </Link>
      </div>
    </article>
  );
};

export default UserCard;
