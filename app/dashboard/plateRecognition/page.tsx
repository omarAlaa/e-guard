import CameraSelector from "@/app/ui/camera-selector";
import PlateRecTable from "@/app/ui/plate-rec-table";
import TimeSelector from "@/app/ui/time-selector";
import { Input } from "@/components/ui/input";

export default function PlateRecognitionPage() {
    return (
        <main className="flex flex-col gap-2">
            <Input placeholder="Search by plate number" />

            <CameraSelector />

            <TimeSelector />

            <PlateRecTable />
        </main>
    )
}