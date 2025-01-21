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
  //get location and current temp
  let loc = response.location.name + ", " + response.location.region
  document.getElementById("loc").innerText = loc

  let temp = response.current.temp_f
  document.getElementById("temp").innerText = temp + " °F"
}
getData()

  return (
    <>
      <div className="grad1">
        <a>
          <img src={Logo} className="logo" alt="logo" />
        </a>
        <p className="legal">
        Could also be inside
      </p>
      </div>
      <h1 id="temp" />
      <p id="loc" />
    </>
  )
}

export default App
