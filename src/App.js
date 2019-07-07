import React, { Component } from 'react';
import "./assets/css/App.css";
import Weather from "./components/Weather";
import Forecast from "./components/Forecast";
import moment from 'moment'
import axios from 'axios'

export default class App extends Component {
    static displayName = 'Weather App'

    constructor(props) {
        super(props)
        const cities = [{
          name: 'Singapore',
          selected: true
        },{
          name: 'London',
          selected: false
        },{
          name: 'Mumbai',
          selected: false
        },
        {
          name: 'Bangalore',
          selected: false
        },
        {
          name: 'Jaipur',
          selected: false
        }];
        this.state = { data: [],context:{},cities: cities, currentForecastIndex: 0 }
       
    }

    componentDidMount() {
      axios
      .get('https://api.openweathermap.org/data/2.5/forecast?q=Singapore&APPID=bd0d6bd64dae58d5c1bd84a4501c8222')
      .then(response => {
        const weatherData = response.data.list;
        const filterWeatherData = weatherData.filter(({dt_txt}) => dt_txt.indexOf('12:00:00') >= 0)
        console.log('successful', filterWeatherData)
        this.setState({data:filterWeatherData, context: filterWeatherData[0]})
      })
      .catch(error => console.log(error, '*** ERROR IN GETTING weather forecast ***'))
    }

    clickHandler = index => {
      const {data} = this.state
      this.setState({context:data[index],currentForecastIndex: index})
    }

    changeHandler = (cityName) => {
      axios
      .get(`https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&APPID=bd0d6bd64dae58d5c1bd84a4501c8222`)
      .then(response => {
        const weatherData = response.data.list;
        const {cities} = this.state
        const filterWeatherData = weatherData.filter(({dt_txt}) => dt_txt.indexOf('12:00:00') >= 0)
        console.log('successful', filterWeatherData)
        this.setState({data:filterWeatherData, context: filterWeatherData[0], currentForecastIndex: 0,cities: cities.map(city => ({...city,selected: city.name === cityName}))})
      })
      .catch(error => console.log(error, '*** ERROR IN GETTING weather forecast ***'))
    }

 
    render() {
    
      const {context,data,cities,currentForecastIndex} = this.state
      const cityName = cities.find(city => city.selected).name
      let dayName = '', description = '', temparature = '', iconType = '';
      if(context && context.weather) {
        console.log(context.dt_txt)
        dayName = moment(context.dt_txt).format('dddd')
        description = context.weather[0].description
        temparature = Math.ceil(context.main.temp - 273.15)
        iconType = context.weather[0].icon
      }
      return (
        <div className="weather-widget">
          <div className="container">
            <div className="filter">
              <label>
                City: <select onChange={(e) => this.changeHandler(e.target.value)} id="city">
                  <option value="0" disabled selected>Select</option>
                  {cities.map((city, index) =>  <option key={index} selected={city.selected}>{city.name}</option>)}
                </select>
              </label>
            </div>
          <Weather iconType={iconType} cityName={cityName} dayName={dayName} description={description} temparature={temparature} />
          <Forecast selectedIndex={currentForecastIndex} forecastData={data} clickHandler={this.clickHandler} />
          </div>
        </div>
      );
    }
}

