import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

const Temperature = (props)=>{
  const [result,setResult] = useState([])
  const city = props.city
  const url = "https://api.openweathermap.org/data/2.5/"
  const key = '3cd09b604a26a19ce507cc9f80c20ec1'
  console.log('key ', key);
  useEffect(() => {
  axios
    .get(`${url}weather?q=${city}&appid=${key}`).then(response => {
      setResult(response.data);
    })
}, [city]);

console.log('isarray result ', Array.isArray(result));
const temperature = [];
temperature.push(result.main)
const selectedTemperature = 'ee'
// const selectedTemperature =
  // temperature.map((weather, index) => <li key={index}>
  //   <b>Temp. máxima:</b> {weather.temp_max}<br />
  //   <b>Temp. mínima:</b> {/*weather.main.temp_min*/}<br />
  //   </li>);

console.log('result clima ', temperature);
  return(<ul>{selectedTemperature}</ul>)
}

export default Temperature;
