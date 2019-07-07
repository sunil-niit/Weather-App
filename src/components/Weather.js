import React from "react";

const Weather = ({dayName, temparature, description, cityName, iconType}) => (
    <div className="weather">
      <h1>{cityName}</h1>
      <p>{`${dayName}, 12:00 pm`}</p>
      <p>{description}</p>
      <div className="tempratrue">
        <img src={`http://openweathermap.org/img/w/${iconType}.png`} alt="weather" />
        <div className="tempratrue-data">
          <div className="number">{temparature}</div>
          <div className="unit">°C | °F</div>
        </div>
      </div>
    </div>
  );

export default Weather;
