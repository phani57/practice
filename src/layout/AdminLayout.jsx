import { Outlet } from "react-router-dom";

import AdminSidebar from "../components/admin/AdminSidebar";
import AdminHeader from "../components/admin/AdminHeader";

import styles from "../styles/admin/layout/AdminLayout.module.css";

function AdminLayout() {

    return (

        <div className={styles.layout}>

            <AdminSidebar />

            <div className={styles.main}>

                <AdminHeader />

                <main className={styles.page}>

                    <Outlet />

                </main>

            </div>

        </div>

    );

}

export default AdminLayout;