import { fetchCameras } from "@/lib/data"
import CameraSelectorField from "./camera-selector-field"

export default async function CameraSelector() {
    const cameras = await fetchCameras()

    return (
        <CameraSelectorField cameras={cameras} />
    )
}