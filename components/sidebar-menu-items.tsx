'use client';
import { useSideBarToggle } from "@/components/hooks/use-sidebar-toggle";
import { SideNavItem } from "@/components/types/types";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const SideBarMenuItem = ({item}: {item: SideNavItem}) => {
    const {toggleCollapse}=useSideBarToggle();
    const linkStyle="flex items-center min-h-[40px] h-full text-black py-2 px-4 hover:text-white hover:bg-[#e1815b] hover:rounded-md transition duration-200"
    const activeLinkStyle="active rounded-md text-white bg-[#e1815b]";
    const ddLinkStyle=linkStyle;

    const pathName=usePathname();

    return(
        <>
        {
            item.submenu
                ? (<div className="rounded-md min-w-[18px]">
                    <a href="" className={ddLinkStyle}>
                        {item.icon}
                        {
                            !toggleCollapse &&   
                            <>
                            <span className="ml-3 text-base font-semibold">{item.title}</span>
                            </>
                        }
                    </a>
                </div>)
                : (<Link href={item.path} className={`${linkStyle} ${item.path===pathName?activeLinkStyle:''}`}>
                    {item.icon}
                    {!toggleCollapse && <span className="ml-3 text-sm font-semibold">{item.title}</span>}
                </Link>)
        }
        </>
    );
}