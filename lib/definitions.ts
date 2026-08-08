export type User = {
    id: string;
    name: string;
    email: string;
    password: string;
}

export type TotalKPIs = {
    people_today: number;
    male_today: number;
    female_today: number;
    vehicles_today: number;
    cameras_online: number;
    cameras_total: number;
    critical_alerts_open: number;
}

export type TotalAgeDistribution = {
    age_0_12: number;
    age_13_19: number;
    age_20_35: number;
    age_36_55: number;
    age_56_plus: number;
    total: number;
}

export type HourlyTraffic = {
    hour_bucket: string;
    people_count: number;
    vehicle_count: number;
}

export type GenderSplit = {
    male: number;
    female: number;
    total: number;
    male_pct: number;
    female_pct: number;
}

export type AlarmsFeed = {
    id: string;
    detected_at: string;
    detection_type: string;
    confidence: number;
    status: string;
    snapshot_url: string;
    camera_id: string;
    camera_name: string;
    camera_location: string;
}