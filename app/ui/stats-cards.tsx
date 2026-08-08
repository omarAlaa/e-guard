import { Card, CardDescription, CardHeader, CardTitle, } from "@/components/ui/card"
import { fetchTotalKPIs } from "@/lib/data"
import { Car, Cctv, ShieldAlert, Users } from "lucide-react"

export default async function StatsCards() {
    const statsData = await fetchTotalKPIs()

    return (
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-5">
            <Card>
                <CardHeader>
                    <CardDescription className="flex flex-row gap-2 text-lg">
                        <Users />
                        <p>People today</p>
                    </CardDescription>
                    <CardTitle className="text-2xl">{statsData.people_today}</CardTitle>
                </CardHeader>
            </Card>

            <Card>
                <CardHeader>
                    <CardDescription className="text-lg">
                        <p>Male / female</p>
                    </CardDescription>
                    <CardTitle className="text-2xl">{`${statsData.male_today} / ${statsData.female_today}`}</CardTitle>
                </CardHeader>
            </Card>

            <Card>
                <CardHeader>
                    <CardDescription className="flex flex-row gap-2 text-lg">
                        <Car />
                        <p>Vehicles today</p>
                    </CardDescription>
                    <CardTitle className="text-2xl">{statsData.vehicles_today}</CardTitle>
                </CardHeader>
            </Card>

            <Card>
                <CardHeader>
                    <CardDescription className="flex flex-row gap-2 text-lg">
                        <Cctv />
                        <p>Cameras online</p>
                    </CardDescription>
                    <CardTitle className="text-2xl">{`${statsData.cameras_online} / ${statsData.cameras_total}`}</CardTitle>
                </CardHeader>
            </Card>

            <Card className="bg-red-950">
                <CardHeader>
                    <CardDescription className="flex flex-row gap-2 text-lg">
                        <ShieldAlert />
                        <p>Critical alerts</p>
                    </CardDescription>
                    <CardTitle className="text-2xl">{statsData.critical_alerts_open}</CardTitle>
                </CardHeader>
            </Card>
        </div>
    )
}