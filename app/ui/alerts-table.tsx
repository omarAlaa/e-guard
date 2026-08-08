import { Card, CardContent, CardDescription, CardHeader } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, } from "@/components/ui/table"
import { fetchAlarmsFeed } from "@/lib/data"

function formatTime(timestamp: string) {
    if (!timestamp) return ""
    const date = new Date(timestamp)

    return date.toLocaleTimeString("en-GB", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
    })
}

export default async function AlertsTable() {
    const alarmsData = await fetchAlarmsFeed()

    return (
        <Card>
            <CardHeader className="pb-3">
                <CardDescription className="text-lg">
                    Recent fire and weapon detections
                </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-row items-center">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Time</TableHead>
                            <TableHead>Camera</TableHead>
                            <TableHead>Type</TableHead>
                            <TableHead>Confidence</TableHead>
                            <TableHead>Status</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {alarmsData.map((alarm) => (
                            <TableRow key={alarm.id}>
                                <TableCell>{formatTime(alarm.detected_at)}</TableCell>
                                <TableCell>{alarm.camera_name}</TableCell>
                                <TableCell>{alarm.detection_type}</TableCell>
                                <TableCell>{`${Math.round(alarm.confidence)}%`}</TableCell>
                                <TableCell>{alarm.status}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    )
}