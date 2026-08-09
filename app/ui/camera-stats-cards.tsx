import { Card, CardDescription, CardHeader, CardTitle, } from "@/components/ui/card"
import { CameraStats } from "@/lib/definitions"
import { ShieldAlert, TrendingUp, Users } from "lucide-react"

type Props = {
    people_now: string;
    male_pct: string;
    female_pct: string;
    peak_today: string;
    alerts_today: string;
}

export default function CameraStatsCards({ people_now, male_pct, female_pct, peak_today, alerts_today }: Props) {
    return (
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
            <Card>
                <CardHeader>
                    <CardDescription className="flex flex-row gap-2 text-lg">
                        <Users />
                        <p>People now</p>
                    </CardDescription>
                    <CardTitle className="text-2xl">{people_now}</CardTitle>
                </CardHeader>
            </Card>

            <Card>
                <CardHeader>
                    <CardDescription className="text-lg">
                        <p>Male / female</p>
                    </CardDescription>
                    <CardTitle className="text-2xl">
                        {`${Math.round(Number(male_pct))}% / ${Math.round(Number(female_pct))}%`}
                    </CardTitle>
                </CardHeader>
            </Card>

            <Card>
                <CardHeader>
                    <CardDescription className="flex flex-row gap-2 text-lg">
                        <TrendingUp />
                        <p>Peak today</p>
                    </CardDescription>
                    <CardTitle className="text-2xl">{peak_today}</CardTitle>
                </CardHeader>
            </Card>

            <Card className="bg-red-950">
                <CardHeader>
                    <CardDescription className="flex flex-row gap-2 text-lg">
                        <ShieldAlert />
                        <p>Alerts today</p>
                    </CardDescription>
                    <CardTitle className="text-2xl">{alerts_today}</CardTitle>
                </CardHeader>
            </Card>
        </div>
    )
}