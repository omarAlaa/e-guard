import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, } from "@/components/ui/select"
import { fetchCameras } from "@/lib/data"

export default async function CameraSelector() {
    const cameras = await fetchCameras()
    const items = [
        { label: "All cameras", value: null },
        ...cameras,
    ]
    return (
        <Select items={items}>
            <SelectTrigger className="w-full">
                <SelectValue />
            </SelectTrigger>
            <SelectContent>
                {cameras.map((item) => (
                    <SelectItem key={item.value} value={item.value}>
                        {item.label}
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    )
}