import { Card, CardContent, CardDescription, CardHeader, } from "@/components/ui/card";
import PeopleVehicleChart from "./people-vehicle-chart";
import { fetchCameraOccupancy } from "@/lib/data";

type Props = {
    id: string;
}

export default async function CameraOccupancy({ id }: Props) {
    const occupancy = await fetchCameraOccupancy(id)

    return (
        <Card>
            <CardHeader className="pb-3">
                <CardDescription className="text-lg">
                    Occupancy — last 24h
                </CardDescription>
            </CardHeader>

            <CardContent className="flex flex-col gap-2 h-44">
                <PeopleVehicleChart data={occupancy} />
            </CardContent>
        </Card>
    )
}