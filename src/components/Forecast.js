import React from "react";
import ForecastItem from "./ForecastItem";

const Forecast = ({forecastData, clickHandler, selectedIndex}) => 
    <div className="forecast-list">
        {
            <ForecastItem selectedIndex={selectedIndex} forecastData={forecastData} clickHandler={clickHandler}/>
        }
    </div>

export default Forecast;
