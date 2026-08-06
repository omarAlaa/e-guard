import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CameraList } from "@/app/ui/cameras-list";
import { SiteMap } from "@/app/ui/site-map";

export default function CamerasPage() {
    return (
        <Card className="bg-zinc-950 border-zinc-800">
            <CardContent className="p-6">
                <div className="grid gap-8 lg:grid-cols-[360px_1fr]">
                    <CameraList />
                    <SiteMap />
                </div>
            </CardContent>
        </Card>
    );
}