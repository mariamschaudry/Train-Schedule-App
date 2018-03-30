// Pseudo Code //
    // Have these categories on the HTML box:
        // Train Name, Destination, First Train Time (in military time), Frequency (in minutes) //
    // App should calculate when the next train will arrive, according to current time (moment.js) // 

// =========================================================================================================================// 

 // Initialize Firebase //
 var config = {
    apiKey: "AIzaSyB2vKnfEv0loj8L6ura7jXQfUF0zZWKZvo",
    authDomain: "train-scheduling-app-7582e.firebaseapp.com",
    databaseURL: "https://train-scheduling-app-7582e.firebaseio.com",
    projectId: "train-scheduling-app-7582e",
    storageBucket: "",
    messagingSenderId: "135617546746"
  };

  firebase.initializeApp(config);

// Assigning the reference to the database to a variable named 'database' //
  
 var database = firebase.database(); 

// Show current time //

var datetime = null,
date = null;

var update = function () {
  date = moment(new Date())
  datetime.html(date.format('dddd, MMMM Do YYYY, h:mm:ss a'));
};

$(document).ready(function(){
  datetime = $('#currentStatus')
  update();
  setInterval(update, 1000);

});

// Defining Global Variables //

var name = "";
var destination = "";
var startTime = 0;
var frequency = 0; 

// Button for adding trains //

$("#addTrain").on("click", function(event) {
    event.preventDefault();

// Grab user input from "Add Train" section //

name = $("#trainNameInput").val().trim();
destination = $("#trainDestination").val().trim();
startTime = $("#startTime").val().trim();
frequency = $("#trainFrequency").val().trim();

console.log(name);
console.log(destination);
console.log(startTime);
console.log(frequency);

// Uploading train data to firebase database // 

database.ref().push({
    name: name, 
    destination: destination, 
    startTime: startTime, 
    frequency: frequency
});

// Need to clear out all of the text boxes in the "Add Train" section // 

$("#trainNameInput").val("");
$("#trainDestination").val(""); 
$("#startTime").val("");
$("#trainFrequency").val(""); 

}); // <-- Closing of onClick Event (Button for adding Trains) //

// Clear button reset (will clear out all of the text boxes without a page refresh //

$("#clearTrain").on("click", function(event) {
    event.preventDefault();

    $("#trainNameInput").val("");
    $("#trainDestination").val(""); 
    $("#startTime").val("");
    $("#trainFrequency").val(""); 

}); // <-- Closing of onclick Event for clear button //

// Creating a way to retrieve train information from train database // 
// So, I'm creating a Firebase event for adding Train infomation to the database and a row in the HTML whenever the user // adds an entry. //

// Whenever the page loads or children are added, this function runs //
database.ref().on("child_added", function (childSnapshot, prevChildKey) {

    console.log(childSnapshot.val());

// Defining Time Variables //

var getName = childSnapshot.val().name; 
var getDestination = childSnapshot.val().destination;
var getTime = childSnapshot.val().startTime;
var getFrequency = parseInt(childSnapshot.val().frequency); 

// Calculating the time of next train arrival, and the minute until the next train arrives. Also, convert the start time // of the train to HH:mm (to be used by Momment.JS)

var currentTime = moment();

    console.log("Current Time: " + moment(currentTime).format("HH:mm"));

// Used this as first time (pushed back 1 year to make sure it comes before current time)    
var convertedFirstTime = moment(getTime, "hh:mm").subtract(1, "years");

    console.log(convertedFirstTime);

// Difference between the start time and the current time //
var diffTime = moment().diff(moment(convertedFirstTime), "minutes");

    console.log("Difference in the time: " + diffTime) ;

// Divide the difference by the frequency to get the time apart remainder //

var tRemainder = diffTime % getFrequency;

    console.log(tRemainder);

// Figure out when the next train will come by subracting the time remainder from the frequency of when each train comes //

var minutesAway = getFrequency - tRemainder; 

    console.log("Minutes until train " + minutesAway);

// Figure out when the next train will come by adding the minutes from arrival to current time //

var nextTrain = moment().add(minutesAway, "minutes");

    console.log(nextTrain);

// Store arrival time in a usable format //

var nextArrival = moment(nextTrain, "HHmm").format("h:mm A");

// Adding entry to the "Add Train" section //

var row = $('<tr>');

row.append('<td>' + getName + "</td>")
row.append('<td>' + getDestination + "</td>")
row.append('<td>' + "Every " + getFrequency + " mins" + "</td>")
row.append('<td>' + nextArrival + "</td>")
row.append('<td>' + minutesAway +  " mins until arrival" + "</td>")

$("#trainTable > tbody").append(row)


});








