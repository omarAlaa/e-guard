import postgres from 'postgres';
import { AlarmsFeed, Camera, CameraAlarm, CamerasOverview, CameraStats, Event, FaceMatchRecord, HourlyTraffic, PlateMatchRecord, TotalKPIs } from './definitions';

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

export async function fetchTotalKPIs() {
    try {
        const data = await sql<TotalKPIs[]>`SELECT * FROM v_dashboard_kpis`;

        const ageGroupsData = [
            { label: "0-12", value: Math.round((data[0].age_0_12 / data[0].people_today) * 100) },
            { label: "13-19", value: Math.round((data[0].age_13_19 / data[0].people_today) * 100) },
            { label: "20-35", value: Math.round((data[0].age_20_35 / data[0].people_today) * 100) },
            { label: "36-55", value: Math.round((data[0].age_36_55 / data[0].people_today) * 100) },
            { label: "56+", value: Math.round((data[0].age_56_plus / data[0].people_today) * 100) },
        ];

        return { ...data[0], ageGroupsData };
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to fetch KPIs data.');
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

export async function fetchAlarmsFeed() {
    try {
        const data = await sql<AlarmsFeed[]>`
        SELECT
          id,
          detected_at,
          camera_name,
          detection_type,
          confidence,
          status 
        FROM v_fire_weapon_feed`;

        return data;
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to fetch alarms data.');
    }
}

export async function fetchCamerasOverview(query: string, statuses = ['online', 'offline']) {
    try {
        const data = await sql<CamerasOverview[]>`
        SELECT
          id,
          name,
          latitude,
          longitude,
          status,
          latest_people_count,
          latest_vehicle_count,
          last_seen_at
        FROM v_cameras_overview
        WHERE
          name ILIKE ${`%${query}%`} AND
          status = any(${statuses})
        `;

        return data;
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to fetch cameras data.');
    }
}

export async function fetchCameraStats(id: string) {
    try {
        const cameraStats = await sql<CameraStats[]>`
        SELECT
          name,
          status,
          last_seen_at,
          people_now,
          male_pct,
          female_pct,
          peak_today,
          alerts_today
        FROM v_camera_stats_24h
        WHERE camera_id = ${id}
         `;

        return cameraStats[0];
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to fetch camera stats.');
    }
}

export async function fetchCameraAlarms(id: string) {
    try {
        const cameraAlarms = await sql<CameraAlarm[]>`
        SELECT
          id,
          detected_at,
          detection_type,
          confidence,
          status
        FROM fire_weapon_detections
        WHERE camera_id = ${id}
          `;

        return cameraAlarms;
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to fetch camera alarms.');
    }
}

export async function fetchCameras() {
    try {
        const cameras = await sql<Camera[]>`
        SELECT
          id,
          name
        FROM cameras
          `;

        const camerasData = cameras.map(camera => ({ label: camera.name, value: camera.name }))
        return camerasData;
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to fetch cameras.');
    }
}

export async function fetchFaceRecFeed(query: string, camera: string) {
    try {
        const faceRecFeed = await sql<FaceMatchRecord[]>`
            SELECT
                id,
                matched_at,
                person_name,
                confidence,
                is_watchlisted,
                camera_name
            FROM v_face_recognition_feed
            WHERE person_name ILIKE ${`%${query}%`}
            ${camera !== ''
                ? sql`AND camera_name = ${camera}`
                : sql``
            }
        `;

        return faceRecFeed;
    } catch (error) {
        console.error("Database Error:", error);
        throw new Error("Failed to fetch face recognition data.");
    }
}

export async function fetchPlateRecFeed() {
    try {
        const plateRecFeed = await sql<PlateMatchRecord[]>`
        SELECT
          id,
          read_at,
          plate_number,
          vehicle_type,
          vehicle_color,
          camera_name,
          status
        FROM v_plate_recognition_feed
          `;

        return plateRecFeed;
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to fetch plate recognition data.');
    }
}

export async function fetchEventsList() {
    const eventsList = await sql<Event[]>`SELECT * FROM v_alerts_feed`;

    return eventsList;
}