import { useState, useEffect } from "react";
import "./App.css";
import Header from "./components/Header/Header";
import LocationForm from "./components/weather/current/LocationForm";
import { Routes, Route } from "react-router-dom";
import axios from "axios";
import DisplayCurrentWeather from "./components/weather/current/DisplayCurrentWeather";

function App() {
  const [airportData, setAirportData] = useState([]);

  //didMount
  useEffect(() => {
    axios
      .get("http://localhost:5000/airports")
      .then((res) => {
        setAirportData(res.data.airportData);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<LocationForm airportData={airportData} />} />
        {/* <Route path="/forecast" element={<Home lang={props.lang} />} /> */}
      </Routes>
      {/* <DisplayCurrentWeather /> */}
    </div>
  );
}

export default App;
