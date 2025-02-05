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
  $.get("https://api.weatherapi.com/v1/forecast.json?key=703225d7d1284e52b05235515251701&q=" + place + "&days=7&aqi=no&alerts=no")
  //$.get("https://jsonplaceholder.typicode.com/posts/1") 
  .done(function(response) {
    console.log("jQuery Request Success")
    //console.log(response)

    processData(response)
    processForcast(response)
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

function processForcast(response) {
  //get date and convert it to week day, get avg temp, and get icon for all 3 days
  let weekDay = new Date(response.forecast.forecastday[0].date)
  document.getElementById("f1Day").innerText = (new Intl.DateTimeFormat("en-US", {weekday: "short"}).format(weekDay))

  document.getElementById("f1Temp").innerText = response.forecast.forecastday[0].day.avgtemp_f + " °F"

  document.getElementById("f1Icon").src = response.forecast.forecastday[0].day.condition.icon
  //console.log(response.forecast.forecastday[0].date)
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
  getData()
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
      
      <div className='infoC'>
        <div className='card'>
          <img className='icon' id="icon" width="80" height="auto" />
          <h1 className='info' id="temp" />
          <p className='info' id="location" />
          <h1 className='info time' id="time" />
        </div>
      </div>

      <div className='fContainer'>
        <div className='card cardf'>
          <h1 className='info days' id='f1Day' />
          <img className='icon' id="f1Icon" width="60" height="auto" />
          <h1 className='info' id='f1Temp' />
        </div>

        <div className='card cardf'>
          <h1 className='info days' id='f2Day' />
          <img className='icon' id="f2Icon" width="60" height="auto" />
          <h1 className='info' id='f2Temp' />
        </div>

        <div className='card cardf'>
          <h1 className='info days' id='f3Day' />
          <img className='icon' id="f3Icon" width="60" height="auto" />
          <h1 className='info' id='f3Temp' />
        </div>
      </div>
    </>
  )
}

export default App
