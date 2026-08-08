import postgres from 'postgres';
import { AlarmsFeed, GenderSplit, HourlyTraffic, TotalAgeDistribution, TotalKPIs } from './definitions';

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

export async function fetchTotalKPIs() {
    try {
        const data = await sql<TotalKPIs[]>`SELECT * FROM v_dashboard_kpis`;

        return data[0];
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to fetch KPIs data.');
    }
}

export async function fetchTotalAgeDistribution() {
    try {
        const data = await sql<TotalAgeDistribution[]>`SELECT * FROM v_age_distribution_24h`;

        return [
            { label: "0-12", value: Math.round((data[0].age_0_12 / data[0].total) * 100) },
            { label: "13-19", value: Math.round((data[0].age_13_19 / data[0].total) * 100) },
            { label: "20-35", value: Math.round((data[0].age_20_35 / data[0].total) * 100) },
            { label: "36-55", value: Math.round((data[0].age_36_55 / data[0].total) * 100) },
            { label: "56+", value: Math.round((data[0].age_56_plus / data[0].total) * 100) },
        ];
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to fetch age groups data.');
    }
}

export async function fetchHourlyTraffic() {
    try {
        const data = await sql<HourlyTraffic[]>`SELECT * FROM v_hourly_traffic_merged_24h`;

        return data;
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to fetch line chart data.');
    }
}

export async function fetchGenderSplit() {
    try {
        const data = await sql<GenderSplit[]>`SELECT * FROM v_gender_split_24h`;

        return data[0];
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to fetch pie chart data.');
    }
}

export async function fetchAlarmsFeed() {
    try {
        const data = await sql<AlarmsFeed[]>`SELECT * FROM v_fire_weapon_feed`;

        return data;
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to fetch alarms data.');
    }
}