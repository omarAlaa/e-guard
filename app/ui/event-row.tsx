'use client';

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Spinner } from "@/components/ui/spinner";
import { changeAlertStatus } from "@/lib/actions";
import { Event } from "@/lib/definitions";
import { formatTime } from "@/lib/utils";
import { AlertTriangle, CctvOff, Clock, Flame, ScanFace, ScanSquare } from "lucide-react";
import { useState } from "react";

type Props = {
    event: Event;
}

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

export default function EventRow({ event }: Props) {
    const [loading, setLoading] = useState(false)

    const formattedEvent = {
        ...event,
        icon: event.event_type === 'fire' ? Flame : event.event_type === 'weapon' ? AlertTriangle : event.event_type === 'loitering' ? Clock : event.event_type === 'watchlist_face' ? ScanFace : event.event_type === 'watchlist_plate' ? ScanSquare : CctvOff,
        styles: event.severity === 'critical' ? eventStyles['critical'] : event.severity === 'info' ? eventStyles['info'] : eventStyles['warning']
    }

    const handleChangeStatus = async () => {
        setLoading(true)

        await changeAlertStatus(event.id, event.status === 'reviewed' ? 'escalated' : 'reviewed')

        setLoading(false)
    }
    return (
        <div
            key={formattedEvent.id}
            className={`flex min-h-[22 items-center gap-3 border-l-[3px] px-3 py-3 ${formattedEvent.styles.border}`}
        >
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-lg bg-zinc-800">
                <formattedEvent.icon
                    className={`h-5 w-5 ${formattedEvent.styles.icon}`}
                    strokeWidth={2}
                />
            </div>

            <div className="min-w-0 flex-1">
                <div className="text-sm font-semibold text-zinc-100">
                    {formattedEvent.message}
                </div>

                <div className="text-xs text-zinc-400">
                    <span className="font-medium text-zinc-300">
                        {formatTime(formattedEvent.occurred_at)}
                    </span>

                    <span> · </span>

                    {formattedEvent.event_type !== 'camera_offline' ?
                        <>
                            <span className="font-medium text-zinc-300">{Math.round(formattedEvent.confidence)}% confidence</span>

                            <span> · </span>

                            <span className="font-medium text-zinc-300">{formattedEvent.status}</span>
                        </>
                        :
                        <span className="font-medium text-zinc-300">system event</span>
                    }
                </div>
            </div>

            <div className="flex items-center gap-2">
                {formattedEvent.event_type !== 'camera_offline' && <Dialog>
                    <DialogTrigger
                        render={
                            <Button
                                variant="outline"
                                size="sm"
                                className="h-8 border-zinc-700 bg-transparent px-3 text-xs font-medium text-zinc-200 hover:bg-zinc-800 hover:text-white"
                            />
                        }
                    >
                        View clip
                    </DialogTrigger>

                    <DialogContent className="sm:max-w-2xl">
                        <DialogHeader>
                            <DialogTitle>{event.message}</DialogTitle>
                        </DialogHeader>

                        <div className="aspect-video w-full">
                            <iframe
                                src="https://www.youtube.com/embed/19g66ezsKAg"
                                allowFullScreen
                                className="h-full w-full rounded-md"
                            />
                        </div>
                    </DialogContent>
                </Dialog>}

                {formattedEvent.event_type !== 'camera_offline' && (
                    <Button
                        variant="outline"
                        size="sm"
                        className="h-8 border-zinc-700 bg-transparent px-3 text-xs font-medium text-zinc-200 hover:bg-zinc-800 hover:text-white"
                        onClick={handleChangeStatus}
                    >
                        {event.status === 'reviewed' ? 'Esclate' : 'Acknowledge'} {loading && <Spinner />}
                    </Button>
                )}
            </div>
        </div>
    )
}