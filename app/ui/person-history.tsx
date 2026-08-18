import { fetchPersonHistory } from "@/lib/data"
import { formatTime } from "@/lib/utils";

type Props = {
    person: string;
}

export default async function PersonHistory({ person }: Props) {
    const personHistory = await fetchPersonHistory(person)

    return (
        <div className="mt-8">
            <div className="flex items-center gap-3">
                <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-xs font-semibold ${personHistory[0].is_watchlisted ? 'bg-red-950 text-red-400' : 'bg-blue-950 text-blue-400'} `}>
                    {person === 'Unidentified' ? '?' : person.trim().split(/\s+/).map(w => w[0].toUpperCase()).join('')}
                </div>

                <div>
                    <p className="text-sm font-semibold text-zinc-500 dark:text-zinc-300">
                        {person} — appearance history
                    </p>

                    {personHistory[0].is_watchlisted && <p className="text-xs text-zinc-500 dark:text-zinc-300">
                        Flagged on watchlist
                    </p>}
                </div>
            </div>

            <div className="mt-3 border-t border-zinc-800" />

            <div>
                {personHistory.map((appearance) => (
                    <div
                        key={appearance.id}
                        className="grid grid-cols-[82px_1fr] items-center border-b border-zinc-800 py-2 text-zinc-500 dark:text-zinc-300"
                    >
                        <span className="text-xs">
                            {formatTime(appearance.matched_at)}
                        </span>

                        <span className="text-sm font-semibold">
                            {`${appearance.camera_name} — ${appearance.location}`}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    )
}