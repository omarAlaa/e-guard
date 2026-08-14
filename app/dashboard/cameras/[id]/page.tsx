import CameraAlertsTable from "@/app/ui/camera-alerts-table";
import CameraFeedStats from "@/app/ui/camera-feed-stats";
import CameraOccupancy from "@/app/ui/camera-occupancy";

export default async function CameraPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params

    return (
        <main className="flex flex-col gap-10">
            <CameraFeedStats id={id} />

            <CameraOccupancy id={id} />

            <CameraAlertsTable id={id} />
        </main>
    );
}