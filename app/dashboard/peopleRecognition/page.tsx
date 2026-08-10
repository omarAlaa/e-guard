import CameraSelector from "@/app/ui/camera-selector";
import PeopleMatches from "@/app/ui/people-matches";
import TimeSelector from "@/app/ui/time-selector";
import { Input } from "@/components/ui/input";

export default function PeopleRecognitionPage() {
    return (
        <main className="flex flex-col gap-2">
            <Input placeholder="Search by name" />

            <CameraSelector />

            <TimeSelector />

            <PeopleMatches />
        </main>
    )
}