import SearchIcon from '@material-ui/icons/Search';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';

const SearchHistoryPanel = ({ searchHistory, onSearch, onDelete }) => {
  if (!searchHistory || searchHistory.length <= 0) {
    return (
      <div className="no-search-history">
        No record
      </div>
    );
  }

  let searchHistoryList = [];

  for (let i = 0; i < searchHistory.length; i++) {
    const weatherInfo = searchHistory[i];
    const displayIndex = (searchHistory.length - i) + '.';
    const searchHistoryRow = (
      <div className="search-history-row">
        <div className="search-history-item">
          {displayIndex}
        </div>
        <div className="search-history-location">
          {weatherInfo.location}
        </div>
        <div className="search-history-item">
          {weatherInfo.time}
        </div>
        <div className="search-history-item">
          <SearchIcon
            className="search-history-button"
            onClick={_ => onSearch(weatherInfo.city, weatherInfo.country)} />
        </div>
        <div className="search-history-item">
          <DeleteOutlineIcon
            className="search-history-button"
            onClick={_ => onDelete(i)} />
        </div>
      </div>
    );
    searchHistoryList.unshift(searchHistoryRow);
  }

  const searchHistoryPanel = (
    <div className="search-history">
      {searchHistoryList}
    </div>
  );
  return searchHistoryPanel;
}

export default SearchHistoryPanel;