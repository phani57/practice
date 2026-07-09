import Navbar from "../components/Navbar";
import { Outlet } from "react-router-dom";
import styles from "../styles/layout/MainLayout.module.css";

function MainLayout() {
  return (
    <div className={styles.layout}>
      <Navbar />
      <main className={styles.page}>
        <Outlet />
      </main>
    </div>
  );
}

export default MainLayout;