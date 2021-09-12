import React from 'react';
import axios from 'axios';
import './TodaysWeather.css';

// components
import Title from './Title';
import SearchQuery from './SearchQuery';
import WeatherInfoPanel from './WeatherInfoPanel';
import SearchHistoryPanel from './SearchHistoryPanel';

class TodaysWeather extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      city: "",
      country: "",
      weatherInfo: null,
      searchHistory: [],
      error: null,
    }

    this.handleCityChange = this.handleCityChange.bind(this);
    this.handleCountryChange = this.handleCountryChange.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.handleClear = this.handleClear.bind(this);
  }

  getCurrentDateTime() {
    const now = new Date();
    const year = now.getFullYear();
    let month = now.getMonth() + 1;
    let day = now.getDate();
    let hours = now.getHours();
    let minutes = now.getMinutes();

    if (month < 10) {
      month = '0' + month;
    }

    if (day < 10) {
      day = '0' + day;
    }

    let ampm = 'AM';
    if (hours >= 12) {
      ampm = 'PM';
      hours %= 12;
      hours = hours || 12;
    }
    
    if (hours < 10) {
      hours = '0' + hours;
    }

    if (minutes < 10) {
      minutes = '0' + minutes;
    }

    const currentDateTime = `${year}-${month}-${day} ${hours}:${minutes} ${ampm}`;
    return currentDateTime;
  }

  requestOpenWeather(city, country) {
    let {weatherInfo, searchHistory } = this.state;

    let location = '' + city;
    if (country) {
      location += ',' + country;
    }

    const apiKey = "dd115aed8afa5151e85463bc7a7b9f9c"; // API Key from Open Weather account
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}`;

    axios.get(apiUrl).then(response => {
      const { data } = response;
      if (data) {
        weatherInfo = {
          city,
          country,
          location: data.name + ', ' + data.sys.country,
          main: data.weather[0].main,
          description: data.weather[0].description,
          temperature: `${data.main.temp_min}°C ~ ${data.main.temp_max}°C`,
          humidity: data.main.humidity,
          time: this.getCurrentDateTime(),
        };
        searchHistory.push(weatherInfo);
        this.setState({
          city,
          country,
          weatherInfo,
          searchHistory,
          error: null,
        });
      }
    }).catch(error => {
      this.setState({
        city,
        country,
        weatherInfo: null,
        error: "Not found",
      });
    }).then(_ => {

    });
  }

  deleteSearchHistoryItem(index) {
    let { searchHistory } = this.state;
    searchHistory.splice(index, 1);
    this.setState({ searchHistory });
  }

  handleCityChange(event) {
    this.setState({ city: event.target.value });
  }

  handleCountryChange(event) {
    this.setState({ country: event.target.value });
  }

  handleSearch() {
    let {city, country } = this.state;
    if (!city) return;

    city = city.toLowerCase();
    country = country.toLowerCase();

    this.requestOpenWeather(city, country);
  }

  handleClear() {
    this.setState({ weatherInfo: null });
  }

  render() {
    const { city, country, weatherInfo, searchHistory, error } = this.state;

    return (
      <div className="main-container">
        <Title title="Today's Weather" />
        <SearchQuery
          city={city}
          country={country}
          onCityChange={event => this.handleCityChange(event)}
          onCountryChange={event => this.handleCountryChange(event)}
          onSearch={_ => this.handleSearch()}
          onClear={_ => this.handleClear()}
        />
        <WeatherInfoPanel
          weatherInfo={weatherInfo}
          error={error}
        />
        <Title title="Search History" />
        <SearchHistoryPanel
          searchHistory={searchHistory}
          onSearch={(selectedCity, selectedCountry) => this.requestOpenWeather(selectedCity, selectedCountry)}
          onDelete={selectedIndex => this.deleteSearchHistoryItem(selectedIndex)}
        />
      </div>
    );
  }
}

export default TodaysWeather;
