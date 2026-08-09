import { ChevronRight, Funnel } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { fetchCamerasOverview } from "@/lib/data";
import { formatTime } from "@/lib/utils";

export default async function CameraList() {
    const camerasData = await fetchCamerasOverview()

    return (
        <div>
            <div className="flex gap-3">
                <Input
                    placeholder="Search cameras"
                    className="bg-zinc-900 border-zinc-700"
                />

                <Button
                    size="icon"
                    variant="outline"
                    className="border-zinc-700 bg-zinc-900"
                >
                    <Funnel className="h-4 w-4" />
                </Button>
            </div>

            <div className="mt-6 space-y-5">
                {camerasData.map((camera) => (
                    <Link
                        key={camera.name}
                        className="p-2 group flex w-full items-center justify-between rounded-lg hover:bg-zinc-800"
                        href={`cameras/${camera.id}`}
                    >
                        <div className="flex items-start gap-3">
                            <span
                                className={`mt-2 h-2.5 w-2.5 rounded-full ${camera.status === "online"
                                    ? "bg-green-500"
                                    : "bg-red-500"
                                    }`}
                            />

                            <div className="text-left">
                                <p className="font-semibold text-white">
                                    {camera.name}
                                </p>

                                {camera.status === "online" ? (
                                    <p className="text-sm text-zinc-400">
                                        {`${camera.latest_people_count} people • ${camera.latest_vehicle_count} vehicles • online`}
                                    </p>
                                ) : (
                                    <p className="text-sm text-red-400">
                                        offline • since {formatTime(camera.last_seen_at)}
                                    </p>
                                )}
                            </div>
                        </div>

                        <ChevronRight className="h-5 w-5 text-zinc-500 group-hover:text-white transition" />
                    </Link>
                ))}
            </div>
        </div>
    );
}