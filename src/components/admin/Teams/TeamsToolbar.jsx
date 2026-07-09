import styles from "../../../styles/admin/Teams.module.css";
function TeamsToolbar({

    searchText,

    onSearchChange

}) {

    return (

        <div className={styles.toolbar}>

            <input

                className={styles.searchBox}

                type="text"

                placeholder="Search teams..."

                value={searchText}

                onChange={onSearchChange}

            />

        </div>

    );

}

export default TeamsToolbar;