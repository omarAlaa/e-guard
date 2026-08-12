import { Card, CardContent, CardDescription, CardHeader } from '@/components/ui/card';
import GenderPieChart from './gender-pie-chart';

type Props = {
    male: number;
    female: number;
    male_pct: number;
    female_pct: number;
}

export default function GenderCard({ male, female, male_pct, female_pct }: Props) {
    return (
        <Card>
            <CardHeader className="pb-3">
                <CardDescription className="text-lg">
                    Gender split
                </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col md:flex-row items-center">
                <GenderPieChart male={male} female={female} />

                <div className='flex flex-col gap-1 text-lg'>
                    <div className='flex flex-row items-center gap-2'>
                        <div className='w-3 h-3 bg-[#0088FE] rounded' />
                        Male — {Math.round(male_pct)}%
                    </div>
                    <div className='flex flex-row items-center gap-2'>
                        <div className='w-3 h-3 bg-[#fb64b6] rounded' />
                        Female — {Math.round(female_pct)}%
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}