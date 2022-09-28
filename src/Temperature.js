import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

const Temperature = (props)=>{
  const city = props.city
  const url = "http://api.weatherstack.com/current"
  const key = process.env.CLIMA_API_KEY
  useEffect(() => {
  axios
    .get(`${url}?access_key=${key}&query=${city}`).then(response => {
      setCity(response.data);
    })
}, [city])

}

export default Temperature;
