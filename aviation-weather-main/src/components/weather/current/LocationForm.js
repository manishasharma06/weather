import { Form, Label } from "semantic-ui-react";
import React, { useState, useEffect } from "react";
import SelectLocation from "./SelectAirport";
import axios from "axios";
import DisplayCurrentWeather from "./DisplayCurrentWeather";
import "./LocationForm.css";

let airportOptions = [{ key: "NA", value: "NA", text: "Not available" }];

const LocationForm = (props) => {
  const [lat, setLat] = useState("");
  const [long, setLong] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [currWeather, setCurrWeather] = useState({ current: {}, location: {} });

  //on props update
  useEffect(() => {
    if (props.airportData) {
      const airp = props.airportData.map((item) => {
        return {
          key: item.IATA,
          value: item.IATA,
          text: `${item.Name} (${item.IATA})`,
        };
      });
      airportOptions = airp;
    }
    return () => {
      console.log("clean up Location form airport data");
    };
  }, [props.airportData]);

  const handleChange = (e, { name, value }) => {
    name === "lat" ? setLat(value) : setLong(value);
  };

  const getAirportValue = (val) => {
    const selectedAirportDetails = props.airportData.find(
      (item) => item.IATA === val
    );
    if (selectedAirportDetails) {
      setLat(selectedAirportDetails.Latitude);
      setLong(selectedAirportDetails.Longitude);
    }
  };

  const handleSubmit = () => {
    axios
      .get("http://localhost:5000/currentWeather", {
        params: {
          lat: lat,
          long: long,
        },
      })
      .then((res) => {
        setCurrWeather(res.data);
        console.log(res.data);
      })
      .then(() => setSubmitted(true))
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="air-form">
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <SelectLocation
            airportOptions={airportOptions}
            sendVal={getAirportValue}
          />
          <h4>OR</h4>
          <Form.Input
            placeholder="Latitude"
            name="lat"
            value={lat}
            onChange={handleChange}
          />
          <Form.Input
            placeholder="Longitude"
            name="long"
            value={long}
            onChange={handleChange}
          />
          <Form.Button primary disabled={!(lat && long)} content="Submit" />
        </Form.Group>
      </Form>
      {submitted && (
        <DisplayCurrentWeather currWeather={currWeather} coords={[lat, long]} />
      )}
    </div>
  );
};

export default LocationForm;
