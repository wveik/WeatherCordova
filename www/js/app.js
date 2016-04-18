$(document).ready(function(){
    //Device Event Listener
    document.addEventListener("deviceready", onDeviceReady, false);
});


// Check Device is Ready
function onDeviceReady(){
    console.log("Device Ready");
    
    getDate();
    
    getLocation();
}


// Get, Format & Display Current Date
function getDate(){
    var now = new Date();
    var options = {
      //era: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      //weekday: 'long',
      timezone: 'UTC',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric'
    };

    $("#datatime_display").html(now.toLocaleString("ru", options));
}


// Get Current User Location
function getLocation(){    
    navigator.geolocation.getCurrentPosition(showPosition);
}

function showPosition(position){    
    
    getLocationPicture(position);  
    
    var lat = position.coords.latitude;
    var lon = position.coords.longitude;      
    
    var url = 'http://maps.googleapis.com/maps/api/geocode/json?latlng='+lat+','+lon+'&sensor=true';
    
    $.ajax({
      method: "GET",
      url: url
    })
    .done(function( location ) {
        getWeather(location);
    });    
    
}

function getLocationPicture(position){
    var lat = position.coords.latitude;
    var lon = position.coords.longitude;

    var path = "http://maps.googleapis.com/maps/api/staticmap?center=" + lat + "," + lon + "&zoom=13&size=300x300&sensor=false";

    var img = new Image();
    img.src = path;
    img.width = '100';

    var output = document.getElementById("more_weather_display");
    output.appendChild(img);
}

function getWeather(location){
    
    $.simpleWeather({
        location: location.results[0].formatted_address,
        woeid: '',
        unit: 'c',
        success: function(weather) {
          console.log(weather);
        },
        error: function(error) {
          $("#weather").html('<p>'+error+'</p>');
        }
      });
}