function TournamentsToolbar({
  searchText,

  onSearchChange,
}) {
  return (
    <div className="toolbar">
      <input
        className="search-box"
        type="text"
        placeholder="Search tournaments..."
        value={searchText}
        onChange={onSearchChange}
      />
    </div>
  );
}

export default TournamentsToolbar;
