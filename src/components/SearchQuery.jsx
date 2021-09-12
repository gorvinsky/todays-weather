const SearchQuery = ({
  city,
  country,
  onCityChange,
  onCountryChange,
  onSearch,
  onClear,
}) => {
  return (
    <div className="query">
      <div>
        City:
      </div>
      <div>
        <input
          id="inputCity"
          name="city"
          value={city}
          onChange={event => onCityChange(event)}
        />
      </div>
      <div>
        Country:
      </div>
      <div>
        <input
          id="inputCountry"
          name="country"
          value={country}
          onChange={event => onCountryChange(event)}
        />
      </div>
      <div>
        <button id="buttonSearch" onClick={_ => onSearch()}>
          Search
        </button>
      </div>
      <div>
        <button id="buttonClear" onClick={_ => onClear()}>
          Clear
        </button>
      </div>
    </div>
  );
};

export default SearchQuery;