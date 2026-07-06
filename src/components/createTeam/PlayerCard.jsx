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

            className={`player-card ${selected ? "selected" : ""}`}

        >

            <div className="player-left">

                <input

                    type="checkbox"

                    checked={selected}

                    disabled={disabled}

                    onChange={togglePlayer}

                />

            </div>

            <div className="player-info">

                <div className="player-name">

                    🏏 {player.player_name}

                </div>

                <div className="player-details">

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

                <div className="player-actions">

                    <button

                        className="captain-btn"

                        onClick={() =>

                            dispatch(

                                setCaptain(player)

                            )

                        }

                    >

                        {

                            captain?.id === player.id

                                ?

                                "⭐ Captain"

                                :

                                "Captain"

                        }

                    </button>

                    <button

                        className="vc-btn"

                        onClick={() =>

                            dispatch(

                                setViceCaptain(player)

                            )

                        }

                    >

                        {

                            viceCaptain?.id === player.id

                                ?

                                "🥈 Vice"

                                :

                                "Vice"

                        }

                    </button>

                </div>

            }

        </div>

    );

}

export default PlayerCard;