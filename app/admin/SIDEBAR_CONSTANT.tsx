import React from 'react'
import { SideNavItemGroup } from '../../components/types/types';
import { BsBookmarkCheck } from "react-icons/bs";
import { MdCategory, MdHistory } from 'react-icons/md';
import { BiCategory, BiUser, BiHomeAlt } from "react-icons/bi";
import { LuMicroscope } from "react-icons/lu";
import { GrVmMaintenance } from "react-icons/gr";

export const SIDENAV_ITEMS: SideNavItemGroup[] = [
    {
        title:'Menu',
        menuList:[
            {
                title: 'Dashboard',
                path:'/admin/dashboard',
                icon: <BiHomeAlt size={20}></BiHomeAlt>
            },
            {
                title: 'Lab Type',
                path:'/admin/labtype',
                icon: <BiCategory size={20}></BiCategory>
            },
            {
                title: 'Machines',
                path:'/admin/machines',
                icon: <LuMicroscope size={20}></LuMicroscope>
            },
            {
                title: 'Bookings',
                path:'/admin/bookings',
                icon: <BsBookmarkCheck size={20}></BsBookmarkCheck>
            },
            {
                title: 'Users',
                path:'/admin/users',
                icon: <BiUser size={20}></BiUser>
            }

        ]
    },
    {
        title:"Maintenance Management",
        menuList:[
            {
                title: 'Maintenance Type',
                path:'/admin/maintenancetype',
                icon: <MdCategory size={20}></MdCategory>
            },
            {
                title: 'Maintenance',
                path:'/admin/maintenance',
                icon: <GrVmMaintenance size={20}></GrVmMaintenance>
            },
            {
                title: 'Maintenance History',
                path:'/admin/maintenancehistory',
                icon: <MdHistory size={20}></MdHistory>
            },
        ]
    }
]

