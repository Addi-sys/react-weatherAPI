import React, { Component } from 'react';
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import { Navbar, Nav, Form, FormControl, Button, NavDropdown } from 'react-bootstrap';

const apikey = process.env.REACT_APP_APIKEY;

export default class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      weather: null
    }
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
    console.log(result);
    this.setState({ locationName: data.name });
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
      console.log(post.coords.longitude)
      console.log(post.coords.latitude)

      this.callWeather(post.coords.latitude, post.coords.longitude)
  
    })

  }



  render() {

    if (this.state.weather === null) {
      return (
        <h1>Loading...</h1>
      )
    }
    return (

      <div className='body'>
        <Navbar bg="dark" variant="dark">
          <NavDropdown title="Countries" id="basic-nav-dropdown">
            <NavDropdown.Item href="#action/3.1">Ho Chi Minh City</NavDropdown.Item>
            <NavDropdown.Item href="#action/3.2">Cape Town</NavDropdown.Item>
            <NavDropdown.Item href="#action/3.3">Toronto</NavDropdown.Item>
            <NavDropdown.Item href="#action/3.3">Mexico City</NavDropdown.Item>
            <NavDropdown.Item href="#action/3.3">Amsterdam</NavDropdown.Item>
            <NavDropdown.Item href="#action/3.3">Vladivostok</NavDropdown.Item>
            <NavDropdown.Item href="#action/3.3">Seoul</NavDropdown.Item>
            <NavDropdown.Item href="#action/3.3">New York</NavDropdown.Item>
            <NavDropdown.Item href="#action/3.3">Beunos Aires</NavDropdown.Item>
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
              <h2 className="col-12">{this.state.weather.name}</h2>
              <h3 className="col-12 text-danger">{this.state.weather.main.temp}</h3>
              <h3 className="col-12">{this.state.weather.weather[0].description}</h3>

            </div>
          </div>
        </div >
      </div >
    )
  }
}


