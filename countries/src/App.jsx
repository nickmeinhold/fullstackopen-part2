import { useState, useEffect } from "react";
import countriesService from "./services/countries";
import ProgressIndicator from "./components/ProgressIndicator";
import CountryDetails from "./components/CountryDetails";

function App() {
  const [countryName, setCountryName] = useState("");
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);

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

  const handleClose = () => {
    setSelectedCountry(null);
  };

  return (
    <>
      <ProgressIndicator countries={countries}></ProgressIndicator>
      <div hidden={countries.length === 0}>
        {selectedCountry && (
          <CountryDetails
            key={selectedCountry.cca3 ?? selectedCountry.name?.common}
            country={selectedCountry}
            handleClose={handleClose}
          />
        )}
        <form>
          <label htmlFor="countryInput">find countries </label>
          <input
            onChange={(event) => handleCountryChange(event.target.value)}
            id="countryInput"
          ></input>
          {filteredCountries.length > 10 ? (
            <div>Too many matches, specify another filter</div>
          ) : (
            <div style={{ padding: "10px" }}>
              {filteredCountries.map((c) => (
                <div
                  key={c.cca3}
                  style={{ display: "flex", gap: "10px", alignItems: "center" }}
                >
                  <p>{c.name.common}</p>
                  <button type="button" onClick={() => setSelectedCountry(c)}>
                    Show
                  </button>
                </div>
              ))}
            </div>
          )}
        </form>
      </div>
    </>
  );
}

export default App;
