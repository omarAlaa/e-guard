# Surveillance analytics dashboard

A full-stack dashboard concept for CCTV surveillance systems, built with Next.js and PostgreSQL. Covers live people and vehicle counting, demographic breakdowns, fire/weapon detection alerts, face recognition with watchlist matching, license plate recognition, and a multi-camera site map.

Built solo as a portfolio project — frontend, database schema, and query layer all designed from scratch.

## Features

- **Main dashboard** — live KPIs (people count, gender split, vehicle count, cameras online, active alerts), hourly traffic charts, age-group distribution, and a critical detections table
- **Cameras overview** — searchable camera list with live status, filterable by online/offline, plus an interactive floor-plan map with percentage-based pin positioning across multiple floors
- **Per-camera detail pages** — live feed placeholder, occupancy trend, gender split, and a merged detection feed scoped to that camera
- **People recognition** — searchable face-match gallery with watchlist flagging and on-demand appearance history across cameras
- **Plate recognition** — plate read log with live watchlist-match alerts for flagged vehicles
- **Alerts and events center** — severity-ranked unified feed across fire, weapon, loitering, watchlist match, and camera-offline events, with acknowledge/escalate actions and a passive camera diagnostics panel

## Tech stack

| Layer      | Choice |
|------------|--------|
| Framework  | Next.js (App Router) |
| Language   | TypeScript |
| Styling    | Tailwind CSS, shadcn/ui |
| Database   | PostgreSQL (Neon serverless) |
| Data layer | Server components + server actions (no client-side API routes for internal data) |
