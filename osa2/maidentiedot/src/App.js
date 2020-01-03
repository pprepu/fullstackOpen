import React, {useState, useEffect} from 'react';
import axios from 'axios';
import ListCountry from "./components/ListCountry";

function App() {

  const [countries, setCountries] = useState([]);
  const [filter, setFilter] = useState("");
  const [currentCountries, setCurrentCountries] = useState([]);

  useEffect(() => {
    axios
      .get("https://restcountries.eu/rest/v2/all")
      .then(response => {
        setCountries(response.data);
      })
  }, []);

  useEffect(() => {
    const filteredCountries = countries.filter(
      c => c.name.toUpperCase().includes(filter.toUpperCase())
    );

    setCurrentCountries(filteredCountries);


  }, [countries, filter]);

  const shownCountries = () => {

    if (currentCountries.length > 10) {
      return "Too many matches, specify another filter"
    }

    if (currentCountries.length === 1) {
      
        return <ListCountry country={currentCountries[0]} />
    }


    return currentCountries.map(country => {
      return (
        <li key = {country.name}>
        {country.name}
        <button onClick={() => setCurrentCountries([country])}>show</button>
        </li>
      )
    })


  }

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  }

  return (
    <div className="App">
      <form>
        find countries: <input value={filter} 
        onChange={handleFilterChange} />
      </form>

      <ul>
        {shownCountries()}
      </ul>
    </div>
  );
}

export default App;
