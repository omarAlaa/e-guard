'use client';

import { HourlyTraffic } from "@/lib/definitions";
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis, } from "recharts";

type Props = {
    data: HourlyTraffic[];
}

export default function PeopleVehicleChart({ data }: Props) {
    const formattedData = data.map((item) => ({
        name: new Date(item.hour_bucket).toLocaleTimeString([], {
            hour: "numeric",
            hour12: true,
        }),
        people: item.people_count,
        vehicles: item.vehicle_count,
    }));

    return (
        <ResponsiveContainer width="100%" height="100%">
            <LineChart
                data={formattedData}
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
    )
}