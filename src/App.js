import React, { Component } from 'react';
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import { Navbar, Nav, Form, FormControl, Button, NavDropdown } from 'react-bootstrap';
import Weatherbox from './components/WeatherBox.js'

const apikey = process.env.REACT_APP_APIKEY;

// export const changeCity = async (city) => {
//   let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}&units=metric`;
//   let data = await fetch(url);
//   let cityResult = await data.json();

//   console.log(cityResult)
//   console.log(city)
// }

export default class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      weather: null
    }
    this.state = {
      isLoading: true
    };

  }

  componentDidMount() {
    this.geoLocation()

  }
  // 1) how to change city
  // 2) how get weather by current location

  callWeather = async (latitude, longitude) => {
    let url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apikey}&units=metric`
    let data = await fetch(url);
    let result = await data.json();

    console.log(url)

    console.log(result)
    this.setState({
      locationName: result.name,
      temp: result.main.temp,
      description: result.weather[0].description,
      isLoading: false
    });

    console.log(result.weather[0].description)
    console.log(result.name)
    console.log(result.main.temp)
    console.log(this.state)

  }

  showLocation = (position) => {
    var latitude = position.coords.latitude;
    var longitude = position.coords.longitude;
    alert("Latitude : " + latitude + "Longitude: " + longitude)
  }

  errorHandler = (err) => {
    if (err.code === 1) {
      alert("ERROR: Access is denied!");
    } else if (err.code === 2) {
      alert("ERROR: Position is unavailable")
    }
  }

  geoLocation = () => {
    navigator.geolocation.getCurrentPosition((post) => {
      this.callWeather(post.coords.latitude, post.coords.longitude)
    })

  }



  render() {

    if (this.state.isLoading === true) {
      return (
        <h1>Loading...</h1>
      )
    }
    return (

      <div className='body'>
        <Navbar bg="dark" variant="dark">
          <NavDropdown title="Countries" id="basic-nav-dropdown">
            <NavDropdown.Item onClick={() => changeCity('Ho Chi Minh City')} href="#action/3.1">Ho Chi Minh City</NavDropdown.Item>
            <NavDropdown.Item onClick={() => changeCity('Cape Town')} href="#action/3.2">Cape Town</NavDropdown.Item>
            <NavDropdown.Item onClick={() => changeCity('Toronto')} href="#action/3.3">Toronto</NavDropdown.Item>
            <NavDropdown.Item onClick={() => changeCity('Mexico City')} href="#action/3.3">Mexico City</NavDropdown.Item>
            <NavDropdown.Item onClick={() => changeCity('Amsterdam')} href="#action/3.3">Amsterdam</NavDropdown.Item>
            <NavDropdown.Item onClick={() => changeCity('Vladivostok')} href="#action/3.3">Vladivostok</NavDropdown.Item>
            <NavDropdown.Item onClick={() => changeCity('Seoul')} href="#action/3.3">Seoul</NavDropdown.Item>
            <NavDropdown.Item onClick={() => changeCity('New York')} href="#action/3.3">New York</NavDropdown.Item>
            <NavDropdown.Item onClick={() => changeCity('Lima')} href="#action/3.3">Lima</NavDropdown.Item>
          </NavDropdown>
          <Navbar.Brand href="#home">WEATHER</Navbar.Brand>
          <Nav className="mr-auto">
          </Nav>
          <Form inline>
            <FormControl type="text" placeholder="Search" className="mr-sm-2" />
            <Button variant="outline-info">Search</Button>
          </Form>
        </Navbar>

        <div className="container-fluid text-white my-auto">
          <div className="container mx-auto my-4 py-4">
            <div className="row justify-content-center text-center">
              <h1 className="col-12 display-4 my-2 py-3 text-success">
                Awesome Weather App
            </h1>
              <Weatherbox city={this.state.locationName} temp={this.state.temp} description={this.state.description}></Weatherbox>
            </div>
          </div>
        </div >
      </div > 
    )
  }
}


// icon: data.weather[0].icon 


// 