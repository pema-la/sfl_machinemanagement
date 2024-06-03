"use client";
import classNames from "classnames";
import React from "react";
import { BsList } from "react-icons/bs";
import { useSideBarToggle } from "@/components/hooks/use-sidebar-toggle";
import { Profile } from "./profile";
import { UserNotifications } from "./user-notifictions";

export default function Header() {
  const { toggleCollapse, invokeToggleCollapse } = useSideBarToggle();
  const sidebarToggle = () => {
    invokeToggleCollapse();
  };
  const headerStyle = classNames(
    "bg-[#fff] fixed w-full px-4 z-[1] shadow-sm shadow-slate-500/40",
    {
      ["sm:pl-[15rem]"]: !toggleCollapse,
      ["sm:pl-[5rem]"]: toggleCollapse,
    }
  );

  return (
    <header className={headerStyle}>
      <div className="flex items-center justify-between h-16">
        <button
          onClick={sidebarToggle}
          className="order-2 sm:order-1 shrink-btn float-right bg-[#E1815B] bg-opacity-15 rounded-full ml-3 h-[30px] w-[30px] transition duration-300 ease-in-out flex items-center justify-center"
        >
          <BsList className="text-[#E1815B]" size={17} />
        </button>
        <div className="flex items-center justify-between sm:order-2 order-1">
          <div className="h-9 w-9 bg-orange-100 rounded-full">
            <UserNotifications></UserNotifications>
          </div>
          <div className="h-10 w-10 ml-2 bg-orange-100 rounded-full ">
            <Profile></Profile>
          </div>
        </div>
      </div>
    </header>
  );
}
