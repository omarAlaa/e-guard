import { Card, CardContent, CardDescription, CardHeader } from '@/components/ui/card';
import GenderPieChart from './gender-pie-chart';
import { fetchGenderSplit } from '@/lib/data';

export default async function GenderCard() {
    const chartData = await fetchGenderSplit()

    return (
        <Card>
            <CardHeader className="pb-3">
                <CardDescription className="text-lg">
                    Gender split
                </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-row items-center">
                <GenderPieChart data={chartData} />

                <div className='flex flex-col gap-1 text-lg'>
                    <div className='flex flex-row items-center gap-2'>
                        <div className='w-3 h-3 bg-[#0088FE] rounded' />
                        Male — {Math.round(chartData.male_pct)}%
                    </div>
                    <div className='flex flex-row items-center gap-2'>
                        <div className='w-3 h-3 bg-[#fb64b6] rounded' />
                        Female — {Math.round(chartData.female_pct)}%
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}