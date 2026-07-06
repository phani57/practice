import PlayerRow from "./PlayerRow";

function PlayersTable({

    players,

    onEdit,

    onDelete

}) {

    return (

        <div className="table-card">

            <table>

                <thead>

                    <tr>

                        <th>

                            Player Name

                        </th>

                        <th>

                            Price

                        </th>

                        <th>

                            Age

                        </th>

                        <th>

                            Country

                        </th>

                        <th width="220">

                            Actions

                        </th>

                    </tr>

                </thead>

                <tbody>

                    {

                        players.map(player => (

                            <PlayerRow

                                key={player.id}

                                player={player}

                                onEdit={onEdit}

                                onDelete={onDelete}

                            />

                        ))

                    }

                </tbody>

            </table>

        </div>

    );

}

export default PlayersTable;