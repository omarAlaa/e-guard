import AlertsTable from "@/app/ui/alerts-table";
import CameraLiveFeed from "@/app/ui/camera-live-feed";
import CameraStatsCards from "@/app/ui/camera-stats-cards";

export default function CameraPage() {
    return (
        <main className="flex flex-col gap-10">
            <CameraLiveFeed />

            <CameraStatsCards />

            <AlertsTable />
        </main>
    );
}