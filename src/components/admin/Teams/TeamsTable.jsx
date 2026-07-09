import styles from "../../../styles/admin/Teams.module.css";
function TeamsTable({

    teams,

    onEdit,

    onDelete,

    onView

}) {

    return (

        <>

            <div className={styles.tableCard}>

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

                                            className={styles.emptyState}

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

                                                className={styles.teamLink}

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

                                        <td className={styles.actions}>

                                            <button

                                                className={styles.editBtn}

                                                onClick={() =>

                                                    onEdit(team)

                                                }

                                            >

                                                Edit

                                            </button>

                                            <button

                                                className={styles.deleteBtn}

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