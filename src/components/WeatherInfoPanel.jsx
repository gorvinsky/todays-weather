const WeatherInfoPanel = ({ weatherInfo, error }) => {
  if (error) {
    return (
      <div className="error">
        Not found
      </div>
    );
  }

  if (!weatherInfo) {
    return null;
  }

  const weatherInfoPanel = (
    <div className="weather-info">
      <div className="weather-row">
        {weatherInfo.location}
      </div>
      <div className="weather-main-row">
        {weatherInfo.main}
      </div>
      <div className="weather-row">
        <div className="weather-col-left">
          Description:
        </div>
        <div className="weather-col-right">
          {weatherInfo.description}
        </div>
      </div>
      <div className="weather-row">
        <div className="weather-col-left">
          Temperature:
        </div>
        <div className="weather-col-right">
          {weatherInfo.temperature}
        </div>
      </div>
      <div className="weather-row">
        <div className="weather-col-left">
          Humidity:
        </div>
        <div className="weather-col-right">
          {weatherInfo.humidity}
        </div>
      </div>
      <div className="weather-row">
        <div className="weather-col-left">
          Time:
        </div>
        <div className="weather-col-right">
          {weatherInfo.time}
        </div>
      </div>
    </div>
  );

  return weatherInfoPanel;
}

export default WeatherInfoPanel;