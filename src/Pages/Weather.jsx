import React from "react";
import "../navigation/Nav.css";
import "../Cssfolder/Weather.css";
import { FaSearchLocation } from "react-icons/fa";
import { useState } from "react";
import Clouds from "../assets/weatherImgs/clouds.png";
import Clear from "../assets/weatherImgs/clear.png";
import Rain from "../assets/weatherImgs/rain.png";
import Snow from "../assets/weatherImgs/snowy.png";
import Storm from "../assets/weatherImgs/storm.png";
import axios from "axios";
import { FaThermometerHalf } from "react-icons/fa";
import { WiRaindrop } from "react-icons/wi";
import { FaWind } from "react-icons/fa";
import { WiHumidity } from "react-icons/wi";
const Weather = () => {
  const apiKey = "9b2ab23e35c8fba3b35b2fa85b2ceb9e";
  const [cityName, setCityName] = useState("");
  const [handleError, sethandleError] = useState(false);
  const [weatherData, setWeatherData] = useState({});
  const [currentForecast, setCurrentForecast] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [foreCast, setForeCast] = useState([]);

  const getCurrentForecast = (forecast) => {
    // console.log(days);
    const today = new Date().toISOString().slice(0, 10);

    return forecast.filter((item) => {
      return item.dt_txt.startsWith(today);
    });
  };
  const getForecast = (forecast) => {
    const today = "12:00:00";

    return forecast.filter((item) => {
      // console.log(item.dt_txt)
      return item.dt_txt.endsWith(today);
    });
  };

  function getWeather() {
    if (cityName.trim() !== "") {
      setIsLoading(true);
      const currentWeatherUrl = axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`
      );

      const forecastWeatherUrl = axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${apiKey}&units=metric`
      );

      Promise.all([currentWeatherUrl, forecastWeatherUrl])
        .then((response) => {
          // current weather data
          setWeatherData(response[0].data);

          // for today's forecast
          const forecastData = getCurrentForecast(response[1].data.list);
          setCurrentForecast(forecastData);

          // remaining forecast data
          const remainingForecast = getForecast(response[1].data.list);
          setForeCast(remainingForecast);

          // handling errors
          sethandleError(false);
          setIsLoading(false);
        })
        .catch((error) => {
          console.log(error);
          sethandleError(true);
          setIsLoading(false);
        });
    }
  }

  const weatherImgs = {
    Clouds: Clouds,
    Clear: Clear,
    Rain: Rain,
    Snow: Snow,
    Storm: Storm,
    Thunderstorm: Storm,
  };

  const weatherImg =
    weatherData.weather && weatherImgs[weatherData.weather[0].main];

  return (
    <div className="page-Content">
      <div className="weather-Content">
        <div className="weather-page1">
          {/* searrch input field */}
          <div className="search-bar">
            <input
              type="text"
              placeholder="Search Cities"
              onChange={(e) => setCityName(e.target.value)}
              onKeyDown={(e) => (e.key === "Enter" ? getWeather() : null)}
            />
            <FaSearchLocation onClick={getWeather} />
          </div>

          {/* current weather */}
          {isLoading ? (
            <h1>Loading....</h1>
          ) : handleError ? (
            <h1>Location Not found : 404 Error</h1>
          ) : (
            <div className="weather-card">
              <div className="weather-texts">
                <h1>{weatherData.name}</h1>
                {weatherData.weather && (
                  <p>{weatherData.weather[0].description}</p>
                )}
                {weatherData.main && (
                  <h2>{Math.floor(weatherData.main.temp)}&#176;C</h2>
                )}
              </div>
              <div className="weather-imgs">
                <img src={weatherImg} alt="" />
              </div>
            </div>
          )}

          {/* forecast weather */}
          {!isLoading && !handleError && currentForecast.length > 0 && (
            <div className="forecast-card">
              <h2>Today's Forecast</h2>
              <div className="forecast-weather">
                {currentForecast.map((forecast, index) => (
                  <div className="hourly-forecast" key={index}>
                    <p>
                      {new Date(forecast.dt_txt).toLocaleTimeString("en-US", {
                        hour: "2-digit",
                        minute: "2-digit",
                        hour12: true,
                      })}
                    </p>
                    <img
                      src={`${weatherImgs[forecast.weather[0].main]}`}
                      alt="image"
                    />

                    <p>
                      {Math.floor(forecast.main.temp)}
                      &#176;
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {!isLoading && !handleError && weatherData.main && (
            <div className="airCondition">
              <div className="aircondtion1">
                <div>
                  <span>
                    <FaThermometerHalf />
                    <p>feels like</p>
                  </span>
                  <p>
                    {weatherData.main &&
                      Math.floor(weatherData.main.feels_like)}
                    &#176;
                  </p>
                </div>
                <div>
                  <span>
                    <WiRaindrop />
                    <p>Chance of raining</p>
                  </span>

                  <p>
                    {currentForecast[0] &&
                      Math.floor(currentForecast[0].pop) * 100}
                    %
                  </p>
                </div>
              </div>
              <div className="aircondtion2">
                <div>
                  <span>
                    <FaWind />
                    <p>Wind Speed</p>
                  </span>
                  <p>
                    {currentForecast[0] &&
                      Math.floor(currentForecast[0].wind.speed)}
                    m/s
                  </p>
                </div>
                <div>
                  <span>
                    <WiHumidity />
                    <p>Humidity</p>
                  </span>
                  <p>
                    {currentForecast[0] &&
                      Math.floor(currentForecast[0].main.humidity)}
                    %
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="weather-page2">
          {!isLoading && !handleError && foreCast.length > 0 && (
            <div className="remainingForecast">
              <h2> 5 days forecast</h2>
              <div className="remainingForecast-card">
                {foreCast.map((forecast, index) => (
                  <div>
                    <p>
                      {new Date(forecast.dt_txt).toLocaleDateString("en-Us", {
                        weekday: "long",
                      })}
                    </p>
                    <img
                      src={`${
                        forecast.weather &&
                        weatherImgs[forecast.weather[0].main]
                      }`}
                      alt=""
                      className="forecastmainimg"
                    />

                    <p>{forecast.weather[0].main}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Weather;
