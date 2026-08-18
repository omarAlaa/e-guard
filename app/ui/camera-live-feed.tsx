'use client';

import dynamic from "next/dynamic";

const Map = dynamic(
    () => import("@/app/ui/map"),
    {
        ssr: false,
    }
);

import { ArrowLeft, Play } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { getTimeAgo } from "@/lib/utils";
import { CameraStats } from "@/lib/definitions";

type Props = {
    cameraStats: CameraStats;
}

export default function CameraLiveFeed({ cameraStats }: Props) {
    return (
        <Card className="p-6">
            <div className="mb-8 flex items-start justify-between">
                <div className="flex items-start gap-3">
                    <Link href='/dashboard/cameras'>
                        <Button
                            variant="ghost"
                            size="icon"
                            className="mt-1 h-8 w-8 rounded-full"
                        >
                            <ArrowLeft className="h-5 w-5" />
                        </Button>
                    </Link>

                    <div>
                        <h2 className="text-3xl font-bold">{cameraStats.name}</h2>

                        <p className="text-sm text-zinc-400">
                            {`${cameraStats.status === 'online' ? 'Uptime' : 'Down'} ${getTimeAgo(cameraStats.last_seen_at)}`}
                        </p>
                    </div>
                </div>

                <div className="flex items-center gap-2">
                    <span className={`h-2.5 w-2.5 rounded-full ${cameraStats.status === 'online' ? 'bg-green-500' : 'bg-red-500'}`} />

                    <span className={`text-sm font-medium ${cameraStats.status === 'online' ? 'text-green-500' : 'text-red-500'}`}>
                        {cameraStats.status}
                    </span>
                </div>
            </div>

            <div className="grid gap-8 lg:grid-cols-[1fr_280px]">
                {
                    cameraStats.status === 'online' &&
                    <div>
                        <Badge className="mb-4" variant='destructive'>
                            Live
                        </Badge>

                        <div className="relative flex aspect-video items-center justify-center rounded-xl bg-black">
                            <iframe src="https://www.youtube.com/embed/19g66ezsKAg" allowFullScreen className="w-full h-full" />
                        </div>
                    </div>
                }

                <div className="h-98">
                    <h3 className="mb-5 text-sm font-semibold text-zinc-500 dark:text-zinc-300">
                        Location
                    </h3>

                    <Map camerasData={[cameraStats]} />
                </div>
            </div>
        </Card>
    )
}