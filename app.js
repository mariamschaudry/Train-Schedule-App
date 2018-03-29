// Pseudo Code //
    // Have these categories on the HTML box:
        // Train Name, Destination, First Train Time (in military time), Frequency (in minutes) //
    // App should calculate when the next train will arrive, according to current time // 

// =========================================================================================================================//    

// $(document).ready(function() {

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

// Global Variables //

var name = "";
var destination = "";
var startTime = 0;
var frequency = 0; 

// Button for submitting trains //

$("#addTrain").on("click", function(event) {
    event.preventDefault();

// Grab user input //

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

}); // <-- onClick Event (Button for adding Trains) is finished //






