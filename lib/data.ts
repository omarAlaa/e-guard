import 'server-only';

import postgres from 'postgres';
import { AlarmsFeed, Camera, CameraAlarm, CamerasOverview, CameraStats, Event, FaceMatchRecord, HourlyTraffic, PerosnHisotryLog, PlateMatchRecord, TotalKPIs } from './definitions';

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
          camera_id as id,
          name,
          latitude,
          longitude,
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

export async function fetchCameraOccupancy(id: string) {
    try {
        const data = await sql<HourlyTraffic[]>`
        SELECT
          date_trunc('hour', recorded_at) as hour_bucket,
          sum(total_count) as people_count
        FROM people_counts
        WHERE camera_id = ${id}
        group by 1
        order by hour_bucket
        `;

        return data;
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to fetch camera occupancy data.');
    }
}

export async function fetchCameraAlarms(id: string) {
    try {
        const cameraAlarms = await sql<CameraAlarm[]>`
        SELECT
          detected_at,
          detection_type,
          confidence,
          status
        FROM fire_weapon_detections
        WHERE camera_id = ${id}
        union all
 select matched_at, 'Face: ' || person_name, confidence, case when is_watchlisted then 'watchlisted' else 'reviewed' end
 from face_matches where camera_id =${id}
  union all
 select read_at, 'Plate: ' || plate_number, confidence, status
from plate_reads where camera_id = ${id}
order by detected_at desc
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

export async function fetchPersonHistory(personName: string) {
    try {
        const personHistory = await sql<PerosnHisotryLog[]>`
            SELECT
              fm.id, fm.matched_at, fm.is_watchlisted, c.name as camera_name, c.location
            FROM face_matches fm
            JOIN cameras c on c.id = fm.camera_id
            WHERE fm.person_name = ${personName}
            ORDER BY fm.matched_at desc;
        `;

        return personHistory;
    } catch (error) {
        console.error("Database Error:", error);
        throw new Error("Failed to fetch person history.");
    }
}

export async function fetchPlateRecFeed(query: string, camera: string) {
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
        WHERE plate_number ILIKE ${`%${query}%`}
            ${camera !== ''
                ? sql`AND camera_name = ${camera}`
                : sql``
            }
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