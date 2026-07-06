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

            <td className="actions">

                <button

                    className="edit-btn"

                    onClick={() =>

                        onEdit(player)

                    }

                >

                    Edit

                </button>

                <button

                    className="delete-btn"

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