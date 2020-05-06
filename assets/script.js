//var googleAPI = prompt("Enter Google API Key:");
//console.log(googleAPI);

//var ticketmasterAPI = prompt("Enter Ticketmaster API Key:");
//console.log(ticketmasterAPI);

$(document).ready(function () {
  console.log("ready");

  /* GLOBAL VARIABLES
  ----------------------------------------------------------*/

  // Get latitude and longitude using geolocation
  var lat;
  var lon;
  var city;
  var state;
  var zipcode;
  var className;
  var masterClass;

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

  var submitButton = $("#submitButton");

  var userStartDay;
  var userStartYear;
  var userStartMonth;

  var userEndDay;
  var userEndYear;
  var userEndMonth;

  var userBudget;

  /* FUNCTIONS / LOGIC
  ----------------------------------------------------------*/

  // First get the latitude an longitude of the user
  $("#getLocation").click(function(){
     // Get the latitude and longitude using window object
    // Make sure browser supports this feature
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition);
    } else {
      alert("Geolocation is not supported by this browser.");
    }
    function showPosition(position) {
      lat = position.coords.latitude;
      lon = position.coords.longitude;
      console.log("Your coordinates are Latitude: " + lat + " Longitude " + lon);
      // Pass latitude and longitude to Google API
      getLocation();
    }
  
    // Get the user's city, state, and zip code using Google API
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
  })
  



  

  /* NEEDS TO BE UPDATED - NEW HTML 
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
  */


  submitButton.click(function () {
    //event.preventDefault();
    // once submit is clicked the users Budget is stored in the var userBudget
    userBudget = $("#currentBudget").val();
    console.log(userBudget);
    var userStartDate = $("#startDate").val();
    var userEndDate = $("#endDate").val();

    // User start date
    userStartDay = userStartDate.slice(4,6);
    console.log("Start Day Slice: " + userStartDay);

    userStartYear = userStartDate.slice(8,12);
    console.log("Start Year Slice: " + userStartYear);

    userStartMonth = userStartDate.slice(0,3);
    console.log("Start Month Before If: " + userStartMonth);
    

    console.log("Start date " + userStartDate);
    console.log("End date: " + userEndDate);

    // User end date
    userEndDay = userEndDate.slice(4,6);
    console.log("Start Day Slice: " + userEndDay);

    userEndYear = userEndDate.slice(8,12);
    console.log("Start Year Slice: " + userEndYear);

    userEndMonth = userEndDate.slice(0,3);
    console.log("End Month Before If: " + userEndMonth);
   
    // Change the month word format to a number for ticketmaster API URL - for start month
    if (userStartMonth == "Jan"){
      userStartMonth = "01";
    } 
    else if (userStartMonth == "Feb"){
      userStartMonth = "02";
    }
    else if (userStartMonth == "Mar"){
      userStartMonth = "03";
    }
    else if (userStartMonth == "Apr"){
      userStartMonth = "04";
    }
    else if (userStartMonth == "May"){
      userStartMonth = "05";
    }
    else if (userStartMonth == "Jun"){
      userStartMonth = "06";
    }
    else if (userStartMonth == "Jul"){
      userStartMonth = "07";
    }
    else if (userStartMonth == "Aug"){
      userStartMonth = "08";
    }
    else if (userStartMonth == "Sep"){
      userStartMonth = "09";
    }
    else if (userStartMonth == "Oct"){
      userStartMonth = "10";
    }
    else if (userStartMonth == "Nov"){
      userStartMonth = "11";
    }
    else {
      userStartMonth = "12";
    }

    // Change the month word format to a number for ticketmaster API URL - for end month
    if (userEndMonth == "Jan"){
      userEndMonth = "01";
    } 
    else if (userEndMonth == "Feb"){
      userEndMonth = "02";
    }
    else if (userEndMonth == "Mar"){
      userEndMonth = "03";
    }
    else if (userEndMonth == "Apr"){
      userEndMonth = "04";
    }
    else if (userEndMonth == "May"){
      userEndMonth = "05";
    }
    else if (userEndMonth == "Jun"){
      userEndMonth = "06";
    }
    else if (userEndMonth == "Jul"){
      userEndMonth = "07";
    }
    else if (userEndMonth == "Aug"){
      userEndMonth = "08";
    }
    else if (userEndMonth == "Sep"){
      userEndMonth = "09";
    }
    else if (userEndMonth == "Oct"){
      userEndMonth = "10";
    }
    else if (userEndMonth == "Nov"){
      userEndMonth = "11";
    }
    else{
      userEndMonth = "12";
    }

    //console.log("End Month Slice: " + userEndMonth);
    //console.log("Start Month Slice: " + userStartMonth);

    // for (var i=0; i < className.length; i++){
    //  if(i < className.length-2){
    //   masterClass += className.length[i]+ ",";
    //  }
    //  else{
    //   masterClass += className.length[i];
    //  }
    // }
    className = $("#multipleSelect").val();
    console.log(className);

    // Send latitude & longitude to Ticketmaster API
    ticketmaster();
  });

  // Connect to Ticketmaster API
  function ticketmaster() {
    var queryURL =
      "https://app.ticketmaster.com/discovery/v2/events.json?apikey=BohCmDWTsx1AhwD0dRwXtPuIOvpk44t5&latlong=" +
      lat +
      "," +
      lon +

      "&startDateTime=" + userStartYear + "-" + userStartMonth + "-" + userStartDay + "T20:58:00Z&endDateTime=" + userEndYear + "-" + userEndMonth + "-" + userEndDay + "T20:58:00Z" + "&classificationName=" +className;


    $.ajax({
      url: queryURL,
      method: "GET",
    }).then(function (responseTicketmaster) {
      console.log(responseTicketmaster);
      eventList = responseTicketmaster;
      displayEvents();
    });
  }

  // Work on extracting & displaying relevant event info
  function displayEvents() {
    for (var i = 0; i < 20; i++) {
      var newDiv = $("<div>");
      newDiv.attr("id", i);
      $("#eventHolder").append(newDiv);
      newDiv.css({ padding: "20px", border: "2px solid black" });
      
      // conditional statement so if the users budget is greater than the min price of the event its info is displayed
      if (userBudget >= eventList._embedded.events[i].priceRanges[0].min){
      
        // Event name
      eventName = eventList._embedded.events[i].name;
      console.log("LIST" + eventList);
      var p1 = $("<p>").text("Name: " + eventName);
      $("#" + i).append(p1);

      // Start date
      eventStartDate = eventList._embedded.events[i].dates.start.localDate;
      console.log("START DATE" + eventStartDate);

      var dateYear = eventStartDate.slice(0, 4);
      console.log("YEAR " + dateYear);

      var dateMonth = eventStartDate.slice(5, 7);
      console.log("MONTH " + dateMonth);

      var dateDay = eventStartDate.slice(8, 10);
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
      eventState =
        eventList._embedded.events[i]._embedded.venues[0].state.stateCode;
      console.log(
        "ADDRESS: " + eventVenue + " " + eventCity + " " + eventState
      );
      var p7 = $("<p>").text(
        "Venue: " + eventVenue + " - " + eventCity + " , " + eventState
      );
      $("#" + i).append(p7);
    }
  }
}
})
  // Add Yelp API

