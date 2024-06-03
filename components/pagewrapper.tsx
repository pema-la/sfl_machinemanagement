import classNames from 'classnames'
import React, { ReactNode } from 'react'
import { useSideBarToggle } from '@/components/hooks/use-sidebar-toggle';

export default function PageWrapper({children,}:{children:ReactNode}) {
    const { toggleCollapse} = useSideBarToggle();

    const PageStyle=classNames('bg-slate-50 flex-grow p-4 py-4 text-black mt-16',
        {
            ['sm:pl-[16rem]']:!toggleCollapse,
            // ['sm:pr-[1rem]']: !toggleCollapse,
            ['sm:pl-[6rem]']:toggleCollapse,
            // ['sm:pr-[.8rem]']:toggleCollapse
        }
    )
    return (
        <div className={PageStyle}>
        {children}
        </div>
    )
}


