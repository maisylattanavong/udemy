'use client'
import { BarChart4, MonitorPlay } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

const Sidebar = () => {
    const pathName = usePathname()
    const sidebarRoutes = [
        { icon: <MonitorPlay />, label: "Courses", path: "/instructor/courses" },
        { icon: <BarChart4 />, label: "Peformace", path: "instructor/performance" }
    ]
    return (
        <div className='max-sm:hidden h-screen flex flex-col w-64 border-r shadow-md px-3 py-4 gap-4 text-sm font-semibold'>
            {sidebarRoutes.map((route) => (
                <Link href={route.path} key={route.path}
                    className={`flex items-center gap-4 p-3 rounded-lg hover:bg-[#fff8eb]
                    ${pathName.startsWith(route.path) && "bg-[#fdab04] hover:bg-[fdab04]/90"}`}>
                    {route.icon}{route.label}
                </Link>
            ))}
        </div>
    )
}

export default Sidebar