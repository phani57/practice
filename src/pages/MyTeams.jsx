import styles from "../styles/pages/MyTeams.module.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import TeamCard from "../components/MyTeamsCard";

import { useDispatch } from "react-redux";
import { setEditingTeam } from "../redux/teamSlice";
import fantasyTeamService from "../services/fantasyTeamService";
import ConfirmModal from "../components/common/ConfirmModal";

function MyTeams() {

    const navigate = useNavigate();

    const [savedTeams, setSavedTeams] = useState([]);

    const [viewingTeam, setViewingTeam] = useState(null);

    const [isConfirmOpen, setIsConfirmOpen] = useState(false);
    const [deleteTargetId, setDeleteTargetId] = useState(null);

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



    function viewTeam(teamId) {
        const team = savedTeams.find(t => t.id === teamId);
        setViewingTeam(team);
    }

    function closeModal() {
        setViewingTeam(null);
    }

    // Open confirm modal for deleting a team
    function handleDeleteClick(teamId) {
        setDeleteTargetId(teamId);
        setIsConfirmOpen(true);
    }

    async function deleteTeam() {
        setIsConfirmOpen(false);
        if (!deleteTargetId) return;

        try {
            await fantasyTeamService.deleteTeam(deleteTargetId);
            setSavedTeams(previousTeams =>
                previousTeams.filter(team => team.id !== deleteTargetId)
            );
        } catch (error) {
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

            <div className={styles.teamsContainer}>

                <div className={styles.pageHeader}>

                    <div>

                        <h1>

                            My Teams

                        </h1>

                        <p>

                            View and manage your fantasy teams.

                        </p>

                    </div>

                </div>

                <div className={styles.teamsGrid}>

                    {

                        savedTeams.map(team => (

                            <TeamCard

                                key={team.id}

                                team={team}

                                onView={viewTeam}

                                onDelete={handleDeleteClick}

                                onEdit={editTeam}

                            />

                        ))

                    }

                </div>

            </div>

            {viewingTeam && (
                <div className={styles.modalOverlay} onClick={closeModal}>
                    <div className={styles.modalContent} onClick={e => e.stopPropagation()}>
                        <div className={styles.modalHeader}>
                            <h3>Selected Players ({viewingTeam.team_name})</h3>
                            <button className={styles.closeBtn} onClick={closeModal}>X</button>
                        </div>
                        <div className={styles.playersGrid}>
                            {viewingTeam.players.map(player => (
                                <div key={player.id} className={styles.playerCard}>
                                    <span>{player.player_name}</span>
                                    <div className={styles.badges}>
                                        {player.pivot.is_captain === 1 && (
                                            <span className={styles.captain}>C</span>
                                        )}
                                        {player.pivot.is_vice_captain === 1 && (
                                            <span className={styles.vice}>VC</span>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            <ConfirmModal
                open={isConfirmOpen}
                title="Delete Team"
                message="Are you sure you want to delete this team? This action cannot be undone."
                onConfirm={deleteTeam}
                onCancel={() => setIsConfirmOpen(false)}
            />

        </>

    );

}

export default MyTeams;