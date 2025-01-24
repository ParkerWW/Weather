import Logo from '/Logo.png'
import './App.css'
 
//jquery import
var script = document.createElement('script');
script.src = 'https://code.jquery.com/jquery-3.6.3.min.js'; // Check https://jquery.com/ for the current version
document.getElementsByTagName('head')[0].appendChild(script);

function App() {
  //get data from api
  function getData() {
  $.get("https://api.weatherapi.com/v1/current.json?key=703225d7d1284e52b05235515251701&q=83835&aqi=no")
  //$.get("https://jsonplaceholder.typicode.com/posts/1") 
  .done(function(response) {
    console.log(response)
    processData(response)
  })
  .fail(function() {
    console.log("jQuery Request failed")
  });
}

//put api into html by ID
function processData(response){
  //get location, current temp, and weather icon
  let loc = response.location.name + ", " + response.location.region
  document.getElementById("loc").innerText = loc

  let temp = response.current.temp_f
  document.getElementById("temp").innerText = temp + " °F"

  let icon = response.current.condition.icon
  document.getElementById("icon").src = icon
}
getData()

  return (
    <>
      <header className="header">
        <img src={Logo} className="logo" alt="logo" />
        <p className="legal">
          Could also be inside
        </p>
        <div className="textboxC">
          <input className="texbox" type="text" id="loc" name="Location" />
        </div>
      </header>
      <div className="container">
        <h1 id="temp" />
        <img id="icon" width="80" height="auto" />
      </div>
      <p id="loc" />
    </>
  )
}

export default App
