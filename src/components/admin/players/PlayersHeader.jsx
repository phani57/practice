function PlayersHeader({ onAddPlayer }) {

    return (

        <div className="page-header">

            <div>

                <p className="page-subtitle">

                    Player Management

                </p>

                <h1 className="page-title">

                    Players

                </h1>

            </div>

            <button

                className="primary-btn"

                onClick={onAddPlayer}

            >

                + Add Player

            </button>

        </div>

    );

}

export default PlayersHeader;