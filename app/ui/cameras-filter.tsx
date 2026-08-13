'use client';

import { Button } from "@/components/ui/button";
import { Funnel } from "lucide-react";
import { Popover, PopoverContent, PopoverDescription, PopoverHeader, PopoverTitle, PopoverTrigger, } from "@/components/ui/popover";
import { Checkbox } from "@/components/ui/checkbox";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function CamerasFilter() {
    const { replace } = useRouter()
    const pathName = usePathname()
    const searchParams = useSearchParams()

    const currentStatus = searchParams.get("status")?.split(",").filter(Boolean) ?? []

    const toggleStatus = (status: "online" | "offline") => {
        const current = searchParams.get("status")?.split(",").filter(Boolean) ?? []
        const next = current.includes(status)
            ? current.filter((s) => s !== status)
            : [...current, status]
        const params = new URLSearchParams(searchParams)

        if (next.length > 0) {
            params.set("status", next.join(","))
        } else {
            params.delete("status")
        }

        replace(`${pathName}?${params.toString()}`)
    }

    return (
        <Popover>
            <PopoverTrigger
                render={
                    <Button size="icon" variant="outline">
                        <Funnel className="h-4 w-4" />
                    </Button>
                }
            />

            <PopoverContent align="end" className="w-auto">
                <PopoverHeader>
                    <PopoverTitle>Filter by status</PopoverTitle>

                    <PopoverDescription className="mt-4">
                        <label className="flex items-center text-sm cursor-pointer">
                            <Checkbox
                                id="online"
                                checked={currentStatus.includes("online")}
                                onCheckedChange={() => toggleStatus("online")}
                            />

                            <span className="h-2 w-2 rounded-full bg-emerald-500 ml-2 mr-1" />
                            Online
                        </label>

                        <label className="mt-2 flex items-center text-sm cursor-pointer">
                            <Checkbox
                                id="offline"
                                checked={currentStatus.includes("offline")}
                                onCheckedChange={() => toggleStatus("offline")}
                            />

                            <span className="h-2 w-2 rounded-full bg-red-500 ml-2 mr-1" />
                            Offline
                        </label>
                    </PopoverDescription>
                </PopoverHeader>
            </PopoverContent>
        </Popover>
    );
}