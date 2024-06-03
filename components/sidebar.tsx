import React, { useEffect, useState } from "react";
import Image from "next/image";
import { SIDENAV_ITEMS } from "@/app/admin/SIDEBAR_CONSTANT";
import { SideBarMenuItem } from "./sidebar-menu-items";
import classNames from "classnames";
import { useSideBarToggle } from "@/components/hooks/use-sidebar-toggle";
import SideBarMenuGroup from "./sidebar-menu-group";

export const Sidebar = () => {
  const [mounted, setMounted] = useState(false);
  const { toggleCollapse } = useSideBarToggle();
  const asideStyle = classNames(
    "sidebar overflow-y-auto overflow-x-auto fixed bg-white shadow-sm shadow-slate-500/40 z-[1] h-full transition duration-300 ease-in-out",
    {
      ["w-[15rem]"]: !toggleCollapse,
      ["sm:w-[5rem] sm:left-0 left-[-100%]"]: toggleCollapse,
    }
  );
  useEffect(() => setMounted(true), []);

  return (
    <aside className={asideStyle}>
      <div className="sidebar-top flex relative items-center py-4 px-4">
        {mounted && (
          <Image
            alt=""
            src={"/sfl_logo.png"}
            className="w-12 min-h-fit"
            height={35}
            width={35}
          ></Image>
        )}
        <h3
          className={classNames("pl-2 font-bold text-xl text-black min-w-max", {
            hidden: toggleCollapse,
          })}
        >
          JNW SFL
        </h3>
      </div>
      <nav className="flex flex-col gap-2 transition duration-300 ease-in-out">
        <div className="flex flex-col gap-2 px-4">
          {SIDENAV_ITEMS.map((item, idx) => {
            return (
              <SideBarMenuGroup key={idx} menuGroup={item}></SideBarMenuGroup>
            );
          })}
        </div>
      </nav>
    </aside>
  );
};
