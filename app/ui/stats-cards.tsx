import { Card, CardDescription, CardHeader, CardTitle, } from "@/components/ui/card"
import { Car, Cctv, ShieldAlert, Users } from "lucide-react"

export default function StatsCards() {
    return (
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-5">
            <Card>
                <CardHeader>
                    <CardDescription className="flex flex-row gap-2 text-lg">
                        <Users />
                        <p>People today</p>
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
                        <Car />
                        <p>Vehicles today</p>
                    </CardDescription>
                    <CardTitle className="text-2xl">4,812</CardTitle>
                </CardHeader>
            </Card>

            <Card>
                <CardHeader>
                    <CardDescription className="flex flex-row gap-2 text-lg">
                        <Cctv />
                        <p>Cameras online</p>
                    </CardDescription>
                    <CardTitle className="text-2xl">4,812</CardTitle>
                </CardHeader>
            </Card>

            <Card className="bg-red-950">
                <CardHeader>
                    <CardDescription className="flex flex-row gap-2 text-lg">
                        <ShieldAlert />
                        <p>Critical alerts</p>
                    </CardDescription>
                    <CardTitle className="text-2xl">4,812</CardTitle>
                </CardHeader>
            </Card>
        </div>
    )
}