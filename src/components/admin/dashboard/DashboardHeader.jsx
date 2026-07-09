import styles from "../../../styles/admin/Dashboard.module.css";
function DashboardHeader() {

    return (

        <div className={styles.pageHeader}>

            <div>

                <p className={styles.pageSubtitle}>

                    Control Center

                </p>

                <h1 className={styles.dashboardTitle}>

                    Admin Dashboard

                </h1>

            </div>

        </div>

    );

}

export default DashboardHeader;