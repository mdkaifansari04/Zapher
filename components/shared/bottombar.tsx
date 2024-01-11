import React from "react";
import MenuItem from "../ui/MenuItem";
import { sidebarLinks } from "../../constants";
function Bottombar() {
  return (
    <section className="fixed z-50 bottom-0 min-w-full md:hidden h-auto py-1 bg-secondary-500">
      <div className="flex justify-evenly">
        {sidebarLinks.map((i, index) => (
          <MenuItem key={index} {...i} />
        ))}
      </div>
    </section>
  );
}

export default Bottombar;
