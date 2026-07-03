import PlayerCard from "./PlayerCard";

function TeamColumn({

    teamName,

    players

}) {

    return (

        <div>

            <h2>{teamName}</h2>

            {

                players.map((matchPlayer) => (

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