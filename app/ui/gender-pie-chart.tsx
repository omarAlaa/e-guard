'use client';

import { Pie, PieChart, PieLabelRenderProps, PieSectorShapeProps, Sector, useActiveTooltipDataPoints, useIsTooltipActive, } from 'recharts';

type Props = {
    male: number;
    female: number;
}

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

export default function GenderPieChart({ male, female }: Props) {
    const formattedData = [
        { name: 'male', value: Number(male) },
        { name: 'female', value: Number(female) }
    ]

    return (
        <PieChart style={{ width: '100%', maxWidth: '300px', maxHeight: '30vh', aspectRatio: 1 }} responsive>
            <Pie
                data={formattedData}
                labelLine={false}
                label={renderCustomizedLabel}
                fill="#8884d8"
                dataKey="value"
                isAnimationActive
                shape={MyCustomPie}
            />
        </PieChart>
    )
}