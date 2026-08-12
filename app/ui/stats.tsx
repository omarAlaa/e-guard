import AgeGroupsCard from "@/app//ui/age-groups-card";
import StatsCards from "@/app/ui/stats-cards";
import GenderPieChart from "@/app/ui/gender-card";
import { fetchTotalKPIs } from "@/lib/data";

export default async function Stats() {
    const statsData = await fetchTotalKPIs()

    return (
        <>
            <StatsCards
                people_today={statsData.people_today}
                male_today={statsData.male_today}
                female_today={statsData.female_today}
                vehicles_today={statsData.vehicles_today}
                cameras_online={statsData.cameras_online}
                cameras_total={statsData.cameras_total}
                critical_alerts_open={statsData.critical_alerts_open}
            />

            <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                <GenderPieChart
                    male={statsData.male_today}
                    female={statsData.female_today}
                    male_pct={statsData.male_pct}
                    female_pct={statsData.female_pct}
                />

                <AgeGroupsCard ageDistributionData={statsData.ageGroupsData} />
            </div>
        </>
    )
}