import { Outlet } from "react-router-dom";

import AdminSidebar from "../components/admin/AdminSidebar";
import AdminHeader from "../components/admin/AdminHeader";

import "../styles/admin/layout/AdminLayout.css";

function AdminLayout() {

    return (

        <div className="layout">

            <AdminSidebar />

            <div className="main">

                <AdminHeader />

                <main className="page">

                    <Outlet />

                </main>

            </div>

        </div>

    );

}

export default AdminLayout;