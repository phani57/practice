import { useNavigate } from "react-router-dom";

import StatCard from "./StatCard";

function StatsGrid({ stats }) {

    const navigate = useNavigate();

    function goToPage(page) {

        navigate(page);

    }

    return (

        <div className="stats-grid">

            <StatCard

                title="Total Users"

                value={stats?.totalUsers}

                subtitle="Registered Users"

                icon="👤"

                onClick={() =>

                    goToPage("/admin/users")

                }

            />

            <StatCard

                title="Tournaments"

                value={stats?.totalTournaments}

                subtitle="Live & Upcoming"

                icon="🏆"

                onClick={() =>

                    goToPage("/admin/tournaments")

                }

            />

            <StatCard

                title="Teams"

                value={stats?.totalTeams}

                subtitle="Registered Teams"

                icon="👥"

                onClick={() =>

                    goToPage("/admin/teams")

                }

            />

            <StatCard

                title="Players"

                value={stats?.totalPlayers}

                subtitle="In Database"

                icon="🏏"

                onClick={() =>

                    goToPage("/admin/players")

                }

            />

            <StatCard

                title="Matches"

                value={stats?.totalMatches}

                subtitle="Managed Matches"

                icon="📅"

            />

        </div>

    );

}

export default StatsGrid;