import Logo from './assets/Logo.png'
import './App.css'
import $ from 'jquery'; 
import React, { useEffect, useState } from 'react'
 
//jQuery import
var script = document.createElement('script');
script.src = 'https://code.jquery.com/jquery-3.6.3.min.js'; //Check https://jquery.com/ for the current version
document.getElementsByTagName('head')[0].appendChild(script);

function App() {
  let place = "Seattle Washington"
  //get data from api with default being Seattle
  function getData() {
  $.get("https://api.weatherapi.com/v1/current.json?key=703225d7d1284e52b05235515251701&q=" + place + "&aqi=no")
  //$.get("https://jsonplaceholder.typicode.com/posts/1") 
  .done(function(response) {
    console.log("jQuery Request Success")
    //console.log(response)
    processData(response)
  })
  .fail(function() {
    console.log("jQuery Request failed")
  });
}

function processData(response){
  //get weather icon, current temp, location, time and put it on the page
  document.getElementById("icon").src = response.current.condition.icon

  document.getElementById("temp").innerText = response.current.temp_f + " °F"

  document.getElementById("location").innerText = response.location.name + ", " + response.location.region

  document.getElementById("time").innerText = parseTime(response.location.tz_id)
}

function parseTime(time) {
  //get time by timezone from api
  let lTime = (new Date()).toLocaleString([], {timeZone: time})
  //console.log(lTime)

  //split time into date and time then remove the seconds and add back AM/PM
  let pTime = lTime.split(/[ ,]+/)
  pTime[1] = pTime[1].slice(0, -3)
  pTime[1] = pTime[1].concat(" " + pTime[2])

  return pTime[1]
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

//render HTML
  return (
    <>
      <header className="header">
        <img src={Logo} className="logo" alt="logo" />
        <p className="legal"> Could also be inside </p>

        <div className="textboxC">
          <input className="textbox" type="text" id="locText" name="LocationText" placeholder="Enter Location" onKeyDown={onEnter} />
          <button className="textbutton" type="submit" onClick={handleChange}> Submit </button>
        </div>
      </header>
      
      <div className='card'>
        <img id="icon" width="80" height="auto" />
        <h1 className='info' id="temp" />
        <p className='info' id="location" />
        <h1 className='info time' id="time" />
      </div>
    </>
  )
}

export default App
