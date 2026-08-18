'use client';

import { CamerasOverview } from "@/lib/definitions";
import dynamic from "next/dynamic";

const Map = dynamic(
    () => import("@/app/ui/map"),
    {
        ssr: false,
    }
);

type Props = {
    camerasData: CamerasOverview[];
}

export default function SiteMap({ camerasData }: Props) {
    return (
        <div>
            <h3 className="mb-4 text-sm font-semibold text-zinc-500 dark:text-zinc-300">
                Site map
            </h3>

            <div className="relative rounded-xl border border-zinc-700 bg-zinc-950 p-4">
                <Map camerasData={camerasData} />
            </div>

            <div className="mt-5 flex gap-6 text-sm text-zinc-500 dark:text-zinc-300">
                <div className="flex items-center gap-2">
                    <span className="h-2.5 w-2.5 rounded-full bg-emerald-500" />
                    <span>Online</span>
                </div>

                <div className="flex items-center gap-2">
                    <span className="h-2.5 w-2.5 rounded-full bg-red-500" />
                    <span>Offline</span>
                </div>
            </div>
        </div>
    );
}