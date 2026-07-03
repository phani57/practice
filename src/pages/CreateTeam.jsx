import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import userPlayerService from "../services/userPlayerService";
import TeamSummary from "../components/createTeam/TeamSummary";
import TeamColumn from "../components/createTeam/TeamColumn";
function CreateTeam() {

    const { id } = useParams();

    const [team1Players, setTeam1Players] = useState([]);
    const [team2Players, setTeam2Players] = useState([]);

    const [team1Name, setTeam1Name] = useState("");
    const [team2Name, setTeam2Name] = useState("");

    useEffect(() => {
        async function loadPlayers() {

            try {

                const data = await userPlayerService.getPlayingPlayers(id);

                setTeam1Players(data.team1Players);
                setTeam2Players(data.team2Players);

                setTeam1Name(data.team1Name);
                setTeam2Name(data.team2Name);

            }

            catch (error) {

                console.log(error);

            }

        }

        loadPlayers();

    }, []);



    return (

        <div>

            <TeamSummary />

            <TeamColumn

                teamName={team1Name}

                players={team1Players}

            />

            <TeamColumn

                teamName={team2Name}

                players={team2Players}

            />

        </div>

        


    );

}

export default CreateTeam;