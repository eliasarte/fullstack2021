import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Filter = (props) => {
  return (
    <div>
    find countries <input value={props.filterName} onChange={props.handleFilterChange}/>
    </div>
  )
}

const TooMany = () => {
  return (
    <p>Too many matches, specify another filter</p>
  )
}

const CountrySimple = ( {country, setFilter} ) => {
  const handleClick = () => {
    setFilter(country.name)
  }
  return (
    <div>
      {country.name}
      <button type="button" onClick={handleClick}>show</button>
    </div>
  )
}

const Language = (props) => {
  return (
    <li>
      {props.name}
    </li>
  )
}

const Weather = ( {country} ) => {
  const [ weather, setWeather] = useState([])
  const api_key = process.env.REACT_APP_API_KEY
  const URL = 'http://api.weatherstack.com/current?access_key='+api_key+'&query='+country.capital
  //console.log(URL)
  useEffect(() => {
    console.log('effect')
    axios
      .get(URL)
      .then(response => {
        console.log('promise fulfilled')
        setWeather(response.data.current)
      })
  }, [URL])
  return (
    <div>
      <h2>Weather in {country.capital}</h2>
      <p><b>temperature: </b>{weather.temperature} celsius</p>
      <img src={weather.weather_icons} alt={country.capital} width="50vw" />
      <p><b>wind: </b>{weather.wind_speed} <b>mph direction </b>{weather.wind_dir}</p>
    </div>
  )

}

const CountryDetailed = ( {country} ) => {
  return (
    <div>
      <h1>{country.name}</h1>
      <p>capital {country.capital}</p>
      <p>population {country.population}</p>
      <h2>languages</h2>
      <ul>
        {country.languages.map(language => 
          <Language key={language.iso639_1} name={language.name} />
        )}
      </ul>
      <img src={country.flag} alt={country.name} width="200vw" />
      <Weather country={country} />
    </div>
  )
}

const AllCountries = (props) => {
  let data = props.countries.filter(country => country.name.toLowerCase().includes(props.filterName.toLowerCase()) === true)
  let count = Object.keys(data).length;
  console.log(count);
  if(count > 10) return <TooMany />
  else if (count > 1) {
    return (
      <div>
        {data.map(country => <CountrySimple key={country.name} country={country} setFilter={props.setFilter} />)}
      </div>
    )
  }
  else {
    return (
      <div>
        {data.map(country => <CountryDetailed key={country.name} country={country} />)}
      </div>
    )
  }
}

const App = () => {
  const [ countries, setCountries] = useState([])
  const [ filterName, setFilter ] = useState('')

  const handleFilterChange = (event) => {
    console.log(event.target.value)
    setFilter(event.target.value)
  }

  useEffect(() => {
    console.log('effect')
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        console.log('promise fulfilled')
        setCountries(response.data)
      })
  }, [])


  return (
    <div>
      <Filter filterName={filterName} handleFilterChange={handleFilterChange}/>
      <AllCountries countries={countries} filterName={filterName} setFilter={setFilter} />
    </div>
  )

}

export default App