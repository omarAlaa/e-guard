import { Card, CardContent, CardDescription, CardHeader } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, } from "@/components/ui/table"
import { CameraAlarm } from "@/lib/definitions"
import { formatTime } from "@/lib/utils"

type Props = {
    cameraAlarms: CameraAlarm[];
}

export default function CameraAlertsTable({ cameraAlarms }: Props) {
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
                            <TableHead>Type</TableHead>
                            <TableHead>Confidence</TableHead>
                            <TableHead>Status</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {cameraAlarms.map((alarm) => (
                            <TableRow key={alarm.id}>
                                <TableCell>{formatTime(alarm.detected_at)}</TableCell>
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