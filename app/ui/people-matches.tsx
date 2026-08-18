import { fetchFaceRecFeed, fetchPersonHistory } from "@/lib/data";
import PersonCard from "./person-card";

type Props = {
    query: string;
    camera: string;
}

export default async function PeopleMatches({ query, camera }: Props) {
    const faceRecFeed = await fetchFaceRecFeed(query, camera)

    return (
        <div className="mt-8 grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-3 lg:grid-cols-4">
            {faceRecFeed.map((person) => (
                <PersonCard person={person} key={person.id} />
            ))}
        </div>
    );
}