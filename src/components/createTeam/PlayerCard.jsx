import styles from "../../styles/pages/CreateTeam.module.css";
import {

    useDispatch,

    useSelector

} from "react-redux";

import {

    addPlayer,

    removePlayer,

    setCaptain,

    setViceCaptain

} from "../../redux/teamSlice";

function PlayerCard({ player }) {

    const dispatch = useDispatch();

    const {

        selectedPlayers,

        captain,

        viceCaptain

    } = useSelector(

        state => state.team

    );

    const selected = selectedPlayers.some(

        p => p.id === player.id

    );

    const disabled =

        selectedPlayers.length >= 11 && !selected;

    function togglePlayer() {

        if (selected) {

            dispatch(

                removePlayer(player.id)

            );

        }

        else {

            dispatch(

                addPlayer(player)

            );

        }

    }

    return (

        <div

            className={`${styles.playerCard} ${selected ? styles.selected : ""}`}

        >

            <div className={styles.playerLeft}>

                <input

                    type="checkbox"

                    checked={selected}

                    disabled={disabled}

                    onChange={togglePlayer}

                />

            </div>

            <div className={styles.playerInfo}>

                <div className={styles.playerName}>

                    🏏 {player.player_name}

                </div>

                <div className={styles.playerDetails}>

                    <span>

                        {player.country}

                    </span>

                    <span>

                        ₹{player.player_price}

                    </span>

                </div>

            </div>

            {

                selected &&

                <div className={styles.playerActions}>

                    <button

                        className={`${styles.captainBtn} ${captain?.id === player.id ? styles.activeCaptain : ""}`}

                        onClick={() =>

                            dispatch(

                                setCaptain(player)

                            )

                        }

                        title="Set Captain"

                    >

                        C

                    </button>

                    <button

                        className={`${styles.vcBtn} ${viceCaptain?.id === player.id ? styles.activeVc : ""}`}

                        onClick={() =>

                            dispatch(

                                setViceCaptain(player)

                            )

                        }

                        title="Set Vice Captain"

                    >

                        VC

                    </button>

                </div>

            }

        </div>

    );

}

export default PlayerCard;