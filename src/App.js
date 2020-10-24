import React, { useState, useEffect } from "react";
import "./App.css";
import { MenuItem, FormControl, Select, CardContent } from "@material-ui/core";
import InfoBox from "./InfoBox";
import { sortDataCases, sortDataDeaths,sortRecoveredData,sortContinentData, numberFormat } from "./util";
import numeral from "numeral";
import Map from "./Map";
import "leaflet/dist/leaflet.css";
import { Accordion, Card } from "react-bootstrap";
import TableCases from "./TableCases";
import TableDeaths from "./TableDeaths";
import TableRecovered from "./TableRecovered";
import TableContinent from "./TableContinent";

const App = () => {
  const [country, setInputCountry] = useState("worldwide");
  const [countryInfo, setCountryInfo] = useState({});
  const [countries, setCountries] = useState([]);
  const [mapCountries, setMapCountries] = useState([]);
  const [tableDataCases, setTableDataCases] = useState([]);
  const [tableDataDeath, setTableDataDeath] = useState([]);
  const [tableDataRecovered, setTableDataRecovered] = useState([]);
  const [tableDataContinent,setTableDataContinent] = useState([]);
  const [casesType, setCasesType] = useState("cases");
  const [mapCenter, setMapCenter] = useState({ lat: 16, lng: -10 });
  const [mapZoom, setMapZoom] = useState(1.5);
  const [color, setColor] = useState("worldwide");
  const [cases, setCases] = useState();
  const [enable, setEnable] = useState(false);

  useEffect(() => {
    fetch("https://disease.sh/v3/covid-19/all")
      .then((response) => response.json())
      .then((data) => {
        setCountryInfo(data);
      });
  }, []);

  useEffect(() => {
    const getCountriesData = async () => {
      fetch("https://disease.sh/v3/covid-19/countries")
        .then((response) => response.json())
        .then((data) => {
          const countries = data.map((country) => ({
            name: country.country,
            value: country.countryInfo.iso2,
          }));
          let casesData = sortDataCases(data);
          let deathsData = sortDataDeaths(data);
          let recoveredData = sortRecoveredData(data);
          setCountries(countries);
          setMapCountries(data);
          setTableDataCases(casesData);
          setTableDataDeath(deathsData);
          setTableDataRecovered(recoveredData);
        });
    };

    const getContinentData = async () => {
      fetch("https://disease.sh/v3/covid-19/continents")
        .then((response) => response.json())
        .then((data) => {
          let continentData = sortContinentData(data);
          setTableDataContinent(continentData);
        });
    };

    getCountriesData();
    getContinentData();
  }, []);

  const onCountryChange = async (e) => {
    const countryCode = e.target.value;

    const url =
      countryCode === "worldwide"
        ? "https://disease.sh/v3/covid-19/all"
        : `https://disease.sh/v3/covid-19/countries/${countryCode}`;
    await fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setInputCountry(countryCode);
        setCountryInfo(data);

        if (countryCode === "worldwide") {
          setMapCenter({ lat: 0, lng: 0 });
          setMapZoom(1.5);
          setCases(data.cases);
          setEnable(false);
        } else {
          setMapCenter([data.countryInfo.lat, data.countryInfo.long]);
          setMapZoom(4);
          setCases(data.cases);
          setEnable(true);
        }
      });
  };

  return (
    <div className="app">
      <div className="app_left">
        <div className="app_header">
          <p>COVID-19 Tracker</p>
          <FormControl>
            <Select
              className="app_dropdown"
              variant="standard"
              value={country}
              onChange={onCountryChange}
            >
              <MenuItem value="worldwide">Worldwide</MenuItem>
              {countries.map((country) => (
                <MenuItem value={country.value}>{country.name}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
        <div className="app_stats">
          <InfoBox
            onClick={(e) => setCasesType("cases")}
            active={casesType === "cases"}
            casesType={casesType}
            title="Coronavirus Cases"
            cases={numberFormat(countryInfo.todayCases)}
            total={numeral(countryInfo.cases).format()}
          />
          <InfoBox
            onClick={(e) => setCasesType("recovered")}
            active={casesType === "recovered"}
            casesType={casesType}
            title="Recovered"
            cases={numberFormat(countryInfo.todayRecovered)}
            total={numeral(countryInfo.recovered).format()}
          />
          <InfoBox
            onClick={(e) => setCasesType("deaths")}
            active={casesType === "deaths"}
            casesType={casesType}
            title="Deaths"
            cases={numberFormat(countryInfo.todayDeaths)}
            total={numeral(countryInfo.deaths).format()}
          />
          {/* <InfoBox
            onClick={(e) => setCasesType("active")}
            active={casesType === "active"}
            casesType={casesType}
            title="Active Cases"
            cases={numberFormat(countryInfo.active)}
          /> */}
        </div>
        <Map
          countries={mapCountries}
          casesType={casesType}
          center={mapCenter}
          zoom={mapZoom}
          countryInfo={countryInfo}
          enable={enable}
        />
      </div>
      <div>
        <Accordion className="app_right">
          <Card className="app_information">
            <Accordion.Toggle as={Card.Header} eventKey="a">
              Countries with Max. Active Cases
            </Accordion.Toggle>
            <Accordion.Collapse eventKey="a">
              <Card.Body>
                <TableCases countries={tableDataCases} />
              </Card.Body>
            </Accordion.Collapse>
          </Card>
          <Card className="app_information">
            <Accordion.Toggle as={Card.Header} eventKey="b">
              Countries with Max. Death Cases
            </Accordion.Toggle>
            <Accordion.Collapse eventKey="b">
              <Card.Body>
                <TableDeaths countries={tableDataDeath} />
              </Card.Body>
            </Accordion.Collapse>
          </Card>
          <Card className="app_information">
            <Accordion.Toggle as={Card.Header} eventKey="c">
              Countries with Max. Recovered Cases
            </Accordion.Toggle>
            <Accordion.Collapse eventKey="c">
              <Card.Body>
                <TableRecovered countries={tableDataRecovered} />
              </Card.Body>
            </Accordion.Collapse>
          </Card>
          <Card className="app_information">
            <Accordion.Toggle as={Card.Header} eventKey="d">
              Continent Wise Cases
            </Accordion.Toggle>
            <Accordion.Collapse eventKey="d">
              <Card.Body>
                <TableContinent continents={tableDataContinent} />
              </Card.Body>
            </Accordion.Collapse>
          </Card>
        </Accordion>
      </div>
    </div>
  );
};

export default App;
