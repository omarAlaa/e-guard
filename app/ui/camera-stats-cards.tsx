import { Card, CardDescription, CardHeader, CardTitle, } from "@/components/ui/card"
import { CameraStats } from "@/lib/definitions"
import { ShieldAlert, TrendingUp, Users } from "lucide-react"

type Props = {
    stats: CameraStats;
}

export default function CameraStatsCards({ stats }: Props) {
    return (
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
            <Card>
                <CardHeader>
                    <CardDescription className="flex flex-row gap-2 text-lg">
                        <Users />
                        <p>People now</p>
                    </CardDescription>
                    <CardTitle className="text-2xl">{stats.people_now}</CardTitle>
                </CardHeader>
            </Card>

            <Card>
                <CardHeader>
                    <CardDescription className="text-lg">
                        <p>Male / female</p>
                    </CardDescription>
                    <CardTitle className="text-2xl">
                        {`${Math.round(Number(stats.male_pct))}% / ${Math.round(Number(stats.female_pct))}%`}
                    </CardTitle>
                </CardHeader>
            </Card>

            <Card>
                <CardHeader>
                    <CardDescription className="flex flex-row gap-2 text-lg">
                        <TrendingUp />
                        <p>Peak today</p>
                    </CardDescription>
                    <CardTitle className="text-2xl">{stats.peak_today}</CardTitle>
                </CardHeader>
            </Card>

            <Card className="bg-red-950">
                <CardHeader>
                    <CardDescription className="flex flex-row gap-2 text-lg">
                        <ShieldAlert />
                        <p>Alerts today</p>
                    </CardDescription>
                    <CardTitle className="text-2xl">{stats.alerts_today}</CardTitle>
                </CardHeader>
            </Card>
        </div>
    )
}