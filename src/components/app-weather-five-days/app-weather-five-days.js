
import './app-weather-five-days.scss'
import { Component } from "react";
import AppImageBlock from "../app-image-block/app-image-block";

 class AppWeatherFiveDays extends Component{
    state = {
        active: false
     }

    getDayAndWeather = (array, array2, array3) =>{
        if (array){
            let datesArr = array.map((obj => {
                return new Date (obj.dt * 1000).toLocaleDateString();
            }))
            return datesArr;
        } else if(array2){
            let conditions=  array2.flat().map((obj) =>obj.main)
            return conditions
        } else if (array3) {
            let  idArray= array3.flat().map((obj) =>obj.id)
            return idArray;
        }
    }
    
    showBlock = () =>{
        this.setState((state) =>({
            active: !state.active
        }))
    }


    render() {
        const {fiveDaysData, fiveDaysTemp, timeForChangeTheme} = this.props
        let changeTitleClass;
        changeTitleClass = (timeForChangeTheme ==23 || timeForChangeTheme >=0 && timeForChangeTheme <= 4 )? 'item-title item-title-change' : 'item-title';

        let className ;
        if(this.state.active===false){
            className = 'none-five-days' 
        } else{
            className = 'five-days-items f-flex flex-column items-active'   
        }

        let buttonClassName;
        if(fiveDaysData &&fiveDaysTemp){
            buttonClassName = 'button-five-days btn btn-outline-light'
        } else{
            buttonClassName = 'button-none'
        }

        let days = '';
        let weather = '';
        let id = '';
        let temp= '';
        if(fiveDaysData){
            let arrayWeather = fiveDaysData.map((obj) => obj.weather)
            days = this.getDayAndWeather(fiveDaysData, undefined)
            weather = this.getDayAndWeather(undefined, arrayWeather)
            id = this.getDayAndWeather(undefined, undefined, arrayWeather)
        } 
        if (fiveDaysTemp){
            temp = fiveDaysTemp
            console.log(temp)
        }

        return (
            <div className="five-days-wrapper d-flex flex-column">
                <div>
                    <button 
                    className={buttonClassName}
                    onClick={() => this.showBlock()}
                    > Show 5-day forecast</button>
                    </div>
                
                <div className={className}>
                    <div className="five-days-item d-flex">
                    <span className={changeTitleClass}>Tomorrow</span>
                    <AppImageBlock skyToday = {weather[0]} id = {id[0]} className='five-days-icon' />
                    <span className='temp'> {temp[0]} °С</span>
                    </div>
        
                    <div className="five-days-item d-flex">
                    <span className={changeTitleClass}>{days[1]}</span>
                    <AppImageBlock skyToday = {weather[1]} id = {id[1]} className='five-days-icon' />
                    <span className='temp'> {temp[1]}°С</span>
                    </div>
        
                    <div className="five-days-item d-flex">
                    <span className={changeTitleClass}>{days[2]}</span>
                    <AppImageBlock skyToday = {weather[2]} id = {id[2]} className='five-days-icon' />
                    <span className='temp'> {temp[2]}°С</span>
                    </div>
        
                    <div className="five-days-item d-flex">
                    <span className={changeTitleClass}>{days[3]}</span>
                    <AppImageBlock skyToday = {weather[3]} id = {id[3]} className='five-days-icon' />
                    <span className='temp'> {temp[3]}°С</span>
                    </div>
        
                    <div className="five-days-item d-flex">
                    <span className={changeTitleClass}>{days[4]}</span>
                    <AppImageBlock skyToday = {weather[4]} id = {id[4]} className='five-days-icon' />
                    <span className='temp'> {temp[4]}°С</span>
                    </div>
                </div>
            </div>
        )
    }
 
}
export default AppWeatherFiveDays;
