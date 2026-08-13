import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { formatTime } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";
import Search from "./search";
import { CamerasOverview } from "@/lib/definitions";
import CamerasFilter from "./cameras-filter";

type Props = {
    camerasData: CamerasOverview[];
}

export default function CameraList({ camerasData }: Props) {
    return (
        <div>
            <div className="flex gap-3">
                <Search />

                <CamerasFilter />
            </div>

            <ScrollArea className="mt-2 h-100 pr-3">
                {camerasData.map((camera) => (
                    <Link
                        key={camera.id}
                        className="p-2 group flex w-full items-center justify-between rounded-lg hover:bg-zinc-800"
                        href={`cameras/${camera.id}`}
                    >
                        <div className="flex items-center gap-3">
                            <span
                                className={`h-2.5 w-2.5 rounded-full ${camera.status === "online"
                                    ? "bg-green-500"
                                    : "bg-red-500"
                                    }`}
                            />

                            <div className="text-left justify-center">
                                <p className="font-semibold text-white">
                                    {camera.name}
                                </p>

                                {camera.status === "online" ? (
                                    <p className="text-sm text-zinc-400">
                                        {`${camera.latest_people_count} people / ${camera.latest_vehicle_count} vehicles • online`}
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
            </ScrollArea>
        </div>
    );
}