import "../styles/pages/MyTeams.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import TeamCard from "../components/MyTeamsCard";

import { useDispatch } from "react-redux";
import { setEditingTeam } from "../redux/teamSlice";
import fantasyTeamService from "../services/fantasyTeamService";

function MyTeams() {

    const navigate = useNavigate();

    const [savedTeams, setSavedTeams] = useState([]);

    const [expandedTeamId, setExpandedTeamId] = useState(-1);

    const dispatch = useDispatch();

    useEffect(() => {
        async function loadTeams() {

            try {

                const data =
                    await fantasyTeamService.getMyTeams();

                setSavedTeams(data);

            }

            catch (error) {

                console.log(error);

            }

        }

        loadTeams();

    }, []);



    function toggleTeam(teamId) {

        if (expandedTeamId === teamId) {

            setExpandedTeamId(-1);

        }

        else {

            setExpandedTeamId(teamId);

        }

    }

    async function deleteTeam(teamId) {

        const confirmed = window.confirm(
            "Are you sure you want to delete this team?"
        );

        if (!confirmed) return;

        try {

            await fantasyTeamService.deleteTeam(teamId);

            setSavedTeams(previousTeams =>

                previousTeams.filter(

                    team => team.id !== teamId

                )

            );

        }

        catch (error) {

            console.log(error);

        }

    }

    async function editTeam(teamId) {

        try {

            const team = await fantasyTeamService.getTeamForEdit(teamId);

            dispatch(setEditingTeam(team));

            navigate(`/create-team/${team.match_id}`);

        }

        catch (error) {

            console.log(error);

        }

    }

    return (

        <>

            <div className="teams-container">

                <div className="page-header">

                    <div>

                        <h1>

                            My Teams

                        </h1>

                        <p>

                            View and manage your fantasy teams.

                        </p>

                    </div>

                </div>

                <div className="teams-grid">

                    {

                        savedTeams.map(team => (

                            <TeamCard

                                key={team.id}

                                team={team}

                                expanded={
                                    expandedTeamId === team.id
                                }

                                onToggle={toggleTeam}

                                onDelete={deleteTeam}

                                onEdit={editTeam}

                            />

                        ))

                    }

                </div>

            </div>

        </>

    );

}

export default MyTeams;