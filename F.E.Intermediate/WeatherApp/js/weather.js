const usersLocation = document.getElementById('geodata');
const temperature = document.getElementById('temperature');
const description = document.getElementById('description');
const body = document.getElementById('bd');
const tempConverter = document.getElementById("converter");
const weatherIcon = document.getElementById("weatherIcon");

let url = 'https://fcc-weather-api.glitch.me/api/current';

function callToWeatherApi(url) {
  fetch(url)
  .then((resp) => resp.json()) // Transform the data into json
  .then(function(data) {
    // Here you get the data to modify as you please
    let res = data.results;

    let celsiusOrFahrenheit = "c";
    let tempCelsius = data["main"]["temp"];
    let tempFahrenheit = tempCelsius * 9/5 + 32;
    temperature.innerHTML = `${Math.round(tempCelsius)} &deg;C,`;
    description.innerHTML = data[ "weather"][0]["description"];

    body.style.backgroundImage = "url(http://c3imaging.com/wp-content/uploads/2015/02/20991-white-winter-1920x1080-nature-wallpaper.jpg)";
    body.style.backgroundSize = "100%";
    weatherIcon.src = data[ "weather"][0]["icon"];
    console.log(weatherIcon.src);

    tempConverter.onclick = function() {
    	if(celsiusOrFahrenheit === "c") {
    		temperature.innerHTML = `${Math.round(tempFahrenheit)} &deg;F,`;
    		celsiusOrFahrenheit = "f";
    	}
    	else {
    		temperature.innerHTML = `${Math.round(tempCelsius)} &deg;C,`;
    		celsiusOrFahrenheit = "c";
    	}
	
}
    })
  .catch(function(error) {
    // If there is any error you will catch them here
    console.log(error);
  });
}


var options = {
  enableHighAccuracy: false,
  timeout: 5000,
  maximumAge: 0
};

function success(pos) {
  var crd = pos.coords;
  var usersLat = crd.latitude.toFixed(2);
  var usersLong = crd.longitude.toFixed(2);
  usersLocation.innerHTML = 'Your current position is: <br>' +
  							`Latitude : ${usersLat} ` +
  							`Longitude: ${usersLong} `;

  url = url + '?lat=' + usersLat + '&lon=' + usersLong;
  callToWeatherApi(url);
};

function error(err) {
  console.warn(`ERROR(${err.code}): ${err.message}`);
};

navigator.geolocation.getCurrentPosition(success, error, options);
