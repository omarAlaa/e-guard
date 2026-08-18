import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, } from "@/components/ui/table"
import { fetchAlarmsFeed } from "@/lib/data"
import { formatTime } from "@/lib/utils"

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
                <Table className="md:w-full md:table-fixed">
                    <TableHeader>
                        <TableRow>
                            <TableHead className="md:w-1/5">Time</TableHead>
                            <TableHead className="md:w-1/5">Camera</TableHead>
                            <TableHead className="md:w-1/5">Type</TableHead>
                            <TableHead className="md:w-1/5">Confidence</TableHead>
                            <TableHead className="md:w-1/5">Status</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {alarmsData.map((alarm) => (
                            <TableRow key={alarm.id}>
                                <TableCell>{formatTime(alarm.detected_at)}</TableCell>
                                <TableCell>{alarm.camera_name}</TableCell>
                                <TableCell>
                                    {alarm.detection_type === 'fire' ?
                                        <Badge variant="destructive">Fire</Badge>
                                        :
                                        <Badge className="bg-yellow-200 text-yellow-700 dark:bg-yellow-950 dark:text-yellow-500">Weapon</Badge>}
                                </TableCell>
                                <TableCell>{`${Math.round(alarm.confidence)}%`}</TableCell>
                                <TableCell className={alarm.status === 'unreviewed' ? "text-destructive" : ''}>{alarm.status}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    )
}