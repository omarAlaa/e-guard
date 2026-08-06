import { ArrowLeft, Play } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function CameraLiveFeed() {
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
                        <h2 className="text-3xl font-bold">Main lobby</h2>

                        <p className="text-sm text-zinc-400">
                            Camera ID CAM-014 • uptime 14d 6h
                        </p>
                    </div>
                </div>

                <div className="flex items-center gap-2">
                    <span className="h-2.5 w-2.5 rounded-full bg-green-500" />

                    <span className="text-sm font-medium text-green-500">
                        Online
                    </span>
                </div>
            </div>

            <div className="grid gap-8 lg:grid-cols-[1fr_280px]">
                <div>
                    <Badge className="mb-4 bg-red-900 text-red-300 hover:bg-red-900">
                        Live
                    </Badge>

                    <div className="relative flex aspect-video items-center justify-center rounded-xl border border-zinc-800 bg-black">
                        <button className="flex h-16 w-16 items-center justify-center rounded-full border border-zinc-500 transition hover:scale-105">
                            <Play
                                className="ml-1 h-8 w-8 text-zinc-300"
                                fill="currentColor"
                            />
                        </button>
                    </div>
                </div>

                <div>
                    <h3 className="mb-4 text-sm font-semibold text-zinc-300">
                        Location
                    </h3>

                    <div className="relative h-[230px] rounded-xl border border-zinc-700 bg-zinc-950 p-4">
                        <div className="absolute left-4 top-4 h-12 w-[70px] rounded bg-zinc-800" />

                        <div className="absolute right-4 top-4 h-7 w-[80px] rounded bg-zinc-800" />

                        <div className="absolute bottom-5 left-4 h-11 w-[160px] rounded bg-zinc-800" />

                        <div className="absolute right-[70px] top-[18px]">
                            <span className="absolute inset-0 animate-ping rounded-full bg-emerald-500 opacity-40" />

                            <div className="relative flex h-6 w-6 items-center justify-center rounded-full bg-emerald-500">
                                <div className="h-3 w-3 rounded-full bg-zinc-900" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Card>
    )
}