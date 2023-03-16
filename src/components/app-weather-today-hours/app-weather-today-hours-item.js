
import './app-weather-today-hours-item.scss'
import { Component } from 'react';
import AppImageBlock from '../app-image-block/app-image-block';

class AppTodayHoursItem extends Component { // сюда приходит объект

    getConditions = (arr) =>{
        let weather = arr.flat().map((obj) => obj.main);
        return weather;
    }

    getId = (arr) =>{
        let id = arr.flat().map((obj) => obj.id);
        return id;
    }

    render () {
        const {temp, time} = this.props
        const {hourlyDataWeather} = this.props
        let data;
        if(hourlyDataWeather){
            data =this.getConditions(hourlyDataWeather)
        }
        let id ;
         if(hourlyDataWeather){
            id =this.getId(hourlyDataWeather)
        }

        return (
            <div className='cards-wrapper d-flex justify-content-between '>
                <div className="today-card">
                <p className="hours-temp"> {temp[0]} °C</p>
                <AppImageBlock skyToday = {data[0]} id = {id[0]} className='hour-icon' />

              <p className="hours-time"> {time[0]}</p>
                </div>
                <div className="today-card">
                <p className="hours-temp"> {temp[1]} °C</p>
                <AppImageBlock skyToday = {data[1]} id = {id[1]} className='hour-icon' />
                <p className="hours-time"> {time[1]}</p>
                </div>
    
                <div className="today-card">
                <p className="hours-temp"> {temp[2]} °C</p>
                <AppImageBlock skyToday = {data[2]} id = {id[2]} className='hour-icon' />
                <p className="hours-time"> {time[2]}</p>
                </div>
    
                <div className="today-card">
                <p className="hours-temp"> {temp[3]} °C</p>
                <AppImageBlock skyToday = {data[3]} id = {id[3]}  className='hour-icon' />
              <p className="hours-time">{time[3]} </p>
                </div> 
            </div> 
        )
    }
}

export default AppTodayHoursItem;