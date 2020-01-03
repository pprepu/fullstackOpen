import React, {useEffect, useState} from "react";
import axios from 'axios';
import key from "../key";


const Weather = ({weatherData}) => {
    if (weatherData === "startingValue") {
        return <p>Loading...</p>
    }

    return (
        <div>
            <p><strong>temperature:</strong> 
            {weatherData.current.temperature} Celcius </p>
            <img src={weatherData.current.weather_icons[0]} alt="weather icon" />
            <p><strong>wind: </strong> 
            {weatherData.current.wind_speed} kph direction {weatherData.current.wind_dir}</p>
        </div>
    )
}


const ListCountry = ({country}) => {

    const [weatherData, setWeatherData] = useState("startingValue");

    useEffect(() => {
        axios.get(`http://api.weatherstack.com/current?access_key=${key.value}&query=${country.capital}&units=m`)
        .then(response => {
            setWeatherData(response.data); 
        })
    }, []);

    const listLanguages = () => {
        return country.languages.map(language => {
            return (
                <li key ={language.name}> {language.name} </li>                                
            )
        })
    }

  return (
    <div>
        <h2>{country.name}</h2>

        <div>Capital: {country.capital} </div>
        <div>Population: {country.population} </div>

        <h3>Languages</h3>
        <ul>
            {listLanguages()}
        </ul>

        <div>
            <img src={country.flag} alt="flag" width="100px" />
        </div>

        <h3>Weather in {country.capital}</h3>
        <Weather weatherData={weatherData}/>


    </div>
    
  )
}

export default ListCountry;