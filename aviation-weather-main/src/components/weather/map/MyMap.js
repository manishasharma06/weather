import React, { Component } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import * as L from "leaflet";
import ChangeView from "./ChangeView";
// import { map } from "leaflet";
// import * as MapIcons from "./MapIcons";

export default class MyMap extends Component {
  constructor(props) {
    super(props);
    this.state = {
      position: props.coords,
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ position: nextProps.coords });
  }

  componentDidUpdate() {
    // const map = useMapEvents(map.flyTo(this.state.position, map.getZoom()));
    // L.map.flyTo(this.state.position);
  }

  render() {
    const icon = new L.Icon({
      iconUrl: new URL(`https:${this.props.icon}`),
      iconSize: [70, 76],
    });

    return (
      <MapContainer
        center={this.state.position}
        zoom={13}
        style={{ width: "50vw", height: "50vh" }}
        scrollWheelZoom={true}
      >
        <ChangeView center={this.state.position} zoom={13}/>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={this.state.position} icon={icon}>
          <Popup>{`${this.props.location.name}, ${this.props.location.country}`}</Popup>
        </Marker>
      </MapContainer>
    );
  }
}
