import { Component } from "react";
import './app-weather-today-hours.scss';
import AppTodayHoursItem from './app-weather-today-hours-item';
import { _apiKey } from "../app/app";

class AppWeatherTodayHours extends Component{  
  render() {
    const{ temp, time, hourlyDataWeather} = this.props;  // массив  
    console.log(hourlyDataWeather)
    let item;
    if (temp && time&& hourlyDataWeather){
      item = <AppTodayHoursItem temp={temp} time={time} hourlyDataWeather = {hourlyDataWeather} />         
    }
    return (
      <div className="today-hours-block  d-flex flex-column">
        {item}     
      </div>
    )
  }
}

export default AppWeatherTodayHours;