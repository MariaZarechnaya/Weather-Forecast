import { useState, useEffect } from "react";
import AppHeader from "../app-header/app-header";
import './app.scss';
import AppImageBlock from "../app-image-block/app-image-block";
import AppWeatherToday from "../app-weather-today/app-weather-today";
import AppWeatherTodayHours from "../app-weather-today-hours/app-weather-today-hours";
import AppWeatherFiveDays from "../app-weather-five-days/app-weather-five-days";


export const _apiKey = process.env.REACT_APP_API_KEY;
const App = () =>{
 const [lat, setLat] = useState(undefined);
 const [lon, setLon] = useState(undefined);
 const [town, setTown] = useState(undefined);
 const [date, setDate] = useState ('');
 const [temp, setTemp] = useState (undefined);
 const [feelsLike, setFeelsLike] = useState (undefined);
 const [wind, setWind] = useState (undefined);
 const [humidity, setHumidity] = useState (undefined);
 const [err, setErr] = useState (undefined);
 const [skyToday, setSkyToday] = useState (undefined);
 const [id, setId] = useState (undefined);
 const [hourlyTemp, setHourlyTemp] = useState (undefined);
 const [hourlyTime, sethourlyTime] = useState (undefined);
 const [hourlyDataWeather, setHourlyDataWeather] = useState (undefined);
 const [fiveDays, setFiveDays] = useState (undefined);
 const [fiveDaysTemp, setFiveDaysTemp] = useState (undefined);
 const [timeForChangeTheme, setTimeForChangeTheme] = useState (new Date().getHours());


 useEffect (() => {
    console.log('useEffect')
    if(lat && lon){
      getWeather(lat, lon);
      getHourlyWeather(lat, lon);
      getLongTimeWeather (lat, lon);
    }

  }, [lat,lon,town]);


 const getCoordinate =  async(event) =>{     // метод по получению координат , записываем его в стейты
    event.preventDefault();
    const city = event.target.elements.city.value
    if(city){
      console.log('Запрос координат')
      const data = await fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${_apiKey}`).then(response => response.json()).catch((err) => console.log(err));
      setTown( data[0].name);
      setLat ( data[0].lat);
      setLon ( data[0].lon);
    };
  }

 const getWeather = async(lat, lon) =>{              // метод получает данные по погоде 
    console.log('Запрос данных за день')
    const apiWeatherUrl = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${_apiKey}&units=metric`);   
    const data  = await apiWeatherUrl.json();
    console.log('Данные за день')
    // console.log(data)
    const date = data.dt
    // console.log('время для смены стиля')
    // console.log(date)
    const today = new Date(date * 1000).toDateString()
    // console.log(today)

   setDate(today);
   setTemp(Math.round(data.main.temp));
   setFeelsLike(Math.round (data.main.feels_like));
   setWind(Math.round  (data.wind.speed));
   setHumidity(data.main.humidity);
   setSkyToday(data.weather[0].main);
   setId(data.weather[0].id)
  }

 const getHourlyWeather = async(lat, lon) =>{
    console.log('запрос погоды по часам')
    const hourlyData = await fetch (`https://api.openweathermap.org/data/2.5/forecast?cnt=4&lat=${lat}&lon=${lon}&appid=${_apiKey}&units=metric`)    //*
    const hourly = await hourlyData.json();
    const everyHoursData = hourly.list;
    console.log(everyHoursData)
    const dataAllTemp = everyHoursData.map((obj) => Math.round(obj.main.temp))
    const dataAllTime = everyHoursData.map((obj) => obj.dt)
    console.log(dataAllTime)
    let onlyTime = dataAllTime.map((item) =>{
      return  new Date (item * 1000).toLocaleTimeString().slice(0, 5)
    })
    const hourlyDataWeather = everyHoursData.map((obj) => obj.weather)
    setHourlyTemp(dataAllTemp);
    sethourlyTime(onlyTime);
    setHourlyDataWeather (hourlyDataWeather);
  }

  const getLongTimeWeather = async(lat, lon) =>{
    const longTimeWeather = await fetch (`https://api.openweathermap.org/data/2.5/forecast?cnt=120&lat=${lat}&lon=${lon}&appid=${_apiKey}&units=metric`).then(response => response.json()) 
    console.log('запрос погоды по дням')
    const allDays = longTimeWeather.list;
    console.log(allDays)
    const filterFiveDays = allDays.filter((item) =>{
      let time =  new Date (item.dt * 1000).toLocaleTimeString()
      if(time == '00:00:00')
      return item
    })
    // console.log(filterFiveDays)
    let temp = filterFiveDays.map((obj) => Math.round(obj.main.temp))
    setFiveDays(filterFiveDays);
    setFiveDaysTemp(temp)
  }

  const theme = () =>{
    let themeClass ;
    if (timeForChangeTheme >=5 &&timeForChangeTheme< 12){ 
      themeClass = 'wrapper wrapper-morning'
    } else if (timeForChangeTheme >=12 &&timeForChangeTheme< 17) {
      themeClass = 'wrapper wrapper-day'
    } else if (timeForChangeTheme >=17 && timeForChangeTheme< 23) {
      themeClass = 'wrapper wrapper-evening'
    } else if (timeForChangeTheme ==23 || timeForChangeTheme >=0 && timeForChangeTheme <= 4 ) {
      themeClass = 'wrapper wrapper-night'
    }
    return themeClass
    
  }
        
  return(
    <div className= {theme()} > 
    < AppHeader coords= {getCoordinate}
    />
    <main>
    <section className="app-today-section">
    <AppWeatherToday 
    func = {getWeather}
    lat = {lat} //
    lon = {lon} //
    weatherTemp={temp}
    weatherFeelsLike = {feelsLike}
    weatherWind = {wind}
    weatherHumidity = {humidity}
    city= {town} // city
     date = {date}
    timeForChangeTheme= {timeForChangeTheme} 
    />
    <AppImageBlock skyToday = {skyToday}
    id = {id}
    className = 'app-image-block-img'
    classNone = 'none'
    timeForChangeTheme ={timeForChangeTheme}
    />
    </section>
    <section className="today-hours-section">

    <AppWeatherTodayHours 
    temp = {hourlyTemp}
    time = {hourlyTime} 
    hourlyDataWeather= {hourlyDataWeather}

    />
    </section>
    <section>
    <AppWeatherFiveDays 
    fiveDaysData = {fiveDays}
    fiveDaysTemp = {fiveDaysTemp}
    timeForChangeTheme= {timeForChangeTheme}
    />
    </section>
    </main>
    </div>
  )  
}

export default App;