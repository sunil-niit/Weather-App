import React from "react";
import moment from 'moment'

const ForecastItem = ({forecastData, clickHandler, selectedIndex}) => {
  return (
    forecastData.map((item, index) => {      
      return (
        <div key={index} onClick={() => clickHandler(index)} className={selectedIndex === index ? "forecast-item active" : "forecast-item"}>
          <span>{moment(item.dt_txt).format('ddd')}</span>
          <div className="tempratrue">
            <img src={`http://openweathermap.org/img/w/${item.weather[0].icon}.png`} alt="" />
            <div className="tempratrue-data">
              <span className="high">{Math.ceil(item.main.temp_max - 273.15)}°</span>
              <span className="low">{Math.ceil(item.main.temp_min - 273.15)}°</span>
            </div>
          </div>
        </div>
      )
    })
  );
}

export default ForecastItem;
