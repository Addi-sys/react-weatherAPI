import React, { Component } from 'react'

export default class WeatherBox extends Component {
    render() {
        return (
            <div className="weatherBox">
                <h2 className="col-12">{this.props.city}</h2>
                <h3 className="col-12 text-danger">{this.props.temp}</h3>
                <h3 className="col-12">{this.props.description}</h3>
            </div>
        )
    }
}
