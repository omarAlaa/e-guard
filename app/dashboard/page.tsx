import AgeGroupsCard from "../ui/age-groups-card";
import AlertsTable from "../ui/alerts-table";
import GenderPieChart from "../ui/gender-pie-chart";
import PeopleVehicleLineChart from "../ui/people-vehicles-lineChart";
import StatsCards from "../ui/stats-cards";


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