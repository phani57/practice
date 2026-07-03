import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "../routes/ProtectedRoute";
import Login from "../pages/Login";
import Register from "../pages/Register";
import MainLayout from "../layout/MainLayout";
import Dashboard from "../pages/Dashboard";
import Tournaments from "../pages/Tournaments";
import Matches from "../pages/Matches";
import MyTeams from "../pages/MyTeams";
import Profile from "../pages/profile";
import Leaderboard from "../pages/Leaderboard";
import CreateTeam from "../pages/CreateTeam";
function AppRoutes() {

    return (

        <Routes>

            <Route

                path="/"

                element={<Login />}

            />
            <Route

                path="/register"

                element={<Register />}

            />
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
        </Routes>

    );

}

export default AppRoutes;