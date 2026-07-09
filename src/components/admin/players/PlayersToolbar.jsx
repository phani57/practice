import styles from "../../../styles/admin/Players.module.css";
function PlayersToolbar({

    searchText,

    onSearchChange

}) {

    return (

        <div className={styles.toolbar}>

            <input

                className={styles.searchBox}

                type="text"

                placeholder="Search players..."

                value={searchText}

                onChange={onSearchChange}

            />

        </div>

    );

}

export default PlayersToolbar;