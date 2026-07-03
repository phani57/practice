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

        <div>

            <label>

                <input

                    type="checkbox"

                    checked={selected}

                    disabled={disabled}

                    onChange={togglePlayer}

                />

                {player.player_name}

            </label>

            {

                selected &&

                <div>

                    <button

                        onClick={() =>

                            dispatch(

                                setCaptain(player)

                            )

                        }

                    >

                        {

                            captain?.id === player.id

                                ? "⭐ Captain"

                                : "Captain"

                        }

                    </button>

                    <button

                        onClick={() =>

                            dispatch(

                                setViceCaptain(player)

                            )

                        }

                    >

                        {

                            viceCaptain?.id === player.id

                                ? "🥈 Vice"

                                : "Vice"

                        }

                    </button>

                </div>

            }

        </div>

    );

}

export default PlayerCard;