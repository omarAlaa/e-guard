import AgeGroupsCard from "@/app//ui/age-groups-card";
import AlertsTable from "@/app//ui/alerts-table";
import GenderPieChart from "@/app/ui/gender-card";
import PeopleVehicleLineChart from "@/app/ui/people-vehicles-card";
import StatsCards from "@/app/ui/stats-cards";

export default function Dashboard() {
    return (
        <main className="flex flex-col gap-8">
            <StatsCards />

            <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                <GenderPieChart />

                <AgeGroupsCard />
            </div>

            <PeopleVehicleLineChart />

            <AlertsTable />
        </main>
    )
}