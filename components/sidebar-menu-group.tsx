import { useSideBarToggle } from '@/components/hooks/use-sidebar-toggle'
import { SideNavItemGroup } from '@/components/types/types'
import React from 'react'
import { SideBarMenuItem } from './sidebar-menu-items';
import classNames from 'classnames';

const SideBarMenuGroup = ({menuGroup}:{menuGroup:SideNavItemGroup}) => {
    const {toggleCollapse} = useSideBarToggle();
    const menuGroupTitleStyle = classNames('py-2 font-medium uppercase text-xs text-[#A5A1AA]',
        {
            'text-center': toggleCollapse
        }
    )
    return (
        <>
            <h3 className={menuGroupTitleStyle}>{!toggleCollapse ? menuGroup.title : '...'}</h3>
            {
                menuGroup.menuList?.map((item,index)=>{
                    return <SideBarMenuItem key={index} item={item}></SideBarMenuItem>
                })
            }  
        </>
    )
}
export default SideBarMenuGroup
