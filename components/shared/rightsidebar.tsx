import React from "react";

function RightSidebar() {
  return (
    <section className="hidden lg:flex custom-scrollbar-right border-[#27272A] !border-l-[0.001px] px-10 py-9 flex-col">
      <div className="flex flex-1 justify-start">
        <h1 className="text-2xl text-heading4-medium">Suggested Communities</h1>
      </div>
      <div className="flex flex-1 justify-start">
        <h1 className="text-2xl text-heading4-medium">Similar Minds</h1>
      </div>
    </section>
  );
}

export default RightSidebar;
