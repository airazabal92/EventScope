// Get latitude and longitude using geolocation

var lat;
var lon;
var city;
var state;
var zipcode;
var eventList;
var eventName;
var eventStartDate;
var eventEndDate;
var eventImageURL;
var eventTime;
var eventGenre;
var eventPriceMin;
var eventPriceMax;
var eventVenue;
var eventCity;
var eventState;

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

  // Send latitude & longitude to Ticketmaster API
  ticketmaster();
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
    "https://app.ticketmaster.com/discovery/v2/events.json?apikey=BohCmDWTsx1AhwD0dRwXtPuIOvpk44t5&latlong=" + lat + "," + lon;
    
  $.ajax({
    url: queryURL,
    method: "GET",
  }).then(function (responseTicketmaster) {
    console.log(responseTicketmaster)
    eventList = responseTicketmaster;
    displayEvents();
  });
}

// Work on extracting relevant event info
function displayEvents(){

  for (var i = 0; i < 11; i++){

    var newDiv = $("<div>");
    newDiv.attr("id", i);
    $("#eventHolder").append(newDiv);
    newDiv.css({"padding": "20px", "border": "2px solid black"});
    
    // Event name
  eventName = eventList._embedded.events[i].name;
  console.log("LIST" + eventList);
  var p1 = $("<p>").text("Name: " + eventName);
  $("#" + i).append(p1);

  // Start date
  eventStartDate = eventList._embedded.events[i].dates.start.localDate;
  console.log("START DATE" + eventStartDate);

  var dateYear = eventStartDate.slice(0,4);
  console.log("YEARRR " + dateYear);

  var dateMonth = eventStartDate.slice(5,7);
  console.log("MONTH " + dateMonth);

  var dateDay = eventStartDate.slice(8,10);
  console.log("DAY " + dateDay);

  var dateFormatted = dateMonth + "-" + dateDay + "-" + dateYear;

  var p2 = $("<p>").text("Date: " + dateFormatted);
  $("#" + i).append(p2); 

  // Image URL 
  eventImageURL = eventList._embedded.events[i].images[9].url;
  console.log("EVENT IMG URL: " + eventImageURL);

  var newImg = $("<img>").attr("src", eventImageURL);
  $("#" + i).append(newImg);


  // Event time
  eventTime = eventList._embedded.events[i].dates.start.localTime;
  console.log("LOCAL TIME: " + eventTime);
  var p3 = $("<p>").text("Time: " + eventTime);
  $("#" + i).append(p3); 
  //$("#eventHolder").html("<br/>");

  // Event genre
  eventGenre = eventList._embedded.events[i].classifications[0].genre.name;
  console.log("GENRE: " + eventGenre);
  var p4 = $("<p>").text("Genre: " + eventGenre);
  $("#" + i).append(p4);

  // Event price range
  eventPriceMin = eventList._embedded.events[i].priceRanges[0].min;
  console.log("MIN $" + eventPriceMin);
  var p5 = $("<p>").text("Min Price: $" + eventPriceMin);
  $("#" + i).append(p5);

  eventPriceMax = eventList._embedded.events[i].priceRanges[0].max;
  console.log("MAX $" + eventPriceMax);
  var p6 = $("<p>").text("Max Price: $" + eventPriceMax);
  $("#" + i).append(p6);

  // Event address 
  eventVenue = eventList._embedded.events[i]._embedded.venues[0].name;
  eventCity = eventList._embedded.events[i]._embedded.venues[0].city.name;
  eventState = eventList._embedded.events[i]._embedded.venues[0].state.stateCode;
  console.log("ADDRESS: " + eventVenue + " " + eventCity + " " + eventState);
  var p7 = $("<p>").text("Venue: " + eventVenue + " - " + eventCity + " , " + eventState);
  $("#" + i).append(p7);


  }
  



}









// Add Yelp API
    