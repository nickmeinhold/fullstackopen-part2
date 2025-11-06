import { useEffect, useState } from "react";
import { geocode, getWeather } from "../services/weather";

const CountryDetails = ({ country, handleClose }) => {
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    if (!country) return;

    // reset when country changes so old data doesn't flash
    setWeather(null);

    geocode(country.capital[0], country.cca2).then((response) => {
      const geocodeData = response.data[0];
      console.log(geocodeData);
      getWeather(geocodeData.lat, geocodeData.lon).then((weatherResp) => {
        setWeather(weatherResp.data); // save the full weather payload
      });
    });
  }, [country]);

  if (country === null) return null;

  const languages = Object.values(country.languages || {}); // values only

  return (
    <div>
      <h1>{country.name.common}</h1>
      <p>Capital {country.capital}</p>
      <p>Area {country.area}</p>
      <h2>Languages</h2>
      <ul>
        {languages.map((lang) => (
          <li key={lang}>{lang}</li>
        ))}
      </ul>
      <div style={{ fontSize: "84px" }}>{country.flag}</div>
      <h2>Weather in {country.capital}</h2>
      {weather && (
        <div>
          <div>Temperature: {weather.main?.temp} °C</div>
          <div>Wind: {weather.wind?.speed} m/s</div>
          <div>
            Conditions: {weather.weather?.[0]?.description}
            {weather.weather?.[0]?.icon && (
              <img
                alt={weather.weather?.[0]?.description}
                src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                style={{ verticalAlign: "middle", marginLeft: 8 }}
              />
            )}
          </div>
        </div>
      )}
      <button onClick={handleClose}>close</button>
    </div>
  );
};

export default CountryDetails;
