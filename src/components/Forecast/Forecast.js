import React from "react";
import {
    Accordion,
    AccordionItem,
    AccordionItemButton,
    AccordionItemHeading,
    AccordionItemPanel,
} from "react-accessible-accordion";
import "./Forecast.css";

const WEEK_DAYS = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
];

const Forecast = ({ data }) => {
    const dayInAWeek = new Date().getDay();

    const forecastDays = WEEK_DAYS.slice(dayInAWeek, WEEK_DAYS.length).concat(
        WEEK_DAYS.slice(0, dayInAWeek)
    );

    console.log(forecastDays);

    return (
        <div>
            <Accordion allowZeroExpanded>
                <div className="wrap__accordion">
                    <div className="gradient"></div>
                    {data.list.splice(0, 7).map((item, idx) => (
                        <div className="wrap__accordion__item">
                            <AccordionItem key={idx} className="Accordion-flex">
                                <AccordionItemHeading>
                                    <AccordionItemButton>
                                        <div className="daily-item">
                                            <img
                                                src={`images/${item.weather[0].icon}.png`}
                                                className="forecast__icon"
                                                alt=""
                                            />
                                            <label className="day">
                                                {forecastDays[idx]}
                                            </label>
                                            <div className="wrap__minmax">
                                                <label className="min">
                                                    <span className="minmax-text">
                                                        Min
                                                    </span>
                                                    {Math.round(
                                                        item.main.temp_min
                                                    )}{" "}
                                                    ºC
                                                </label>
                                                <label className="max">
                                                    <span className="minmax-text">
                                                        Max
                                                    </span>
                                                    {Math.round(
                                                        item.main.temp_max
                                                    )}{" "}
                                                    ºC
                                                </label>
                                            </div>
                                        </div>
                                    </AccordionItemButton>
                                </AccordionItemHeading>
                                <div className="wrap__accordion__panel">
                                    <AccordionItemPanel>
                                        <label className="description">
                                            {item.weather[0].description.toUpperCase()}
                                        </label>
                                        <div className="param-row">
                                            <label>Pressure</label>
                                            <label>{item.main.pressure}</label>
                                        </div>
                                        <div className="param-row">
                                            <label>Humidity</label>
                                            <label>{item.main.humidity}%</label>
                                        </div>
                                        <div className="param-row">
                                            <label>Feels like</label>
                                            <label>
                                                {Math.round(
                                                    item.main.feels_like
                                                )}
                                            </label>
                                        </div>
                                    </AccordionItemPanel>
                                </div>
                            </AccordionItem>
                        </div>
                    ))}
                </div>
            </Accordion>
        </div>
    );
};

export default Forecast;
