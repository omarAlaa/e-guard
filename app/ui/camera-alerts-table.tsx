import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, } from "@/components/ui/table"
import { fetchCameraAlarms } from "@/lib/data"
import { formatTime } from "@/lib/utils"

type Props = {
    id: string;
}

export default async function CameraAlertsTable({ id }: Props) {
    const cameraAlerts = await fetchCameraAlarms(id)

    return (
        <Card>
            <CardHeader className="pb-3">
                <CardDescription className="text-lg">
                    Recent detections on this camera
                </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-row items-center">
                <Table className="w-full table-fixed">
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-1/5">Time</TableHead>
                            <TableHead className="w-1/5">Type</TableHead>
                            <TableHead className="w-1/5">Confidence</TableHead>
                            <TableHead className="w-1/5">Status</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {cameraAlerts.map((alert) => (
                            <TableRow key={alert.detected_at}>
                                <TableCell>{formatTime(alert.detected_at)}</TableCell>
                                <TableCell>
                                    {alert.detection_type === 'fire' ?
                                        <Badge variant="destructive">Fire</Badge>
                                        :
                                        alert.detection_type === 'weapon' ?
                                            <Badge className="bg-yellow-50 text-yellow-700 dark:bg-yellow-950 dark:text-yellow-500">Weapon</Badge>
                                            :
                                            <Badge className="bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-500">{alert.detection_type[0] === 'F' ? 'Face' : 'Plate'} match</Badge>
                                    }
                                </TableCell>
                                <TableCell>{`${Math.round(alert.confidence || 100)}%`}</TableCell>
                                <TableCell className={alert.status === 'reviewed' || alert.status === 'cleared' ? '' : "text-destructive"}>{alert.status}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    )
}