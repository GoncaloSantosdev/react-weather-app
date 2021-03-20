import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [weather, setWeather] = useState('');
  const [searchInput, setSearchInput] = useState('');

  useEffect(() => {
    axios.get(`https://api.weatherapi.com/v1/current.json?key=${process.env.REACT_APP_WEATHER_API}&q=London`)
    .then((data) => {
      setWeather(data.data);
    }).catch((error) => {
      console.log(error);
    })
  }, []);                                                             
  
  const inputField = (e) => {
    setSearchInput(e.target.value);
  }

  const searchField = () => {
    axios.get(`https://api.weatherapi.com/v1/current.json?key=${process.env.REACT_APP_WEATHER_API}&q=${searchInput}`)
    .then((content) => {
      setWeather(content.data);
    }).catch((error) => {
      console.log(error);
    })
  }

  return (
    <div className="App">
      <div className="weather-box">
      <h1>React Weather App</h1>
      <div className="cta">
        <input type="text" placeholder="Choose your Country or your City" onChange={inputField}/>
        <button type="submit" className="btn" onClick={searchField}>Search</button>
      </div>
      {weather && (
      <>
        <h2>{weather.location.country}, {weather.location.name}</h2> 
        <div className="image">
          <img src={weather.current.condition.icon} alt= {weather.location.name}/>
        </div>
        <div className="weather-info">
          <p><span className="bold">Local Time: </span> {weather.location.localtime}</p>
          <p><span className="bold">Temperature: </span> {weather.current.temp_c} Degrees</p>
          <p><span className="bold">UV: </span> {weather.current.uv}</p>
          <p><span className="bold">Humidity: </span> {weather.current.humidity}</p>
          <p><span className="bold">Feels Like: </span> {weather.current.feelslike_c} Degrees</p>
          <p><span className="bold">Wind Direction: </span> {weather.current.wind_dir}</p>
        </div>
      </>
      )}
      </div>
    </div>
  );
}

export default App;
