import { useDispatch, useSelector } from "react-redux";
import { setTeamName } from "../../redux/teamSlice";

function TeamSummary() {

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

    const remainingBudget = useSelector(

        state => state.team.remainingBudget

    );
    const captain = useSelector(

        state => state.team.captain

    );

    const viceCaptain = useSelector(

        state => state.team.viceCaptain

    );

    return (

        <div>

            <h2>Create Fantasy Team</h2>

            <input

                type="text"

                placeholder="Enter Team Name"

                value={teamName}

                onChange={(e) =>
                    dispatch(
                        setTeamName(e.target.value)
                    )
                }

            />
            {

                errorMessage && (

                    <p>

                        {errorMessage}

                    </p>

                )

            }

            <p>

                Team Name : {teamName}

            </p>
            <p>

                Selected Players :

                {selectedPlayers.length}/11

            </p>

            <p>

                Used Budget :

                {usedBudget}

            </p>

            <p>

                Remaining Budget :

                {remainingBudget}

            </p>
            <p>

                Captain :

                {

                    captain

                        ?

                        captain.player_name

                        :

                        "Not Selected"

                }

            </p>

            <p>

                Vice Captain :

                {

                    viceCaptain

                        ?

                        viceCaptain.player_name

                        :

                        "Not Selected"

                }

            </p>

        </div>

    );

}

export default TeamSummary;