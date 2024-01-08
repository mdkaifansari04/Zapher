import React from "react";
import MenuItem from "../ui/MenuItem";
import { sidebarLinks } from "../../constants";
import { SignOutButton, SignedIn } from "@clerk/nextjs";
import { FadeImg } from "../core/fadeImg";

function LeftSidebar() {
  return (
    <section className="hidden md:flex min-h-screen border-dark-5 px-4 py-6 !border-r-[0.001px] ">
      <div className="flex flex-col gap-y-4 justify-between">
        <div className="flex flex-col gap-y-3">
          {sidebarLinks.map((i, index) => (
            <MenuItem key={index} {...i} />
          ))}
        </div>
        <div className="flex items-center">
          <SignedIn>
            <SignOutButton>
              <div className="group flex p-2 md:p-5 gap-2 cursor-pointer items-center">
                <FadeImg src="./assets/logout.svg" />
                <p className="hidden md:block text-sm -tracking-4% transition-all text-dark-2 font-montserrat duration-150 group-hover:translate-x-0.5 lg:text-base group-hover:text-light-1">
                  Logout
                </p>
              </div>
            </SignOutButton>
          </SignedIn>
        </div>
      </div>
    </section>
  );
}

export default LeftSidebar;
