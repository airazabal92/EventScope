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
  } else {
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
function getLocation() {
  var queryURL =
    "https://maps.googleapis.com/maps/api/geocode/json?latlng=" +
    lat +
    "," +
    lon +
    "&key=AIzaSyAXsZwTySX_Xsrq3PqkkSy8LiQ4iTnE5MA";

  $.ajax({
    url: queryURL,
    method: "GET",
  }).then(function (response) {
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
  function setLocation() {
    $("#currentLocation").text(city + ", " + state + " - " + zipcode);
  }
}

// On submit of first section, remove content and show content for second section
$("#submitButton").on("click", function () {
  $("#eventFilter").removeClass("invisible").addClass("visible");
  $("#firstPage").addClass("invisible");
});

// When user clicks the previous button in the event list page, go back to first page
$("#eventsPreviousButton").on("click", function () {
  $("#eventFilter").removeClass("visible").addClass("invisible");
  $("#firstPage").removeClass("invisible").addClass("visible");
});

// When user clicks the next button in events page, remove event content and display recap
$("#eventsNextButton").on("click", function () {
  $("#eventFilter").removeClass("visible").addClass("invisible");
  $("#recap").removeClass("invisible").addClass("visible");
});

// If user wants to restart process, display the first section
$("#restart").on("click", function () {
  $("#firstPage").removeClass("invisible").addClass("visible");
  $("#recap").removeClass("visible").addClass("invisible");
});

// Connect to Ticketmaster API
function ticketmaster() {
  var queryURL =
    "https://app.ticketmaster.com/discovery/v2/events.json?apikey=BohCmDWTsx1AhwD0dRwXtPuIOvpk44t5&latlong=40.7732224,-74.1834752";

  $.ajax({
    url: queryURL,
    method: "GET",
  }).then(function (response) {
    console.log(response)
  });
}

ticketmaster();

// Add Yelp API
    