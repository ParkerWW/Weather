import Logo from './assets/Logo.png'
import './App.css'
import $ from 'jquery'; 
import React, { useEffect } from 'react'
 
//jQuery import
var script = document.createElement('script');
script.src = 'https://code.jquery.com/jquery-3.6.3.min.js'; //Check https://jquery.com/ for the current version
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
  //get location, current temp, weather icon, time
  let loc = response.location.name + ", " + response.location.region
  document.getElementById("location").innerText = loc

  let temp = response.current.temp_f
  document.getElementById("temp").innerText = temp + " °F"

  let icon = response.current.condition.icon
  document.getElementById("icon").src = icon

  let time = response.location.localtime
  time = parseTime(time)
  document.getElementById("time").innerText = time
  //console.log(time)
}

//parse date/24hr time into 12hr time
function parseTime(time) {
  let pTime = time.split(' ')
  let hrs = pTime[1].slice(0,2)

  //conver 24 to 12hr time
  if(hrs > 12){
    //need to add the 0 in if it would be less than 10
    if(hrs-12 < 10){
      let tHrs = hrs-12
      tHrs = '0' + tHrs
      pTime[1] = pTime[1].replace(hrs, tHrs)
      pTime[1] = pTime[1] + " PM"
    }
    else{
      pTime[1] = pTime[1].replace(hrs, hrs-12)
      pTime[1] = pTime[1] + " PM"
    }
  }
  else {
    pTime[1] = pTime[1] + " AM"
  }

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
