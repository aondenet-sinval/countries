import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
require('dotenv').config();

const Temperature = (props)=>{
  const [result,setResult] = useState([])
  const city = props.city
  const url = "https://api.openweathermap.org/data/2.5/"
  const key = process.env.REACT_APP_API_KEY
  console.log('key ', key);
  useEffect(() => {
  axios
    .get(`${url}weather?q=${city}&appid=${key}`).then(response => {
      setResult(response.data);
    })
}, [city]);

console.log('isarray result ', Array.isArray(result));
const temperature = [];
result.main
? temperature.push(result.main)
: temperature.push({
  humidity: 0,
  temp: 0,
  temp_max: 0,
  temp_min: 0
  })
// const selectedTemperature = 'ee'
const selectedTemperature =
  temperature.map((weather, index) => <li key={index}>
    <b>Umidade:</b> {weather.humidity}<br />
    <b>Temperatura:</b> {weather.temp}<br />
    <b>Temp. máxima:</b> {weather.temp_min}<br />
    <b>Temp. mínima:</b> {weather.temp_min}<br />
    </li>);

console.log('result clima ', temperature);
  return(<ul>{selectedTemperature}</ul>)
}

export default Temperature;
