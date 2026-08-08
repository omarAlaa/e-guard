import { Card, CardContent, CardDescription, CardHeader, } from "@/components/ui/card";
import { fetchHourlyTraffic } from "@/lib/data";
import PeopleVehicleChart from "./people-vehicle-chart";

export default async function PeopleVehicleCard() {
    const chartData = await fetchHourlyTraffic()

    return (
        <Card>
            <CardHeader className="pb-3">
                <CardDescription className="text-lg">
                    People and vehicle count — last 24h
                </CardDescription>
            </CardHeader>

            <CardContent className="flex flex-col gap-2 h-44">
                <PeopleVehicleChart data={chartData} />

                <div className="flex gap-6 text-sm">
                    <div className="flex items-center gap-2">
                        <span className="h-1 w-3 rounded-full bg-teal-500" />
                        <span className="text-zinc-300">People</span>
                    </div>

                    <div className="flex items-center gap-2">
                        <span className="h-1 w-3 rounded-full bg-amber-500" />
                        <span className="text-zinc-300">Vehicles</span>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}