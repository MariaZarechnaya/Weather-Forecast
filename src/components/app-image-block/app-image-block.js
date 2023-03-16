
import './app-image-block.scss';
import clouds from '../../images/Cloudy2.svg'
import thunderstorm  from '../../images/Thunder2.svg'
import snow from '../../images/Snowy2.svg'
import rain from '../../images/Rain2.svg'
import  clear from '../../images/Sunny.svg'
import tornado from '../../images/Tornado.svg'
import clearNight from '../../images/Night-clear.svg'
import cloudyNight from '../../images/Night-clouds.svg'

const AppImageBlock =(props) =>{
    const {skyToday, id, className, classNone,  timeForChangeTheme} = props;
    let icon = '';
    let night='';
    if(timeForChangeTheme ==23 || timeForChangeTheme >=0 && timeForChangeTheme <= 4){
        night = true
    } else{
        night = false
    }
    if (id && id >= 801 && id<=804 ){
        console.log(id)
        icon = clouds;
    }
    if ((id && id >= 801 && id<=804) && night ){
        console.log(id)
        icon = cloudyNight;
    }
    if (id && id >= 500 && id<=531 || id && id >= 300 && id<=321 ){
        console.log(id)
        icon = rain;
    }
    if (id && id >= 600 && id<=622){
        console.log(id)
        icon = snow;
    }
    if (id && id >= 200 && id<=232){
        console.log(id)
        icon = thunderstorm;
    }
    if (id && id === 800 ){
        console.log(id)
        icon = clear;
    } 
    if (id && id === 800 & night){
        console.log(id)
        icon = clearNight;
    } 
    if (id && id === 771 || id && id === 781 ){
        console.log(id)
        icon = tornado;
    } 
    let style = skyToday? className : classNone

    return(
        <div className={style}>   
        <img src={icon} alt={skyToday} />
        <p className='today-icon-text'>{skyToday}</p>
        </div>

    )
}

export default AppImageBlock;