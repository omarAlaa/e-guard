"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';
import { LayoutDashboard, Cctv, ScanFace } from 'lucide-react';

const links = [
    { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
    {
        name: 'Cameras',
        href: '/dashboard/cameras',
        icon: Cctv,
    },
    { name: 'People Recognition', href: '/dashboard/peopleRecognition', icon: ScanFace },
];

export default function NavLinks() {
    const pathName = usePathname();

    return (
        <>
            {links.map((link) => {
                const LinkIcon = link.icon;
                return (
                    <Link
                        key={link.name}
                        href={link.href}
                        className={clsx("flex h-12 grow items-center justify-center gap-2 rounded-md bg-gray-50 dark:bg-zinc-800 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3",
                            { 'bg-sky-100 text-blue-600': link.href === pathName }
                        )}
                    >
                        <LinkIcon className="w-6" />
                        <p className="hidden md:block">{link.name}</p>
                    </Link>
                );
            })}
        </>
    );
}
