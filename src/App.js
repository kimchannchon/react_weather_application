import './App.css';
import { useEffect, useState } from 'react';
import axios from 'axios';

function App() {

  const [allData, setAllData] = useState({
    city:'',
    country:'',
    temperature:''
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
      const result = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${'tokyo'}&appid=${APIKEY}&units=metric`)
      await setAllData({
        city: result.data.name,
        country: result.data.sys.country,
        temperature: result.data.main.temp
      })
    } catch (e) {
      console.log('API - Down')
    }
  }

  return (
    // Under <main> -form -display results
    <main>
      <div className="App">
        {console.log('>>TEST Success>>', allData.country, allData.city, allData.temperature)}
        <section>
          <h1>{allData.city}</h1>
          <h2>{allData.country}</h2>
          <h3>TEMPERATURE:</h3>
          <p>{allData.temperature}°F</p>
        </section>
      </div>
    </main>
  );
}

export default App;
