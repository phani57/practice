import styles from "../../../styles/admin/Teams.module.css";
function TeamsHeader({

    onAddTeam

}) {

    return (

        <div className={styles.pageHeader}>

            <div>

                <p className={styles.pageSubtitle}>

                    Team Management

                </p>

                <h1 className={styles.pageTitle}>

                    Teams

                </h1>

            </div>

            <button

                className={styles.primaryBtn}

                onClick={onAddTeam}

            >

                + Add Team

            </button>

        </div>

    );

}

export default TeamsHeader;