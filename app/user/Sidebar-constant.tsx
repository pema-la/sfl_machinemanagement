import React from "react";
import { SideNavItemGroup } from "../../components/types/types";
import { BsBookmarkCheck } from "react-icons/bs";
import { LuMicroscope } from "react-icons/lu";

export const SIDENAV_ITEMS: SideNavItemGroup[] = [
  {
    title: "Menu",
    menuList: [
      {
        title: "Book Machines",
        path: "/user/book-machines",
        icon: <LuMicroscope size={18}></LuMicroscope>,
      },
      {
        title: "My Bookings",
        path: "/user/my-bookings",
        icon: <BsBookmarkCheck size={18}></BsBookmarkCheck>,
      },
    ],
  },
];
