function TeamsToolbar({

    searchText,

    onSearchChange

}) {

    return (

        <div className="toolbar">

            <input

                className="search-box"

                type="text"

                placeholder="Search teams..."

                value={searchText}

                onChange={onSearchChange}

            />

        </div>

    );

}

export default TeamsToolbar;