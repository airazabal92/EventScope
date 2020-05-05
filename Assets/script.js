// Get latitude and longitude using geolocation

var lat;
var lon;
var city;
var state;
var zipcode;

// First get the latitude an longitude of the user
getLatLong();

// Get the latitude and longitude using window object
function getLatLong() {
    // Make sure browser supports this feature
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition);
    } 
    else {
      alert("Geolocation is not supported by this browser.");
    }
  }

  function showPosition(position) {
    lat = position.coords.latitude;
    lon = position.coords.longitude;
    console.log("Your coordinates are Latitude: " + lat + " Longitude " + lon);
    // Pass latitude and longitude to Google API
    getLocation();
  }

  // Get the city, state, and zip code using Google API
  function getLocation(){
    var queryURL = "https://maps.googleapis.com/maps/api/geocode/json?latlng=" + lat + "," + lon + "&key=AIzaSyAXsZwTySX_Xsrq3PqkkSy8LiQ4iTnE5MA";
    
    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response) {
      console.log(response);
      city = response.results[0].address_components[3].long_name;
      console.log(city);
      state = response.results[0].address_components[5].long_name;
      console.log(state);
      zipcode = response.results[0].address_components[7].long_name;
      console.log(zipcode);

      // Now that all information is acquired, send it to be displayed on the front-end
      setLocation();
    });

    // Add location to front-end 
    function setLocation(){
        $("#currentLocation").text(city + ", " + state + " - " + zipcode);
    }
  }

 
  document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.timepicker');
    var instances = M.Timepicker.init(elems, options);
  });
  document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.datepicker');
    var instances = M.Datepicker.init(elems, options);
  });

