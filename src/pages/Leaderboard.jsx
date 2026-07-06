import "../styles/Pages/Leaderboard.css";
import { useEffect, useState } from "react";
import fantasyTeamService from "../services/fantasyTeamService";

function Leaderboard() {

    const [leaderboards, setLeaderboards] = useState([]);
    const [searchText, setSearchText] = useState("");
    const [currentPage, setCurrentPage] = useState(1);

    const itemsPerPage = 10;

    const currentUserId =
        JSON.parse(localStorage.getItem("user") || "{}").id;

    useEffect(() => {
        async function loadLeaderboard() {

            try {

                const data =
                    await fantasyTeamService.getGlobalLeaderboard();

                setLeaderboards(data);

            } catch (error) {

                console.log(error);

            }

        }
        loadLeaderboard();
    }, []);


    // Search
    const filteredUsers = leaderboards.filter((user) =>
        user.name
            .toLowerCase()
            .includes(searchText.toLowerCase())
    );

    // Pagination
    const totalPages = Math.ceil(
        filteredUsers.length / itemsPerPage
    );

    const start =
        (currentPage - 1) * itemsPerPage;

    const end =
        start + itemsPerPage;

    const paginatedUsers =
        filteredUsers.slice(start, end);

    function nextPage() {

        if (currentPage < totalPages) {

            setCurrentPage(currentPage + 1);

        }

    }

    function previousPage() {

        if (currentPage > 1) {

            setCurrentPage(currentPage - 1);

        }

    }

    return (

        <>

            <div className="leaderboard-container">

                <h1 className="page-title">

                    🏆 Global Leaderboard

                </h1>

                <div className="search-box">

                    <input
                        type="text"
                        placeholder="Search User..."
                        value={searchText}
                        onChange={(e) =>
                            setSearchText(e.target.value)
                        }
                    />

                </div>

                {
                    paginatedUsers.map((user) => (

                        <div
                            key={user.id}
                            className={`leaderboard-card
                                ${user.id === currentUserId ? "current-user" : ""}
                                ${user.rank === 1 ? "top1" : ""}
                                ${user.rank === 2 ? "top2" : ""}
                                ${user.rank === 3 ? "top3" : ""}
                            `}
                        >

                            <div className="rank-circle">

                                {
                                    user.rank === 1
                                        ? "🥇"
                                        : user.rank === 2
                                            ? "🥈"
                                            : user.rank === 3
                                                ? "🥉"
                                                : user.rank
                                }

                            </div>

                            <div className="user-info">

                                <div className="name-row">

                                    <h3>

                                        {user.name}

                                    </h3>

                                    {
                                        user.id === currentUserId && (

                                            <span className="you-badge">

                                                YOU

                                            </span>

                                        )
                                    }

                                </div>

                                <span className="points-label">

                                    Fantasy Points

                                </span>

                            </div>

                            <div className="points-badge">

                                {user.fantasy_points}

                            </div>

                        </div>

                    ))
                }

                <div className="pagination">

                    <button
                        onClick={previousPage}
                        disabled={currentPage === 1}
                    >

                        Previous

                    </button>

                    <span>

                        Page {currentPage} of {totalPages || 1}

                    </span>

                    <button
                        onClick={nextPage}
                        disabled={currentPage >= totalPages}
                    >

                        Next

                    </button>

                </div>

            </div>

        </>

    );

}

export default Leaderboard;