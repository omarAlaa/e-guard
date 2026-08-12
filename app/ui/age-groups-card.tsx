import { Card, CardContent, CardDescription, CardHeader } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

type AgeDistribution = {
    label: string;
    value: number;
}

interface Props {
    ageDistributionData: AgeDistribution[];
}

export default function AgeGroupsCard({ ageDistributionData }: Props) {
    return (
        <Card>
            <CardHeader className="pb-3">
                <CardDescription className="text-lg">
                    Age groups detected
                </CardDescription>
            </CardHeader>

            <CardContent className="space-y-3">
                {ageDistributionData.map((group) => (
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