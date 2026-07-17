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
import Users from "../pages/admin/Users";
import GlobalLeaderboard from "../pages/admin/GlobalLeaderboard";
import Teams from "../pages/admin/Teams";
import TeamDetails from "../pages/admin/TeamDetails";
import AdminTournaments from "../pages/admin/AdminTournaments";
import TournamentDetails from "../pages/admin/TournamentDetails";
import MatchPlayers from "../pages/admin/MatchPlayers";
import MatchScores from "../pages/admin/MatchScores";
import MatchLeaderboard from "../pages/admin/MatchLeaderboard";
import AdminAnnouncement from "../pages/admin/AdminAnnouncement";

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
        <Route path="dashboard" element={<AdminDashboard />} />
        <Route path="players" element={<Players />} />
        <Route path="users" element={<Users />} />
        <Route path="global-leaderboard" element={<GlobalLeaderboard />} />
        <Route path="teams" element={<Teams />} />
        <Route path="teams/:id" element={<TeamDetails />} />
        <Route path="tournaments" element={<AdminTournaments />} />
        <Route path="tournaments/:id" element={<TournamentDetails />} />
        <Route path="matches/:id/players" element={<MatchPlayers />} />
        <Route path="matches/:id/scores" element={<MatchScores />} />
        <Route path="matches/:id/leaderboard" element={<MatchLeaderboard />} />

        <Route path="AdminAnnouncement" element={<AdminAnnouncement />} />
      </Route>
    </Routes>
  );
}

export default AppRoutes;
