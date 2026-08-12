import AlertsTable from "@/app//ui/alerts-table";
import PeopleVehicleLineChart from "@/app/ui/people-vehicles-card";
import Stats from "@/app/ui/stats";

export default function Dashboard() {
    return (
        <main className="flex flex-col gap-8">
            <Stats />

            <PeopleVehicleLineChart />

            <AlertsTable />
        </main>
    )
}