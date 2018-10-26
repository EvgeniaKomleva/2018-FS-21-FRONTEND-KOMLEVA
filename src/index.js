import {MessageForm, LogInForm} from './lib/message.js';
import DropZone from './lib/dropzone.js';

import getPosition from './lib/geolocation.js';


var gps_info = document.querySelector(".gps-info");
var gps_button = document.querySelector(".gps-button");

gps_button.addEventListener("submit", function (event) {
	event.stopPropagation();
	event.preventDefault();
  var promise = getPosition();
	promise.then(showPosition, null);
})

function showPosition(position) {
  gps_info.innerHTML = "Latitude: " + position.coords.latitude + 
  "<br>Longitude: " + position.coords.longitude;
}


function geoFindMe() {
    var output = document.getElementById("out");

    if (!navigator.geolocation){
        output.innerHTML = "<p>Geolocation is not supported by your browser</p>";
        return;
    }

    function success(position) {
        var latitude  = position.coords.latitude;
        var longitude = position.coords.longitude;

        output.innerHTML = '<p>Latitude is ' + latitude + '° <br>Longitude is ' + longitude + '°</p>';

        var img = new Image();
        img.src = "http://maps.googleapis.com/maps/api/staticmap?center=" + latitude + "," + longitude + "&zoom=13&size=300x300&sensor=false";

        output.appendChild(img);
    };

    function error() {
        output.innerHTML = "Unable to retrieve your location";
    };

    output.innerHTML = "<p>Locating…</p>";

    navigator.geolocation.getCurrentPosition(success, error);
}
export default geoFindMe();
