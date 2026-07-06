function StatCard({

    title,

    value,

    subtitle,

    icon,

    onClick

}) {

    return (

        <div

            className="stat-card"

            onClick={onClick}

        >

            <div className="stat-header">

                <span>

                    {title}

                </span>

                <span className="stat-icon">

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