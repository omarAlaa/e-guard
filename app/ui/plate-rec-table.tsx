import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, } from "@/components/ui/table"
import { fetchPlateRecFeed } from "@/lib/data"
import { formatTime } from "@/lib/utils"

export default async function PlateRecTable() {
    const plateRecData = await fetchPlateRecFeed()

    return (
        <Card className="mt-8">
            <CardHeader className="pb-3">
                <CardDescription className="text-lg">
                    Recent reads
                </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-row items-center">
                <Table className="md:w-full md:table-fixed">
                    <TableHeader>
                        <TableRow>
                            <TableHead className="md:w-1/5">Plate</TableHead>
                            <TableHead className="md:w-1/5">Vehicle</TableHead>
                            <TableHead className="md:w-1/5">Camera</TableHead>
                            <TableHead className="md:w-1/5">Time</TableHead>
                            <TableHead className="md:w-1/5">Status</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {plateRecData.map((item) => (
                            <TableRow key={item.id}>
                                <TableCell>{item.plate_number}</TableCell>
                                <TableCell>{`${item.vehicle_type}, ${item.vehicle_color}`}</TableCell>
                                <TableCell>{item.camera_name}</TableCell>
                                <TableCell>{formatTime(item.read_at)}</TableCell>
                                <TableCell>
                                    {item.status === 'flagged' ?
                                        <Badge variant="destructive">Flagged</Badge>
                                        :
                                        'Cleared'}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    )
}