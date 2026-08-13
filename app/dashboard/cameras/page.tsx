import { Card, CardContent } from "@/components/ui/card";
import CameraList from "@/app/ui/cameras-list";
import SiteMap from "@/app/ui/site-map";
import { fetchCamerasOverview } from "@/lib/data";

export default async function CamerasPage(props: {
    searchParams?: Promise<{
        query?: string;
        status?: string;
    }>;
}) {
    const searchParams = await props.searchParams
    const query = searchParams?.query || ''
    const statuses = searchParams?.status?.split(",")
    const camerasData = await fetchCamerasOverview(query, statuses)

    return (
        <Card>
            <CardContent className="p-6">
                <div className="grid gap-8 lg:grid-cols-[360px_1fr]">
                    <CameraList camerasData={camerasData} />
                    <SiteMap camerasData={camerasData} />
                </div>
            </CardContent>
        </Card>
    );
}