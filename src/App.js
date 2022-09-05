import './App.css';
import { useEffect, useState } from 'react';
import axios from 'axios';

function App() {

  const [search, setSearch] = useState('')
  const [allData, setAllData] = useState({
    city:'',
    country:'',
    temperature:'',
    humidity:'',
    minTemperature:'',
    weatherIcons:''
  })

  useEffect(() => {
    // actions after rendering
    // fetch the database info - API to request weather from WEATHER DATABASE
    fetchData()
  },[])

  const fetchData = async (city) => {
    // try catch - error handling
    try{
      const APIKEY = 'fc508fd00391873c1774a7c00017bb7e'
      // axios - library to make request to the backend with promise
      const result = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIKEY}&units=metric`)
      await setAllData({
        city: result.data.name,
        country: result.data.sys.country,
        temperature: result.data.main.temp,
        humidity: result.data.main.humidity,
        minTemperature: result.data.main.temp_min,
        weatherIcons: result.data.weather[0].icon
      })
    } catch (e) {
      console.log('API - Down')
    }
  }

  const handleSubmit = (event) => {
    console.log(search)
    event.preventDefault()

    fetchData(search)
  }

  const handleChange = (event) => {
    setSearch(event.target.value)
  }

  return (
    // Under <main> -form -display results
    <main>
      <div className="App">
        <form onSubmit={handleSubmit}>
          <input
          value={search}
          type='text'
          name='city'
          placeholder='Location'
          onChange={handleChange}
          />
          <button for='city'>SEARCH</button>
        </form>
        <section>
          <img src={'http://openweathermap.org/img/wn/' + allData.weatherIcons + '.png'}/>
          <h1>{allData.city}</h1>
          <h2>{allData.country}</h2>

          <div>
            <div>
              <h3>HUMIDITY:</h3>
              <p>{allData.humidity}%</p>
            </div>
            <div>
              <h3>TEMPERATURE:</h3>
              <p>{allData.temperature}°F</p>
            </div>
            <div>
              <h3>MIN TEMPERATURE:</h3>
              <p>{allData.minTemperature}°F</p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

export default App;
