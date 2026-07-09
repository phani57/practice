import styles from "../../../styles/admin/Dashboard.module.css";
function StatCard({

    title,

    value,

    subtitle,

    icon,

    onClick

}) {

    return (

        <div

            className={styles.statCard}

            onClick={onClick}

        >

            <div className={styles.statHeader}>

                <span>

                    {title}

                </span>

                <span className={styles.statIcon}>

                    {icon}

                </span>

            </div>

            <h2>

                {value}

            </h2>

            <small>

                {subtitle}

            </small>

        </div>

    );

}

export default StatCard;