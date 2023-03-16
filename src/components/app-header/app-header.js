import { Component } from "react"
import './app-header.scss'

class AppHeader extends Component {
    render(){
        return(
            <header>
            <div className="header-block">
            <form  
            onSubmit={this.props.coords}
            action=""
            name= 'city'
            >
            <input   className= "header-input form-control" type="text" name="city" id="" placeholder="Enter a city name"  />
            <button className="btn btn-outline-light"> Search </button>
            </form>
            </div>
            </header>
        )  
    }
}

export default AppHeader;