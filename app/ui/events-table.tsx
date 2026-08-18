import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { fetchEventsList } from "@/lib/data";
import EventRow from "./event-row";

export default async function EventsTable() {
    const events = await fetchEventsList()
    let criticalCount = 0, warningCount = 0

    events.forEach((event) => {
        if (event.severity === 'critical') criticalCount++
        else if (event.severity === 'warning') warningCount++
    }
    )

    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 px-4 py-3">
                <CardTitle className="text-sm font-semibold">
                    All events
                </CardTitle>

                <div className="flex items-center gap-2">
                    <Badge variant='destructive' className="p-3 text-md">
                        {criticalCount} critical
                    </Badge>

                    <Badge
                        variant="outline"
                        className="border-0 bg-yellow-950/80 p-3 text-md text-yellow-400"
                    >
                        {warningCount} warning
                    </Badge>
                </div>
            </CardHeader>

            <CardContent className="px-0 pb-0">
                <div className="flex flex-col gap-2">
                    {events.map((event) => (
                        <EventRow event={event} key={event.id} />
                    )
                    )}
                </div>
            </CardContent>
        </Card>
    );
}