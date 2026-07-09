import styles from "../../../styles/admin/Players.module.css";
function PlayersHeader({ onAddPlayer }) {

    return (

        <div className={styles.pageHeader}>

            <div>

                <p className={styles.pageSubtitle}>

                    Player Management

                </p>

                <h1 className={styles.pageTitle}>

                    Players

                </h1>

            </div>

            <button

                className={styles.primaryBtn}

                onClick={onAddPlayer}

            >

                + Add Player

            </button>

        </div>

    );

}

export default PlayersHeader;