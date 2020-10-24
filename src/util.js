import React from "react";
import { Circle, Popup } from "react-leaflet";
import numeral from "numeral";
import "./Map.css";

const casesTypeColors = {
  cases: {
    hex: "#CC1034",
    rgb: "rgb(204, 16, 52)",
    half_op: "rgba(204, 16, 52, 0.5)",
    multiplier: 600,
  },
  recovered: {
    hex: "#7dd71d",
    rgb: "rgb(125, 215, 29)",
    half_op: "rgba(125, 215, 29, 0.5)",
    multiplier: 500,
  },
  deaths: {
    hex: "#827f7a",
    rgb: "rgb(251, 68, 67)",
    half_op: "rgba(251, 68, 67, 0.5)",
    multiplier: 800,
  },
};

export const sortDataCases = (data) => {
  let sortedData = data;
  sortedData.sort((a, b) => {
    if (a.active > b.active) {
      return -1;
    } else {
      return 1;
    }
  });
  console.log(sortedData);
  let asc = sortedData.slice(0, 10);
  return asc;
};
export const sortDataDeaths = (data) => {
  let sortedData = data;
  sortedData.sort((a, b) => {
    if (a.deaths > b.deaths) {
      return -1;
    } else {
      return 1;
    }
  });
  let death = sortedData.slice(0, 10);
  return death;
};

export const sortRecoveredData = (data) => {
  let sortedData = data;
  sortedData.sort((a, b) => {
    if (a.recovered > b.recovered) {
      return -1;
    } else {
      return 1;
    }
  });
  let recover = sortedData.slice(0, 10);
  return recover;
};

export const sortContinentData = (data) => {
  let continent = data;
  continent.sort((a, b) => {
    if (a.cases > b.cases) {
      return -1;
    } else {
      return 1;
    }
  });
  return continent;
};

export const showDataOnMap = (
  countries,
  center,
  countryInfo,
  enable,
  casesType = "cases"
) =>
  countries.map((country) => (
    <>
      <Circle
        center={[country.countryInfo.lat, country.countryInfo.long]}
        color={casesTypeColors[casesType].hex}
        fillColor={casesTypeColors[casesType].hex}
        fillOpacity={0.4}
        radius={
          Math.sqrt(country[casesType]) * casesTypeColors[casesType].multiplier
        }
      >
        <Popup className="info_container">
          <div
            className="info_map"
            style={{ backgroundImage: `url(${country.countryInfo.flag})` }}
          ></div>
          <h5>{country.country} </h5>

          {casesType === "cases" && (
            <h5>Cases: {numeral(country.cases).format()} </h5>
          )}
          {casesType === "recovered" && (
            <h5>Recovered: {numeral(country.recovered).format()} </h5>
          )}
          {casesType === "deaths" && (
            <h5>Deaths: {numeral(country.deaths).format()} </h5>
          )}
        </Popup>
      </Circle>
      {enable && (
        <Circle
          center={center}
          color={"green"}
          fillColor={"green"}
          fillOpacity={0.4}
          radius={Math.sqrt(countryInfo.cases) * 50}
        >
          <Popup className="info_container">
            {/* {
          enable &&
          <div className="info_map"
            style={{ backgroundImage: `url(${countryInfo.countryInfo.flag})` }}>
          </div>
          } */}
            <h2>{countryInfo.country} </h2>
            <h3>Cases: {numeral(countryInfo.cases).format()} </h3>
          </Popup>
        </Circle>
      )}
    </>
  ));

export const numberFormat = (stat) =>
  stat ? `+${numeral(stat).format("0.0a")}` : "+0";
