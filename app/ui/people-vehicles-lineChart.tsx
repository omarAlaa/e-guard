"use client";

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

import {
    Line,
    LineChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts";

const data = [
    { name: "12 am", people: 120, vehicles: 70 },
    { name: "3 am", people: 180, vehicles: 95 },
    { name: "6 am", people: 240, vehicles: 120 },
    { name: "9 am", people: 270, vehicles: 135 },
    { name: "12 pm", people: 280, vehicles: 140 },
    { name: "3 pm", people: 255, vehicles: 130 },
    { name: "6 pm", people: 230, vehicles: 118 },
    { name: "9 pm", people: 220, vehicles: 108 },
    { name: "12 am", people: 170, vehicles: 90 },
];

export default function PeopleVehicleLineChart() {
    return (
        <Card>
            <CardHeader className="pb-3">
                <CardDescription className="text-lg">
                    People and vehicle count — last 24h
                </CardDescription>
            </CardHeader>

            <CardContent className="flex flex-col gap-2 h-44">
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                        data={data}
                        margin={{
                            top: 10,
                            right: 5,
                            left: 5,
                            bottom: 10,
                        }}
                    >
                        <XAxis dataKey='name' />

                        <YAxis hide />

                        <Tooltip
                            cursor={false}
                            contentStyle={{
                                background: "#18181b",
                                border: "1px solid #3f3f46",
                                borderRadius: 8,
                            }}
                            labelStyle={{ color: "#fff" }}
                        />

                        <Line
                            type="monotone"
                            dataKey="people"
                            stroke="#14b8a6"
                            strokeWidth={3}
                            dot={false}
                            activeDot={{
                                r: 5,
                                fill: "#14b8a6",
                            }}
                        />

                        <Line
                            type="monotone"
                            dataKey="vehicles"
                            stroke="#f59e0b"
                            strokeWidth={3}
                            dot={false}
                            activeDot={{
                                r: 5,
                                fill: "#f59e0b",
                            }}
                        />
                    </LineChart>
                </ResponsiveContainer>

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