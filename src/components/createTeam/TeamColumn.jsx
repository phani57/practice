import styles from "../../styles/pages/CreateTeam.module.css";
import PlayerCard from "./PlayerCard";

function TeamColumn({

    teamName,

    players

}) {

    return (

        <div className={styles.teamColumn}>

            <h2>

                {teamName}

            </h2>

            {

                players.map(matchPlayer=>(

                    <PlayerCard

                        key={matchPlayer.id}

                        player={matchPlayer.player}

                    />

                ))

            }

        </div>

    );

}

export default TeamColumn;