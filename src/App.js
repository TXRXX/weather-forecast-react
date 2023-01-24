import "./App.css";
import { useState } from "react";
import { Search, CurrentWeather, Forecast } from "./components";
import { WEATHER_URL_API, WEATHER_KEY_API } from "./api";
require('dotenv').config()

function App() {
    const [currentWeather, setCurrentWeather] = useState(null);
    const [forecast, setForecast] = useState(null);

    const handleOnSearchChange = (searchData) => {
        const [lat, lon] = searchData.value.split(" ");

        const currentWeatherFetch = fetch(
            `${WEATHER_URL_API}/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_KEY_API}&units=metric`
        );

        const forecastFetch = fetch(
            `${WEATHER_URL_API}/forecast?lat=${lat}&lon=${lon}&appid=${WEATHER_KEY_API}&units=metric`
        );

        Promise.all([currentWeatherFetch, forecastFetch])
            .then(async (response) => {
                const weatherResponse = await response[0].json();
                const forecastResponse = await response[1].json();

                setCurrentWeather({
                    city: searchData.label,
                    ...weatherResponse,
                });
                setForecast({ city: searchData.label, ...forecastResponse });
            })
            .catch((err) => {
                console.log(err);
            });
    };

    console.log(currentWeather);
    console.log(forecast);

    return (
        <div className="container">
            <div className="container__left">
                <div className="title__box">
                    <span>WEATHER FORECAST</span>
                </div>
                <div className="location__box">
                    <div className="location__box__wrap__img">
                        <img src="/images/location.png" alt="" />
                    </div>
                    <div className="location__box__col">
                        <span>LOCATION</span>
                        {currentWeather ? (
                            <span>{currentWeather.city}</span>
                        ) : (
                            <span>No Country Selected</span>
                        )}
                    </div>
                </div>

                <Search onSearchChange={handleOnSearchChange} />
            </div>
            <div className={currentWeather ? `container__right anim` : ``}>
                <div className={currentWeather ? `wrap__top__bottom fadeIn` : ``}>
                    <div className="container__right__top">
                        {currentWeather && (
                            <CurrentWeather data={currentWeather} />
                        )}
                    </div>
                    <div className="container__right__bottom">
                        {forecast && (
                            <>
                                <h1>Daily</h1>
                                <div className="wrap__forecast scrollbar">
                                    {forecast && <Forecast data={forecast} />}
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;
