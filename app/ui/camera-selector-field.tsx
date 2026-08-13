"use client";

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, } from "@/components/ui/select";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

type Camera = {
    label: string;
    value: string;
}

type Props = {
    cameras: Camera[];
}

export default function CameraSelectorField({ cameras }: Props) {
    const router = useRouter()
    const pathname = usePathname()
    const searchParams = useSearchParams()

    const selectedCamera = searchParams.get("camera")

    function handleCameraChange(value: string) {
        const params = new URLSearchParams(searchParams.toString())

        if (value === "All cameras") {
            params.delete("camera")
        } else {
            params.set("camera", value)
        }

        router.replace(`${pathname}?${params.toString()}`)
    }

    return (
        <Select value={selectedCamera} onValueChange={(value) => handleCameraChange(value || 'All cameras')}>
            <SelectTrigger className="w-full">
                <SelectValue placeholder="All cameras" />
            </SelectTrigger>

            <SelectContent>
                <SelectItem value={null}>
                    All cameras
                </SelectItem>

                {cameras.map((camera) => (
                    <SelectItem
                        key={camera.value}
                        value={camera.value}
                    >
                        {camera.label}
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    );
}