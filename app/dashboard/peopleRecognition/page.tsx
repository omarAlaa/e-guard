import CameraSelector from "@/app/ui/camera-selector";
import PeopleMatches from "@/app/ui/people-matches";
import PersonHistory from "@/app/ui/person-history";
import Search from "@/app/ui/search";
import TimeSelector from "@/app/ui/time-selector";

export default async function PeopleRecognitionPage(props: {
    searchParams?: Promise<{
        query?: string;
        camera?: string;
        person?: string;
    }>;
}) {
    const searchParams = await props.searchParams
    const query = searchParams?.query || ''
    const camera = searchParams?.camera || ''
    const person = searchParams?.person || ''

    return (
        <main className="flex flex-col gap-2">
            <Search placeholder="Search by name" />

            <CameraSelector />

            <TimeSelector />

            <PeopleMatches query={query} camera={camera} />

            {person && <PersonHistory person={person} />}
        </main>
    )
}