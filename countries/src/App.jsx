import { useState, useEffect } from "react";
import countriesService from "./services/countries";
import ProgressIndicator from "./components/ProgressIndicator";
import CountryDetails from "./components/CountryDetails";

function App() {
  const [countryName, setCountryName] = useState("");
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    countriesService.getAll().then((response) => {
      setCountries(response.data);
    });
  }, []);

  const handleCountryChange = (countryName) => {
    setCountryName(countryName);
  };

  const filteredCountries = countries.filter((c) => {
    return c.name?.common
      ?.toLowerCase()
      .includes(countryName.trim().toLowerCase());
  });

  return (
    <>
      <ProgressIndicator countries={countries}></ProgressIndicator>
      <div hidden={countries.length === 0}>
        <form>
          <label htmlFor="countryInput">find countries </label>
          <input
            onChange={(event) => handleCountryChange(event.target.value)}
            id="countryInput"
          ></input>
          {filteredCountries.length == 1 ? (
            <CountryDetails country={filteredCountries[0]}></CountryDetails>
          ) : filteredCountries.length > 10 ? (
            <div>Too many matches, specify another filter</div>
          ) : (
            <ul>
              {filteredCountries.map((c) => (
                <li key={c.cca3}>{c.name.common}</li>
              ))}
            </ul>
          )}
        </form>
      </div>
    </>
  );
}

export default App;
