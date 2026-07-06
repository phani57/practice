function PlayersToolbar({

    searchText,

    onSearchChange

}) {

    return (

        <div className="toolbar">

            <input

                className="search-box"

                type="text"

                placeholder="Search players..."

                value={searchText}

                onChange={onSearchChange}

            />

        </div>

    );

}

export default PlayersToolbar;