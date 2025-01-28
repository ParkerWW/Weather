import Logo from './assets/Logo.png'
import './App.css'
import $ from 'jquery'; 
import React, { useEffect } from 'react'
 
//jquery import
var script = document.createElement('script');
script.src = 'https://code.jquery.com/jquery-3.6.3.min.js'; // Check https://jquery.com/ for the current version
document.getElementsByTagName('head')[0].appendChild(script);

function App() {
  let place = "Seattle Washington"
  //get data from api
  function getData() {
  $.get("https://api.weatherapi.com/v1/current.json?key=703225d7d1284e52b05235515251701&q=" + place + "&aqi=no")
  
  //$.get("https://jsonplaceholder.typicode.com/posts/1") 
  .done(function(response) {
    //console.log(response)
    processData(response)
  })
  .fail(function() {
    console.log("jQuery Request failed")
  });
}

//put api response on webpage
function processData(response){
  //get location, current temp, and weather icon
  let loc = response.location.name + ", " + response.location.region
  document.getElementById("location").innerText = loc

  let temp = response.current.temp_f
  document.getElementById("temp").innerText = temp + " °F"

  let icon = response.current.condition.icon
  document.getElementById("icon").src = icon
}

function handleChange() {
  //clicking submit button to update location
  place = document.getElementById("locText").value
  //console.log(place)
  getData()
}

function onEnter() {
  //same as clicking submit button, but hitting enter in the textbox
  if(event.key === 'Enter'){
    handleChange()
  }
}

//fetch data on page load
useEffect(() => {
  getData();
}, []);

  return (
    <>
      <header className="header">
        <meta content="application/javascript; X-Content-Type-Options: nosniff" charSet="utf-8" />
        <title>Weather</title>
        <base href="." />

        <img src={Logo} className="logo" alt="logo" />
        <p className="legal"> Could also be inside </p>

        <div className="textboxC">
          <input className="textbox" type="text" id="locText" name="LocationText" placeholder="Enter Location" onKeyDown={onEnter} />
          <button className="textbutton" type="submit" onClick={handleChange}> Submit </button>
        </div>
      </header>
      
      <img id="icon" width="80" height="auto" />
      <h1 className='info' id="temp" />
      <p className='info' id="location" />
    </>
  )
}

export default App
