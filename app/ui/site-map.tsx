export function SiteMap() {
    return (
        <div>
            <h3 className="mb-4 text-sm font-semibold text-zinc-300">
                Site map
            </h3>

            <div className="relative h-[250px] rounded-xl border border-zinc-700 bg-zinc-950 p-4">

                {/* Building */}

                <div className="absolute left-4 top-4 h-[70px] w-[100px] rounded bg-zinc-800" />

                <div className="absolute right-4 top-4 h-[40px] w-[120px] rounded bg-zinc-800" />

                <div className="absolute left-4 top-[92px] h-[60px] w-[240px] rounded bg-zinc-800" />

                <div className="absolute left-4 bottom-4 h-[48px] w-[110px] rounded bg-zinc-800" />

                {/* Cameras */}

                <div className="absolute left-8 top-8 h-3 w-3 rounded-full bg-emerald-500" />

                <div className="absolute right-88 top-8 h-3 w-3 rounded-full bg-emerald-500" />

                <div className="absolute right-10 top-[120px] h-3 w-3 rounded-full bg-emerald-500" />

                <div className="absolute left-8 top-[96px] h-3 w-3 rounded-full bg-red-500" />

                <div className="absolute left-[80px] bottom-10 h-3 w-3 rounded-full bg-emerald-500" />
            </div>

            <div className="mt-5 flex gap-6 text-sm">
                <div className="flex items-center gap-2">
                    <span className="h-2.5 w-2.5 rounded-full bg-emerald-500" />
                    <span className="text-zinc-400">Online</span>
                </div>

                <div className="flex items-center gap-2">
                    <span className="h-2.5 w-2.5 rounded-full bg-red-500" />
                    <span className="text-zinc-400">Offline</span>
                </div>
            </div>
        </div>
    );
}