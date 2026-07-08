function TeamsHeader({

    onAddTeam

}) {

    return (

        <div className="page-header">

            <div>

                <p className="page-subtitle">

                    Team Management

                </p>

                <h1 className="page-title">

                    Teams

                </h1>

            </div>

            <button

                className="primary-btn"

                onClick={onAddTeam}

            >

                + Add Team

            </button>

        </div>

    );

}

export default TeamsHeader;