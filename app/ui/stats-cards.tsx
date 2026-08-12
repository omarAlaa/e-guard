import { Card, CardDescription, CardHeader, CardTitle, } from "@/components/ui/card"
import { Car, Cctv, ShieldAlert, Users } from "lucide-react"

type Props = {
    people_today: number;
    male_today: number;
    female_today: number;
    vehicles_today: number;
    cameras_online: number;
    cameras_total: number;
    critical_alerts_open: number;
}

export default function StatsCards({ people_today, male_today, female_today, vehicles_today, cameras_online, cameras_total, critical_alerts_open }: Props) {
    return (
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-5">
            <Card>
                <CardHeader>
                    <CardDescription className="flex flex-row gap-2 text-lg">
                        <Users />
                        <p>People today</p>
                    </CardDescription>
                    <CardTitle className="text-2xl">{people_today}</CardTitle>
                </CardHeader>
            </Card>

            <Card>
                <CardHeader>
                    <CardDescription className="text-lg">
                        <p>Male / female</p>
                    </CardDescription>
                    <CardTitle className="text-2xl">{`${male_today} / ${female_today}`}</CardTitle>
                </CardHeader>
            </Card>

            <Card>
                <CardHeader>
                    <CardDescription className="flex flex-row gap-2 text-lg">
                        <Car />
                        <p>Vehicles today</p>
                    </CardDescription>
                    <CardTitle className="text-2xl">{vehicles_today}</CardTitle>
                </CardHeader>
            </Card>

            <Card>
                <CardHeader>
                    <CardDescription className="flex flex-row gap-2 text-lg">
                        <Cctv />
                        <p>Cameras online</p>
                    </CardDescription>
                    <CardTitle className="text-2xl">{`${cameras_online} / ${cameras_total}`}</CardTitle>
                </CardHeader>
            </Card>

            <Card className="bg-red-950">
                <CardHeader>
                    <CardDescription className="flex flex-row gap-2 text-lg">
                        <ShieldAlert />
                        <p>Critical alerts</p>
                    </CardDescription>
                    <CardTitle className="text-2xl">{critical_alerts_open}</CardTitle>
                </CardHeader>
            </Card>
        </div>
    )
}