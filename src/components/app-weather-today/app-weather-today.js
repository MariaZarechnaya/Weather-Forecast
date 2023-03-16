// import { Component } from 'react';
import {  useEffect } from "react";
import './app-weather-today.scss'

const AppWeatherToday = ({weatherTemp, weatherFeelsLike ,weatherWind, weatherHumidity, city,date, timeForChangeTheme, lat, lon, func }) =>{
        let changeSpan;
        let changeTitle;
        changeSpan = (timeForChangeTheme ==23 || timeForChangeTheme >=0 && timeForChangeTheme <= 4 )? 'span change-text-color' : 'span';
        changeTitle =  (timeForChangeTheme ==23 || timeForChangeTheme >=0 && timeForChangeTheme <= 4 )? 'h1 change-text-color' : 'h1';
        const title = city? city : 'Weather'
        return(
                <div className="today-wrapper  ">
                        <h1 className={changeTitle}>   {title}   <span className={changeSpan}> {date}</span> </h1>
                        <p className="temp"> <span className={changeSpan}>Temp:</span>{weatherTemp} °С</p>
                        <p className="temp"><span className={changeSpan}>Feels like:</span>{weatherFeelsLike} °С</p>
                        <p className="wind"><span className={changeSpan}>Wind:</span>{weatherWind} m/s</p>
                        <p className="humidity"><span className={changeSpan}>Hum:</span>{weatherHumidity} %</p>
                </div>
        )
}


export default AppWeatherToday;