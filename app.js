// Pseudo Code //
    // Have these categories on the HTML box:
        // Train Name, Destination, First Train Time (in military time), Frequency (in minutes) //
    // App should calculate when the next train will arrive, according to current time // 

// =========================================================================================================================//    

// $(document).ready(function() {

 // Initialize Firebase
 var config = {
    apiKey: "AIzaSyB2vKnfEv0loj8L6ura7jXQfUF0zZWKZvo",
    authDomain: "train-scheduling-app-7582e.firebaseapp.com",
    databaseURL: "https://train-scheduling-app-7582e.firebaseio.com",
    projectId: "train-scheduling-app-7582e",
    storageBucket: "",
    messagingSenderId: "135617546746"
  };
  firebase.initializeApp(config);

