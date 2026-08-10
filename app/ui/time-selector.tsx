import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, } from "@/components/ui/select"

export default function TimeSelector() {
    const items = [
        { label: "Last 24 hours", value: null },
        { label: 'Last 24 hours', value: 'daily' },
    ]
    return (
        <Select items={items}>
            <SelectTrigger className="w-full">
                <SelectValue />
            </SelectTrigger>
            <SelectContent>
                {items.map((item) => (
                    <SelectItem key={item.value} value={item.value}>
                        {item.label}
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    )
}