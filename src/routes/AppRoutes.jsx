import { Routes, Route } from "react-router-dom";

import ProtectedRoute from "../routes/ProtectedRoute";

import Login from "../pages/Login";
import Register from "../pages/Register";

import MainLayout from "../layout/MainLayout";
import AdminLayout from "../layout/AdminLayout";

import Dashboard from "../pages/Dashboard";
import Tournaments from "../pages/Tournaments";
import Matches from "../pages/Matches";
import MyTeams from "../pages/MyTeams";
import Leaderboard from "../pages/Leaderboard";
import Profile from "../pages/Profile";
import CreateTeam from "../pages/CreateTeam";

import AdminDashboard from "../pages/admin/Dashboard";
import Players from "../pages/admin/Players";

function AppRoutes() {

    return (

        <Routes>

            {/* Public */}

            <Route path="/" element={<Login />} />

            <Route path="/register" element={<Register />} />

            {/* User */}

            <Route

                element={

                    <ProtectedRoute>

                        <MainLayout />

                    </ProtectedRoute>

                }

            >

                <Route path="dashboard" element={<Dashboard />} />

                <Route path="tournaments" element={<Tournaments />} />

                <Route path="matches/:id" element={<Matches />} />

                <Route path="create-team/:id" element={<CreateTeam />} />

                <Route path="my-teams" element={<MyTeams />} />

                <Route path="leaderboard" element={<Leaderboard />} />

                <Route path="profile" element={<Profile />} />

            </Route>

            {/* Admin */}

            <Route

                path="/admin"

                element={

                    <ProtectedRoute>

                        <AdminLayout />

                    </ProtectedRoute>

                }

            >

                <Route

                    path="dashboard"

                    element={<AdminDashboard />}

                />
                <Route

                    path="players"

                    element={<Players />}

                />

            </Route>

        </Routes>

    );

}

export default AppRoutes;