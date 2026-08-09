import CameraAlertsTable from "@/app/ui/camera-alerts-table";
import CameraLiveFeed from "@/app/ui/camera-live-feed";
import CameraStatsCards from "@/app/ui/camera-stats-cards";
import { fetchCameraAlarms, fetchCameraStats } from "@/lib/data";

export default async function CameraPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params

    const [cameraStats, cameraAlarms] = await Promise.all(
        [
            fetchCameraStats(id),
            fetchCameraAlarms(id)
        ]
    );

    return (
        <main className="flex flex-col gap-10">
            <CameraLiveFeed
                name={cameraStats.name}
                status={cameraStats.status}
                last_seen_at={cameraStats.last_seen_at}
            />

            <CameraStatsCards
                people_now={cameraStats.people_now}
                male_pct={cameraStats.male_pct}
                female_pct={cameraStats.female_pct}
                peak_today={cameraStats.peak_today}
                alerts_today={cameraStats.alerts_today}
            />

            <CameraAlertsTable cameraAlarms={cameraAlarms} />
        </main>
    );
}