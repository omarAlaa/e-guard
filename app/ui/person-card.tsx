"use client";

import { Badge } from "@/components/ui/badge";
import { FaceMatchRecord } from "@/lib/definitions";
import { formatTime } from "@/lib/utils";
import { useSearchParams, usePathname, useRouter } from 'next/navigation';

type Props = {
    person: FaceMatchRecord;
}

export default function PersonCard({ person }: Props) {
    const searchParams = useSearchParams()
    const pathName = usePathname()
    const { replace } = useRouter()

    const getPersonHistory = (person_name: string) => {
        const params = new URLSearchParams(searchParams)
        if (person_name) {
            params.set('person', person_name)
        }
        else {
            params.delete('query')
        }

        replace(`${pathName}?${params.toString()}`)
    }

    return (
        <div
            key={person.id}
            className="flex flex-col items-center text-center hover:cursor-pointer"
            onClick={() => getPersonHistory(person.person_name)}
        >
            <div
                className={`flex h-20 w-20 items-center justify-center rounded-full text-base font-semibold ${person.person_name === 'Unidentified' ? 'bg-gray-700 text-white' : person.is_watchlisted ? 'bg-red-950 text-red-400' : 'bg-blue-950 text-blue-400'}`}
            >
                {person.person_name === 'Unidentified' ? '?' : person.person_name.trim().split(/\s+/).map(w => w[0].toUpperCase()).join('')}
            </div>

            <p className="mt-2.5 text-sm font-semibold text-zinc-100">
                {person.person_name}
            </p>

            <p className="text-xs text-zinc-400">
                {person.camera_name} · {formatTime(person.matched_at)}
            </p>

            <div className="mt-2.5">
                {person.is_watchlisted ? (
                    <Badge
                        variant="destructive"
                        className="h-5 rounded-full px-2 text-[11px]"
                    >
                        Watchlist
                    </Badge>
                ) : person.person_name !== 'Unidentified' ? (
                    <span className="text-xs text-zinc-300">
                        {Math.round(person.confidence)}% match
                    </span>
                ) : (
                    <span className="text-xs text-zinc-400">No match</span>
                )}
            </div>
        </div>
    )
}