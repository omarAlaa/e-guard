import { Card, CardContent, CardDescription, CardHeader } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

const ageGroups = [
    { label: "0-12", value: 8 },
    { label: "13-19", value: 14 },
    { label: "20-35", value: 39 },
    { label: "36-55", value: 28 },
    { label: "56+", value: 11 },
];

export default function AgeGroupsCard() {
    return (
        <Card>
            <CardHeader className="pb-3">
                <CardDescription className="text-lg">
                    Age groups detected
                </CardDescription>
            </CardHeader>

            <CardContent className="space-y-3">
                {ageGroups.map((group) => (
                    <div
                        key={group.label}
                        className="grid grid-cols-[42px_1fr_38px] items-center gap-3"
                    >
                        <span className="text-sm text-zinc-300">{group.label}</span>

                        <Progress
                            value={group.value}
                            className="bg-zinc-800"
                        />

                        <span className="text-right text-sm font-medium text-zinc-200">
                            {group.value}%
                        </span>
                    </div>
                ))}
            </CardContent>
        </Card>
    );
}