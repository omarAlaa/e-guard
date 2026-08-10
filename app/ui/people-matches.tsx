import { Badge } from "@/components/ui/badge";
import { fetchFaceRecFeed } from "@/lib/data";
import { formatTime } from "@/lib/utils";

// const people = [
//     {
//         id: 1,
//         initials: "JD",
//         name: "John Doe",
//         location: "Gate 1",
//         time: "2m ago",
//         match: null,
//         watchlist: true,
//         avatarClass: "bg-red-950 text-red-400",
//     },
//     {
//         id: 2,
//         initials: "MR",
//         name: "Maria Reyes",
//         location: "Lobby",
//         time: "8m ago",
//         match: 96,
//         watchlist: false,
//         avatarClass: "bg-blue-950 text-blue-400",
//     },
//     {
//         id: 3,
//         initials: "?",
//         name: "Unidentified",
//         location: "Dock",
//         time: "15m ago",
//         match: null,
//         watchlist: false,
//         avatarClass: "bg-zinc-800 text-zinc-400",
//     },
//     {
//         id: 4,
//         initials: "TK",
//         name: "Tom Klein",
//         location: "Gate 1",
//         time: "11m ago",
//         match: 91,
//         watchlist: false,
//         avatarClass: "bg-blue-950 text-blue-400",
//     },
// ];

export default async function PeopleMatches() {
    const faceRecFeed = await fetchFaceRecFeed()

    return (
        <div className="mt-8 grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-3 lg:grid-cols-4">
            {faceRecFeed.map((person) => (
                <div
                    key={person.id}
                    className="flex flex-col items-center text-center"
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
            ))}
        </div>
    );
}