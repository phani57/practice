function TeamsTable({

    teams,

    onEdit,

    onDelete,

    onView

}) {

    return (

        <>

            <div className="table-card">

                <table>

                    <thead>

                        <tr>

                            <th>

                                Team Name

                            </th>

                            <th>

                                Players

                            </th>

                            <th width="220">

                                Actions

                            </th>

                        </tr>

                    </thead>

                    <tbody>

                        {

                            teams.length === 0 ?

                                (

                                    <tr>

                                        <td

                                            colSpan="3"

                                            className="empty-state"

                                        >

                                            No Teams Found

                                        </td>

                                    </tr>

                                )

                                :

                                teams.map(team => (

                                    <tr key={team.id}>

                                        <td>

                                            <button

                                                className="team-link"

                                                onClick={() =>

                                                    onView(team.id)

                                                }

                                            >

                                                {team.team_name}

                                            </button>

                                        </td>

                                        <td>

                                            {team.players.length}

                                        </td>

                                        <td className="actions">

                                            <button

                                                className="edit-btn"

                                                onClick={() =>

                                                    onEdit(team)

                                                }

                                            >

                                                Edit

                                            </button>

                                            <button

                                                className="delete-btn"

                                                onClick={() =>

                                                    onDelete(team.id)

                                                }

                                            >

                                                Delete

                                            </button>

                                        </td>

                                    </tr>

                                ))

                        }

                    </tbody>

                </table>

            </div>

        </>

    );

}

export default TeamsTable;