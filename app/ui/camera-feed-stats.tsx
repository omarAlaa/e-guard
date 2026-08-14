import { fetchCameraStats } from "@/lib/data";
import CameraLiveFeed from "./camera-live-feed";
import CameraStatsCards from "./camera-stats-cards";

type Props = {
    id: string;
}

export default async function CameraFeedStats({ id }: Props) {
    const cameraStats = await fetchCameraStats(id)

    return (
        <>
            <CameraLiveFeed cameraStats={cameraStats} />

            <CameraStatsCards
                people_now={cameraStats.people_now}
                male_pct={cameraStats.male_pct}
                female_pct={cameraStats.female_pct}
                peak_today={cameraStats.peak_today}
                alerts_today={cameraStats.alerts_today}
            />
        </>
    )
}