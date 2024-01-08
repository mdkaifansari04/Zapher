"use client";
import Link from "next/link";
import { FadeImg } from "../core/fadeImg";
import { usePathname } from "next/navigation";
import { clx } from "../../utils/libs";
function MenuItem({
  imgURL,
  label,
  route,
}: {
  imgURL: string;
  label: string;
  route: string;
}) {
  const path = usePathname();
  const isActive = path === route;
  return (
    <Link href={route}>
      <div
        className={clx(
          "group flex flex-col sm:flex-col md:flex-row justify-center sm:justify-start gap-2 py-4 sm:p-5 items-center [&_svg]:transition-all [&_svg]:duration-200 [&_svg]:stroke-slate-300",
          {
            "[&_svg]:stroke-slate-50": !isActive,
          }
        )}
      >
        <FadeImg
          className={clx("w-5 h-5", {
            "fill-red-500 scale-110": isActive,
          })}
          src={imgURL}
        />
        <div
          className={clx("w-5 border-light-2 border-t-[0.1px] hidden", {
            "flex items-center md:hidden": isActive,
          })}
        ></div>
        <p
          className={clx(
            "hidden md:block text-sm -tracking-4% transition-all font-montserrat duration-150 group-hover:translate-x-0.5 lg:text-base group-hover:text-light-1",
            {
              "text-medium text-dark-2": !isActive,
              "text-primary text-body-semibold ": isActive,
            }
          )}
        >
          {label.split(" ")[0]}
        </p>
      </div>
    </Link>
  );
}
export default MenuItem;
