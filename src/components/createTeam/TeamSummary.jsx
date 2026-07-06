import { useDispatch, useSelector } from "react-redux";
import { setTeamName } from "../../redux/teamSlice";

function TeamSummary({ onSave }) {

    const dispatch = useDispatch();

    const teamName = useSelector(
        (state) => state.team.teamName
    );
    const selectedPlayers = useSelector(

        state => state.team.selectedPlayers

    );
    const errorMessage = useSelector(

        state => state.team.errorMessage

    );
    const usedBudget = useSelector(

        state => state.team.usedBudget

    );

    // const remainingBudget = useSelector(

    //     state => state.team.remainingBudget

    // );
    const captain = useSelector(

        state => state.team.captain

    );

    const viceCaptain = useSelector(

        state => state.team.viceCaptain

    );

    return (

        <div className="summary-card">

            <div className="team-name-section">

                <label>

                    📝 Fantasy Team Name

                </label>

                <input

                    type="text"

                    placeholder="Enter Fantasy Team Name"

                    value={teamName}

                    onChange={(e) =>

                        dispatch(

                            setTeamName(e.target.value)

                        )

                    }

                />

            </div>

            <div className="budget-card">

                <h2>

                    Team Budget

                </h2>

                <div className="budget-progress">

                    <div

                        className="budget-fill"

                        style={{

                            width: `${(usedBudget / 100) * 100}%`

                        }}

                    >

                    </div>

                </div>

                <div className="budget-percentage">

                    {usedBudget} / 100 Used

                </div>

            </div>

            <div className="progress-section">

                <h2>

                    Selected Players

                </h2>

                <div className="player-count">

                    {selectedPlayers.length}/11

                </div>

            </div>

            {

                errorMessage &&

                <div className="error-message">

                    {errorMessage}

                </div>

            }

            <div className="leadership">

                <div className="leader-card">

                    <span>

                        ⭐ Captain

                    </span>

                    <strong>

                        {

                            captain

                                ?

                                captain.player_name

                                :

                                "Not Selected"

                        }

                    </strong>

                </div>

                <div className="leader-card">

                    <span>

                        🥈 Vice Captain

                    </span>

                    <strong>

                        {

                            viceCaptain

                                ?

                                viceCaptain.player_name

                                :

                                "Not Selected"

                        }

                    </strong>

                </div>

            </div>

            <button

                className="save-btn"

                onClick={onSave}

            >

                Save Fantasy Team

            </button>

        </div>

    );

}

export default TeamSummary;