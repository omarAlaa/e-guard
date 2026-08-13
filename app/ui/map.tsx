"use client";

import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { DivIcon } from "leaflet";
import { CamerasOverview } from "@/lib/definitions";

type Props = {
    camerasData: CamerasOverview[];
};

const createMarkerIcon = (status: CamerasOverview["status"]) => {
    const color =
        status === "online"
            ? "bg-emerald-500"
            : "bg-red-500";

    return new DivIcon({
        className: "",
        html: `
            <div class="h-4 w-4 rounded-full ${color}"></div>
        `,
        iconSize: [16, 16],
        iconAnchor: [8, 8],
    });
};

export default function Map({ camerasData }: Props) {
    return (
        <MapContainer
            center={[30.070999, 31.357915]}
            zoom={16}
            className="h-full w-full"
        >
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            {camerasData.map((camera) => (
                <Marker
                    key={camera.id}
                    position={[camera.latitude, camera.longitude]}
                    icon={createMarkerIcon(camera.status)}
                >
                    <Popup>
                        <strong>{camera.name}</strong>
                        <br />
                        Status: {camera.status}
                    </Popup>
                </Marker>
            ))}
        </MapContainer>
    );
}