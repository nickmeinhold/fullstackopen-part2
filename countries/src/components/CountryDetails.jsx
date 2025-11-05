const CountryDetails = ({ country }) => {
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
    </div>
  );
};

export default CountryDetails;
