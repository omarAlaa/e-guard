import CameraSelector from "@/app/ui/camera-selector";
import PlateRecTable from "@/app/ui/plate-rec-table";
import Search from "@/app/ui/search";
import TimeSelector from "@/app/ui/time-selector";

export default async function PlateRecognitionPage(props: {
    searchParams?: Promise<{
        query?: string;
        camera?: string;
    }>;
}) {
    const searchParams = await props.searchParams
    const query = searchParams?.query || ''
    const camera = searchParams?.camera || ''

    return (
        <main className="flex flex-col gap-2">
            <Search placeholder="Search by plate number" />

            <CameraSelector />

            <TimeSelector />

            <PlateRecTable query={query} camera={camera} />
        </main>
    )
}