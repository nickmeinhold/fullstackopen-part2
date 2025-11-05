import { useState, useEffect } from "react";
import countriesService from "./services/countries";
import ProgressIndicator from "./components/ProgressIndicator";

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
          <div>{countryName}</div>
          <ul>
            {countries
              .filter((c) => {
                return (
                  c.name?.common?.toLowerCase() ===
                  countryName.trim().toLowerCase()
                );
              })
              .map((c) => (
                <li key={c.cca3}>{c.name.common}</li>
              ))}
          </ul>
        </form>
      </div>
    </>
  );
}

export default App;
