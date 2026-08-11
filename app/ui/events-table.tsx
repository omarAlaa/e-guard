import { AlertTriangle, CctvOff, Clock, Flame, ScanFace, ScanSquare, } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { fetchEventsList } from "@/lib/data";
import { formatTime } from "@/lib/utils";

const eventStyles = {
    critical: {
        border: "border-red-500",
        icon: "text-red-400",
    },
    warning: {
        border: "border-yellow-500",
        icon: "text-yellow-400",
    },
    info: {
        border: "border-zinc-700",
        icon: "text-zinc-400",
    },
};

export default async function EventsTable() {
    const events = await fetchEventsList()
    let eventsList = new Array(events.length)
    let criticalCount = 0, warningCount = 0

    events.forEach((event, index) => {
        if (event.severity === 'critical') criticalCount++
        else if (event.severity === 'warning') warningCount++

        eventsList[index] = {
            ...event,
            icon: event.event_type === 'fire' ? Flame : event.event_type === 'weapon' ? AlertTriangle : event.event_type === 'loitering' ? Clock : event.event_type === 'watchlist_face' ? ScanFace : event.event_type === 'watchlist_plate' ? ScanSquare : CctvOff,
            styles: event.severity === 'critical' ? eventStyles['critical'] : event.severity === 'info' ? eventStyles['info'] : eventStyles['warning']
        }
    }
    )

    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 px-4 py-3">
                <CardTitle className="text-sm font-semibold">
                    All events
                </CardTitle>

                <div className="flex items-center gap-2">
                    <Badge
                        variant="outline"
                        className="border-0 bg-red-950/80 p-3 text-md text-red-400"
                    >
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
                    {eventsList.map((event) => (
                        <div
                            key={event.id}
                            className={`flex min-h-[22 items-center gap-3 border-l-[3px] px-3 py-3 ${event.styles.border}`}
                        >
                            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-lg bg-zinc-800">
                                <event.icon
                                    className={`h-5 w-5 ${event.styles.icon}`}
                                    strokeWidth={2}
                                />
                            </div>

                            <div className="min-w-0 flex-1">
                                <div className="text-sm font-semibold text-zinc-100">
                                    {event.message}
                                </div>

                                <div className="text-xs text-zinc-400">
                                    <span className="font-medium text-zinc-300">
                                        {formatTime(event.occurred_at)}
                                    </span>

                                    <span> · </span>

                                    {event.event_type !== 'camera_offline' ?
                                        <>
                                            <span className="font-medium text-zinc-300">{Math.round(event.confidence)}% confidence</span>

                                            <span> · </span>

                                            <span className="font-medium text-zinc-300">{event.status}</span>
                                        </>
                                        :
                                        <span className="font-medium text-zinc-300">system event</span>
                                    }
                                </div>
                            </div>

                            <div className="flex shrink-0 items-center gap-2">
                                <Button
                                    variant="outline"
                                    size="sm"
                                    className="h-8 border-zinc-700 bg-transparent px-3 text-xs font-medium text-zinc-200 hover:bg-zinc-800 hover:text-white"
                                >
                                    {event.event_type === 'camera_offline' ? 'Diagnose' : 'View clip'}
                                </Button>

                                {event.event_type !== 'camera_offline' && (
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        className="h-8 border-zinc-700 bg-transparent px-3 text-xs font-medium text-zinc-200 hover:bg-zinc-800 hover:text-white"
                                    >
                                        {event.status === 'reviewed' ? 'Esclate' : 'Acknowledge'}
                                    </Button>
                                )}
                            </div>
                        </div>
                    )
                    )}
                </div>
            </CardContent>
        </Card>
    );
}