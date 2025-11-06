import axios from "axios";

const apiKey = import.meta.env.VITE_OPENWEATHERMAP_KEY;

// Geocoding API
export const geocode = (city, countryCode) =>
  axios.get("https://api.openweathermap.org/geo/1.0/direct", {
    params: {
      q: `${city},${countryCode}`,
      limit: 1,
      appid: apiKey,
    },
  });

// Free Current Weather (instead of One Call 3.0)
export const getWeather = (lat, lon) =>
  axios.get("https://api.openweathermap.org/data/2.5/weather", {
    params: {
      lat,
      lon,
      units: "metric",
      appid: apiKey,
    },
  });
