'use client';

import { Card, CardContent, CardDescription, CardHeader } from '@/components/ui/card';
import { Pie, PieChart, PieLabelRenderProps, PieSectorShapeProps, Sector, useActiveTooltipDataPoints, useIsTooltipActive, } from 'recharts';

const data = [
    { name: 'Group A', value: 400 },
    { name: 'Group B', value: 300 },
];

const RADIAN = Math.PI / 180;
const COLORS = ['#0088FE', '#fb64b6'];

const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }: PieLabelRenderProps) => {
    if (cx == null || cy == null || innerRadius == null || outerRadius == null) {
        return null;
    }
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const ncx = Number(cx);
    const x = ncx + radius * Math.cos(-(midAngle ?? 0) * RADIAN);
    const ncy = Number(cy);
    const y = ncy + radius * Math.sin(-(midAngle ?? 0) * RADIAN);

    return (
        <text x={x} y={y} fill="white" textAnchor={x > ncx ? 'start' : 'end'} dominantBaseline="central">
            {`${((percent ?? 1) * 100).toFixed(0)}%`}
        </text>
    );
};

const MyCustomPie = (props: PieSectorShapeProps) => {
    const p = useActiveTooltipDataPoints();
    const isAnyPieActive = useIsTooltipActive();
    const isThisPieActive = isAnyPieActive && props.payload === p?.[0];
    let fillOpacity: number;
    if (isAnyPieActive && !isThisPieActive) {
        fillOpacity = 0.5;
    } else {
        fillOpacity = 1;
    }
    return (
        <Sector
            {...props}
            fill={COLORS[props.index % COLORS.length]}
            fillOpacity={fillOpacity}
            style={{ transition: 'fill-opacity 0.3s ease' }}
        />
    );
};

export default function GenderPieChart({ isAnimationActive = true }: { isAnimationActive?: boolean }) {
    return (
        <Card>
            <CardHeader className="pb-3">
                <CardDescription className="text-lg">
                    Gender split
                </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-row items-center">
                <PieChart style={{ width: '100%', maxWidth: '300px', maxHeight: '30vh', aspectRatio: 1 }} responsive>
                    <Pie
                        data={data}
                        labelLine={false}
                        label={renderCustomizedLabel}
                        fill="#8884d8"
                        dataKey="value"
                        isAnimationActive={isAnimationActive}
                        shape={MyCustomPie}
                    />
                </PieChart>

                <div className='flex flex-col gap-1 text-lg'>
                    <div className='flex flex-row items-center gap-2'>
                        <div className='w-3 h-3 bg-[#0088FE] rounded' />
                        Male — 57%
                    </div>
                    <div className='flex flex-row items-center gap-2'>
                        <div className='w-3 h-3 bg-[#fb64b6] rounded' />
                        Female — 43%
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}