import styles from "../../../styles/admin/Players.module.css";
function PlayerRow({

    player,

    onEdit,

    onDelete

}) {

    return (

        <tr>

            <td>

                {player.player_name}

            </td>

            <td>

                ₹ {player.player_price}

            </td>

            <td>

                {player.age}

            </td>

            <td>

                {player.country}

            </td>

            <td className={styles.actions}>

                <button

                    className={styles.editBtn}

                    onClick={() =>

                        onEdit(player)

                    }

                >

                    Edit

                </button>

                <button

                    className={styles.deleteBtn}

                    onClick={() =>

                        onDelete(player.id)

                    }

                >

                    Delete

                </button>

            </td>

        </tr>

    );

}

export default PlayerRow;