import StatisticsTable from "../../StatisticsTable/StatisticsTable";
import StatisticsDashboard from "../../StatisticsDashboard/StatisticsDashboard";
import StatisticsChart from "../../StatisticsChart/StatisticsChart";
import styles from "./StatisticsTab.module.css";
import { useEffect, useState } from "react";
import Loader from "../../Loader/Loader";
function StatisticsTab() {
    const [forcedLoading, setForcedLoading] = useState(true);

    useEffect(() => {
        setTimeout(() => setForcedLoading(false), 1500);
    }, [forcedLoading]);

    if (forcedLoading) {
        return <Loader />;
    }

    return (
        <div className={styles.statisticsPage}>
            <div className={styles.titleAndChart}>
                <h2 className={styles.title}>Statistics</h2>
                <StatisticsChart />
            </div>
            <div className={styles.dashboardAndTable}>
                <StatisticsDashboard />
                <StatisticsTable />
            </div>
        </div>
    );
}

export default StatisticsTab;
