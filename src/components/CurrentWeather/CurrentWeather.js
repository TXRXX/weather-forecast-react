import React from "react";
import "./CurrentWeather.css";

const CurrentWeather = ({ data }) => {
    return (
        <div>
            <div className="current__weather">
                <div className="top">
                    {/* <div className="city">{data.city}</div> */}
                    <h1>Today</h1>
                </div>
                <div className="current__weather__box">
                    <div className="wrap__temp_desc_img">
                        <div className="wrap__temp__img">
                            <span className="temperature">
                                {Math.round(data.main.temp)}ºC
                            </span>
                            <img
                                src={`images/${data.weather[0].icon}.png`}
                                className="weather__icon"
                                alt=""
                            />
                        </div>
                        <div className="weather__description">
                            {data.weather[0].description.toUpperCase()}
                        </div>
                    </div>
                    <div className="bottom">
                        <div className="details">
                            <div className="param-row">
                                <div className="param-label">Feels like</div>
                                <div className="param-value">
                                    {Math.round(data.main.feels_like)}ºC
                                </div>
                            </div>
                            <div className="param-row">
                                <div className="param-label">Humidity</div>
                                <div className="param-value">
                                    {data.main.humidity}%
                                </div>
                            </div>
                            <div className="param-row">
                                <div className="param-label">Wind</div>
                                <div className="param-value">
                                    {Math.round(data.wind.speed)}m/s
                                </div>
                            </div>
                            <div className="param-row">
                                <div className="param-label">Pressure</div>
                                <div className="param-value">
                                    {data.main.pressure} hPa
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CurrentWeather;
