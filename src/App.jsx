import Logo from './assets/Logo.png'
import Git from './assets/Github.svg'
import Linkedin from './assets/Linkedin.png'
import './App.css'
import $ from 'jquery'; 
import React, { useEffect } from 'react'
 
//jQuery import
var script = document.createElement('script')
script.src = 'https://code.jquery.com/jquery-3.6.3.min.js'
document.getElementsByTagName('head')[0].appendChild(script)

function App() {
  let place = "Seattle Washington"
  //get data from api, default: Seattle
  function getData() {
  $.get("https://api.weatherapi.com/v1/forecast.json?key=3ad39a92992d4c1d854194810250602&q=" + place + "&days=3&aqi=no&alerts=no")
  //$.get("https://jsonplaceholder.typicode.com/posts/1") 
  .done(function(response) {
    console.log("jQuery Request Success")
    //console.log(response)

    processData(response)
    processForcast(response)
  })
  .fail(function() {
    console.log("jQuery Request failed")
  })
}

function processData(response){
  //get weather icon, current temp, location, time and put it into id's
  document.getElementById("icon").src = response.current.condition.icon

  document.getElementById("temp").innerText = response.current.temp_f + " °F"

  document.getElementById("location").innerText = response.location.name + ", " + response.location.region

  document.getElementById("time").innerText = parseTime(response.location.tz_id)[1]

  document.getElementById("range").innerText = response.forecast.forecastday[0].day.maxtemp_f + "°F - " + response.forecast.forecastday[0].day.mintemp_f + "°F"
}

function parseTime(time) {
  //get time by timezone from api
  let lTime = (new Date()).toLocaleString([], {timeZone: time})

  //split time into date and time then remove the seconds and add back AM/PM
  let pTime = lTime.split(/[ ,]+/)
  pTime[1] = pTime[1].slice(0, -3)
  pTime[1] = pTime[1].concat(" " + pTime[2])

  //remove the now concat'ed AM/PM
  pTime = pTime.splice(0, 2)

  //console.log(pTime)
  return pTime
}

function processForcast(response) {
  //get date and convert it to week day, get avg temp, and get icon for all 3 days
  let weekDay = new Date(parseTime(response.location.tz_id))

  for(let i = 0; i < 3; i++) {
    let gID = "f" + (i + 1)

    document.getElementById(gID + "Day").innerText = weekDay.toString().slice(0, 3)

    document.getElementById(gID + "Temp").innerText = response.forecast.forecastday[i].day.avgtemp_f + " °F"
    
    document.getElementById(gID + "Icon").src = response.forecast.forecastday[i].day.condition.icon

    weekDay.setDate(weekDay.getDate() + 1)
  }
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
}, [])

//render HTML
  return (
    <>
      <header className="header">
        <img src={Logo} className="logo" alt="logo"  />
        <p className="legal"> Could also be inside </p>

        <div className="textboxC">
          <input className="textbox" type="text" id="locText" name="LocationText" placeholder="Enter Location" onKeyDown={onEnter} autoFocus />
          <button className="textbutton" type="submit" onClick={handleChange}> Submit </button>
        </div>

        <div className='fillC'>
          <a href="https://www.github.com/ParkerWW" target="_blank" className='social' id='Git'>
            <img src={Git} className='Git' height='47px' />
          </a>
          
          <a href="https://www.linkedin.com/in/ParkerWeisel" target="_blank" className='social' id='Linkedin'>
            <img src={Linkedin} className='Linkedin' height='40px' />
          </a>
        </div>
        
      </header>
      
      <div className='wrap'>
      <div className='infoC'>
        <div className='card'>
          <img id="icon" width="80" height="auto" />
          <h1 className='info' id="temp" />
          <h1 className='loc' id="location" />
          <h1 className='info time' id="time" />
          <p className='info range' id='range' />
        </div>
      </div>

      <div className='forcastContainer'>
        <div className='card cardForcast'>
          <h1 className='info days' id='f1Day' />
          <img id="f1Icon" width="60" height="auto" />
          <h1 className='info' id='f1Temp' />
        </div>

        <div className='card cardForcast'>
          <h1 className='info days' id='f2Day' />
          <img className='icon' id="f2Icon" width="60" height="auto" />
          <h1 className='info' id='f2Temp' />
        </div>

        <div className='card cardForcast'>
          <h1 className='info days' id='f3Day' />
          <img id="f3Icon" width="60" height="auto" />
          <h1 className='info' id='f3Temp' />
        </div>
      </div>
      </div>
    </>
  )
}

export default App
