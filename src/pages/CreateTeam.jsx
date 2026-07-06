import "../styles/pages/CreateTeam.css";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { loadEditingTeam, resetTeam,restoreDraft } from "../redux/teamSlice";
import userPlayerService from "../services/userPlayerService";
import TeamSummary from "../components/createTeam/TeamSummary";
import TeamColumn from "../components/createTeam/TeamColumn";
import fantasyTeamService from "../services/fantasyTeamService";
function CreateTeam() {

    const { id } = useParams();

    const [team1Players, setTeam1Players] = useState([]);
    const [team2Players, setTeam2Players] = useState([]);

    const [team1Name, setTeam1Name] = useState("");
    const [team2Name, setTeam2Name] = useState("");

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const {

        teamName,

        selectedPlayers,

        captain,

        viceCaptain,

        usedBudget,

        remainingBudget,

        editingTeam

    } = useSelector(

        state => state.team

    );



    useEffect(() => {
        async function loadPlayers() {

            try {

                const data = await userPlayerService.getPlayingPlayers(id);

                setTeam1Players(data.team1Players);
                setTeam2Players(data.team2Players);

                setTeam1Name(data.team1Name);
                setTeam2Name(data.team2Name);

                if (!editingTeam) {

                    const draft = localStorage.getItem(

                        `fantasyDraft_${id}`

                    );

                    if (draft) {

                        dispatch(

                            restoreDraft(

                                JSON.parse(draft)

                            )

                        );

                    }

                }

            }

            catch (error) {

                console.log(error);

            }

        }

        loadPlayers();

    }, []);

    useEffect(() => {

        if (editingTeam) {

            dispatch(

                loadEditingTeam(editingTeam)

            );

        }

    }, [editingTeam]);


    useEffect(() => {

        if (editingTeam) {

            return;

        }

        const draft = {

            teamName,

            selectedPlayers,

            captain,

            viceCaptain,

            usedBudget,

            remainingBudget

        };

        localStorage.setItem(

            `fantasyDraft_${id}`,

            JSON.stringify(draft)

        );

    }, [

        editingTeam,

        teamName,

        selectedPlayers,

        captain,

        viceCaptain,

        usedBudget,

        remainingBudget,

        id

    ]);


    async function saveTeam() {

        if (!teamName.trim()) {

            alert("Please enter team name");

            return;

        }

        if (selectedPlayers.length !== 11) {

            alert("Please select 11 players");

            return;

        }

        if (!captain) {

            alert("Please select captain");

            return;

        }

        if (!viceCaptain) {

            alert("Please select vice captain");

            return;

        }

        const teamData = {

            team_name: teamName,

            players: selectedPlayers.map(

                player => player.id

            ),

            captain: captain.id,

            vice_captain: viceCaptain.id

        };

        // console.log(teamData);
        try {

            if (editingTeam) {

                await fantasyTeamService.updateTeam(

                    editingTeam.id,

                    teamData

                );

            }
            else {

                await fantasyTeamService.saveTeam(

                    id,

                    teamData

                );

            }

            dispatch(resetTeam());
            localStorage.removeItem(

                `fantasyDraft_${id}`,

            );
            navigate("/my-teams");

        }

        catch (error) {

            console.log(error);
            alert(

                error.response?.data?.message ||

                "Something went wrong"

            );

        }

    }

    return (

        <div className="page-container">

            <h1>

                Create Fantasy Team

            </h1>

            <p className="match-info">

                Match ID : {id}

            </p>

            <TeamSummary onSave={saveTeam} />

            <div className="players-grid">

                <TeamColumn

                    teamName={team1Name}

                    players={team1Players}

                />

                <TeamColumn

                    teamName={team2Name}

                    players={team2Players}

                />

            </div>

        </div>

    );

}

export default CreateTeam;