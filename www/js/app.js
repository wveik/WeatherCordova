$(document).ready(function(){
    //Device Event Listener
    document.addEventListener("deviceready", onDeviceReady, false);
    
    $('#main_btn').bind('click', main_btn_click);
});

function capitalizeFirstLetter(string) {
    
    string = string.toLowerCase();
    
    return string.charAt(0).toUpperCase() + string.slice(1);
}


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
    //navigator.geolocation.getCurrentPosition(showPosition, errorFunction);
    //navigator.geolocation.watchPosition(showPosition, errorFunction);
    if (navigator !== null) {
        if (navigator.geolocation) {
            var options = {
                    enableHighAccuracy: true,
                     timeout: 15000,
                     maximumAge: 0
             };
             try {
                     navigator.geolocation.getCurrentPosition(function (position) {
                            showPosition(position);
                      }, function () {
                        alert('Do not find position');
                      }, options);
              } catch (e) {
                  // ooops

            }
        }
    }

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
        var city = location.results[0].address_components[2].long_name;
        getWeather(city);
    });    
    
}

function getLocationPicture(position){
    var lat = position.coords.latitude;
    var lon = position.coords.longitude;

    var path = "http://maps.googleapis.com/maps/api/staticmap?center=" + lat + "," + lon + "&zoom=13&size=300x300&sensor=false";

    getImageFromGoogleMaps(path);
}

function getImageFromGoogleMaps(path){
    var img = new Image();
    img.src = path;
    img.width = '100';

    $('#more_weather_display').html(img); 
}

function getWeather(city){
    
    $('#myLocation').html(city);
    
    $.simpleWeather({
        location: city,
        woeid: '',
        unit: 'c',
        success: function(weather) {
          //console.log(weather);
            $('#weather').html('<h1>' + weather.temp + ' C&deg;</h1>');
        },
        error: function(error) {
          //$("#weather").html('<p>'+error+'</p>');
            console.log(error);
        }
      });
}

function main_btn_click(){
    var city = capitalizeFirstLetter($('#city').val());
    getLocationPictureByCityName(city);
    getWeather(city);
}



function getLocationPictureByCityName(city){
    var path = "http://maps.googleapis.com/maps/api/staticmap?center=" + city + "&zoom=13&size=300x300&sensor=false";

    getImageFromGoogleMaps(path);
}