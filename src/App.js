import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

const Detail = (props)=>{
  const [show, setShow] = useState('w3-hide')
  const showDetail = (event) => {
    if (show === 'w3-hide') {
      setShow('w3-show')
    }else {
      setShow('w3-hide')
    }

  }
  const { countries, index } = props
  console.log('countries ', countries);

    return(<div >
      <p className={
          show === 'w3-hide'
          ? show
          : show}>Capital: {countries.capital}</p>
      <p className={
          show === 'w3-hide'
          ? show
          : show}>Language native: {countries.nativeLanguage}</p>
          <p className={
              show === 'w3-hide'
              ? show
              : show}>Subregião: {countries.subregion}</p>
      <button name={index} type="submit" onClick={showDetail}>show</button>
      </div>)
}

const Show = ({result, showValue, setShowValue,
            showDetail, showIndice})=>{

  const paises = [];
  //percorrendo os países e preenchendo o array
    result.forEach(countrie =>{
        paises.push(countrie)
    })

    //Selecionar grupos de 1 a 10  países
    const selectedsGroup =
      paises.map((countries, index) => <li key={index} >
        <b>País:</b> {countries.name.common}
          <Detail index={index} showIndice={showIndice}
                  showValue={showValue}  countries={countries} />
        </li>);
    //Selecionar 1 país e apresentar os detalhes
    const selectedsDetails =
      paises.map((countries, index) => <li key={index}>
        <h1>{countries.name.common}</h1><br />
        <b>Capital:</b> {countries.capital}<br />
        <img width="50%" src={countries.flags.svg} alt="flag" />
        </li>);

  if (selectedsGroup.length < 11 && selectedsGroup.length > 1) {
    return(<div className="w3-left">
            <ul className="list">{selectedsGroup}</ul>
      </div>
    )
  }
  if (selectedsDetails.length === 1) {
    return(<div className="w3-left">
            <ul className="list">{selectedsDetails}</ul>
      </div>
    )
  }
  //Caso haja mais de 10 ou nenhum país mostrar a mensagem sub
  if (selectedsGroup.length > 10 && selectedsGroup.length < 20) {
    return(<div className="w3-left">
            Too many matches, specify another filter
      </div>
    )
  }
  return(<div>
          No search countries.
    </div>
  )
}
const Form = (props) =>{
  const { handleName, result, showDetail,
       showValue, setShowValue, showIndice } = props
  return(<div className="w3-tag w3-border">
          Search city: <input className="w3-input" type="text"
                              onChange={handleName} />
          <Show result={result} showValue={showValue}
          setShowValue={setShowValue} showDetail={showDetail}
          showIndice={showIndice} />
    </div>
  )
}
const App = ()=> {
  const [city, setCity] = useState([])
  const [newName, setNewName] = useState('')
  // Definição da url no servidor local para teste
  // const url = "http://localhost:3001"
  useEffect(() => {
  axios
    .get(`/v3.1/all`).then(response => {
      setCity(response.data);
    })
}, [])

// console.log('city ', city);
let selectedCountries = new RegExp(newName)
const result = city.filter(newCity => newCity.name.common.search(selectedCountries) >= 0)
// console.log('result Show', result);

const handleName = (event)=>{
  const newName = event.target.value
  //Evitando resultados muito longos com apenas uma letra
  if (newName.length > 1 && newName.length < 15) {
    setNewName(newName)
  }
}
    return (
      <div className="App">
        <Form newName={newName} result={result}
              handleName={handleName} />

      </div>
    );

}

export default App;
