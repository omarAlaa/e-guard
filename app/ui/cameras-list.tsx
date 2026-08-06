import { ChevronRight, Funnel } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const cameras = [
    {
        name: "Gate 1 — north entrance",
        status: "online",
        people: 18,
    },
    {
        name: "Main lobby",
        status: "online",
        people: 42,
    },
    {
        name: "Warehouse gate 3",
        status: "offline",
        time: "6 min ago",
    },
    {
        name: "Parking lot B",
        status: "online",
        vehicles: 7,
    },
    {
        name: "Loading dock",
        status: "online",
        people: 3,
    },
];

export function CameraList() {
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
                {cameras.map((camera) => (
                    <Link
                        key={camera.name}
                        className="p-2 group flex w-full items-center justify-between rounded-lg hover:bg-zinc-800"
                        href={`cameras/${2}`}
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
                                        {camera.people
                                            ? `${camera.people} people`
                                            : `${camera.vehicles} vehicles`}
                                        {" • "}
                                        online
                                    </p>
                                ) : (
                                    <p className="text-sm text-red-400">
                                        offline • {camera.time}
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