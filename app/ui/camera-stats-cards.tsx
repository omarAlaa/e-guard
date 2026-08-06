import { Card, CardDescription, CardHeader, CardTitle, } from "@/components/ui/card"
import { ShieldAlert, TrendingUp, Users } from "lucide-react"

export default function CameraStatsCards() {
    return (
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
            <Card>
                <CardHeader>
                    <CardDescription className="flex flex-row gap-2 text-lg">
                        <Users />
                        <p>People now</p>
                    </CardDescription>
                    <CardTitle className="text-2xl">4,812</CardTitle>
                </CardHeader>
            </Card>

            <Card>
                <CardHeader>
                    <CardDescription className="text-lg">
                        <p>Male / female</p>
                    </CardDescription>
                    <CardTitle className="text-2xl">4,812</CardTitle>
                </CardHeader>
            </Card>

            <Card>
                <CardHeader>
                    <CardDescription className="flex flex-row gap-2 text-lg">
                        <TrendingUp />
                        <p>Peak today</p>
                    </CardDescription>
                    <CardTitle className="text-2xl">4,812</CardTitle>
                </CardHeader>
            </Card>

            <Card className="bg-red-950">
                <CardHeader>
                    <CardDescription className="flex flex-row gap-2 text-lg">
                        <ShieldAlert />
                        <p>Alerts today</p>
                    </CardDescription>
                    <CardTitle className="text-2xl">4,812</CardTitle>
                </CardHeader>
            </Card>
        </div>
    )
}