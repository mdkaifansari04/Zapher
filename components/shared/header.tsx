import { OrganizationSwitcher, SignOutButton, SignedIn } from "@clerk/nextjs";
import { FadeImg } from "../core/fadeImg";
import { APP_NAME } from "../../constants";
import { dark } from "@clerk/themes";
async function Header() {
  return (
    <nav className="fixed z-50  md:relative bg-secondary-500 md:bg-transparent md:border-[#27272A] md:!border-b-[0.001px] flex min-w-full justify-between items-center py-4 md:py-5 px-7 shadow-sm">
      <div className="flex gap-2 items-center">
        <FadeImg className="w-8 h-8" src="./logo.svg" />
        <span className="font-montserrat font-semibold leading-4">
          {APP_NAME}
        </span>
      </div>
      <div className="flex items-center justify-center">
        <div className="flex">
          <SignedIn>
            <SignOutButton>
              <div className="block cursor-pointer md:hidden">
                <FadeImg src="./assets/logout.svg" />
              </div>
            </SignOutButton>
          </SignedIn>
        </div>
        <div className="">
          <OrganizationSwitcher
            appearance={{
              baseTheme: dark,
              elements: {
                organizationSwitcherTrigger: "px-4 py-2 bg-secondary-500",
              },
            }}
          />
        </div>
      </div>
    </nav>
  );
}

export default Header;
