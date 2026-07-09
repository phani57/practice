import styles from "../../styles/pages/CreateTeam.module.css";
import { useDispatch, useSelector } from "react-redux";
import { setTeamName, clearError } from "../../redux/teamSlice";
import { toast } from "react-toastify";
import { useEffect } from "react";

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

    useEffect(() => {
        if (errorMessage) {
            toast.error(errorMessage);
            dispatch(clearError());
        }
    }, [errorMessage, dispatch]);

    return (

        <div className={styles.summaryCard}>

            <div className={styles.teamNameSection}>

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

            <div className={styles.budgetCard}>

                <h2>

                    Team Budget

                </h2>

                <div className={styles.budgetProgress}>

                    <div

                        className={styles.budgetFill}

                        style={{

                            width: `${(usedBudget / 100) * 100}%`

                        }}

                    >

                    </div>

                </div>

                <div className={styles.budgetPercentage}>

                    {usedBudget} / 100 Used

                </div>

            </div>

            <div className={styles.progressSection}>

                <h2>

                    Selected Players

                </h2>

                <div className={styles.playerCount}>

                    {selectedPlayers.length}/11

                </div>

            </div>

            <div className={styles.leadership}>

                <div className={styles.leaderCard}>

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

                <div className={styles.leaderCard}>

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

                className={styles.saveBtn}

                onClick={onSave}

            >

                Save Fantasy Team

            </button>

        </div>

    );

}

export default TeamSummary;