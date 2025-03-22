import React, { Component } from "react";
import MyMap from "../map/MyMap";
import "./DisplayCurrentWeather.css";

export default class DisplayCurrentWeather extends Component {
  constructor(props) {
    super(props);
    this.state = {
      location: this.props.currWeather.location,
      weather: this.props.currWeather.current,
    };
  }
  componentWillReceiveProps(nextProps) {
    this.setState({
      location: nextProps.currWeather.location,
      weather: nextProps.currWeather.current,
    });
  }
  render() {
    const { name, region, country } = this.state.location;
    return (
      <div className="air-weather">
        <div className="air-weather-info">
          <div className="air-location-info">
            <p>{`${name}, ${region}`}</p>
            <p>{`|| Country: ${country}`}</p>
          </div>
          <h3>{this.state.weather.condition.text}</h3>
          <p>{`Last updated: ${this.state.weather.last_updated}`}</p>
          <p>{`Temperature(C): ${this.state.weather.temp_c}`}</p>
          <p>{`Wind speed(kph): ${this.state.weather.wind_kph}`}</p>
          <p>{`Wind degree: ${this.state.weather.wind_degree}`}</p>
          <p>{`Wind Direction: ${this.state.weather.wind_dir}`}</p>
          <p>{`Pressure(mb): ${this.state.weather.pressure_mb}`}</p>
          <p>{`Precipitation(mm): ${this.state.weather.precip_mm}`}</p>
          <p>{`Visibility(km): ${this.state.weather.vis_km}`}</p>
          <p>{`Humidity: ${this.state.weather.humidity}`}</p>
          <p>{`Gust(kph): ${this.state.weather.gust_kph}`}</p>
        </div>
        <div className="air-map-container">
          <MyMap
            location={this.props.currWeather.location}
            icon={this.props.currWeather.current.condition.icon}
            coords={[
              this.props.currWeather.location.lat,
              this.props.currWeather.location.lon,
            ]}
          />
        </div>
      </div>
    );
  }
}
