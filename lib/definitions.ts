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
    male_pct: number;
    female_pct: number;
    age_0_12: number;
    age_13_19: number;
    age_20_35: number;
    age_36_55: number;
    age_56_plus: number;
    vehicles_today: number;
    cameras_online: number;
    cameras_total: number;
    critical_alerts_open: number;
}

export type HourlyTraffic = {
    hour_bucket: string;
    people_count: number;
    vehicle_count: number;
}

export type AlarmsFeed = {
    id: string;
    detected_at: string;
    camera_name: string;
    detection_type: string;
    confidence: number;
    status: string;
}

export type CamerasOverview = {
    id: string;
    name: string;
    status: string;
    latest_people_count: number;
    latest_vehicle_count: number;
    last_seen_at: string;
}

export type CameraStats = {
    name: string;
    status: string;
    last_seen_at: string;
    people_now: string;
    peak_today: string;
    male_pct: string;
    female_pct: string;
    alerts_today: string;
}

export type CameraAlarm = {
    id: string;
    detected_at: string;
    detection_type: string;
    confidence: number;
    status: string;
}

export type Camera = {
    id: string;
    name: string;
}

export type FaceMatchRecord = {
    id: string;
    matched_at: string;
    person_name: string;
    confidence: number;
    is_watchlisted: boolean;
    camera_name: string;
}

export type PlateMatchRecord = {
    id: string;
    read_at: string;
    plate_number: string;
    vehicle_type: string;
    vehicle_color: string;
    camera_name: string;
    status: string;
}

export type Event = {
    id: string;
    event_type: string;
    severity: string;
    message: string;
    occurred_at: string;
    status: string;
    confidence: number;
}