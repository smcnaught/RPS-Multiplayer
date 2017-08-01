 // Initialize Firebase
 var config = {
    apiKey: "AIzaSyAa492vI0blvlFSqja8nJgOyGy8pnXc36k",
    authDomain: "rock-paper-scissors-9c795.firebaseapp.com",
    databaseURL: "https://rock-paper-scissors-9c795.firebaseio.com",
    projectId: "rock-paper-scissors-9c795",
    storageBucket: "rock-paper-scissors-9c795.appspot.com",
    // messagingSenderId: "307505209771"
  };
  firebase.initializeApp(config);

// Create a variable to reference the database
 var database = firebase.database();

 // Initial Values
 var name = "";
 var wins = 0;
 var losses = 0;
 var player1 = $("#player1Name").html();
 var player2 = $("#player2Name").html();
 var totalPlayers = 2;
 var playerCount = 0;
 var name1;
 var name2;


 // Function for determining if the game is full, then if it's not, determining if the user is player 1 or player 2. 
 function addPlayer(){

 	name = $("#name").val().trim();
 	// Add an if else that determines which player they are. 
 	for (var i = 0; i < totalPlayers; i++) {
 	
		if ($("#player1Name").html() == "Waiting for Player 1") {
			// Assign player1 to equal the player's name.
			player1 = name;
			playerCount++;
			
			// change the html to reflect
			$("#welcome").html("Hi " + name + "! You are Player 1");
			$(".enterName").remove();

			database.ref("Player1").set({				
		 		name: name,
		 		wins: wins,
		 		losses: losses
	 		});

			// Firebase watcher + initial loader HINT: .on("value")
		    database.ref().on("value", function(snapshot) {
				$("#player1Name").html(snapshot.child("Player1").child("name").val());

			});	

			$("#rock").prepend('<img src="assets/Images/rock.png" alt="Rock"/>');
			$("#paper").prepend('<img src="assets/Images/paper.jpg" alt="Paper"/>');
			$("#scissors").prepend('<img src="assets/Images/scissors.png" alt="Paper"/>');
			$("#player1Score").html("Wins: " + wins + " Losses: " + losses);

		} else if(playerCount !== 1 && $("#player2Name").html() == "Waiting for Player 2"){
			// Assign user to player2.
			player2 = name;

			// change the html to reflect
			$("#welcome").html("Hi " + name + "! You are Player 2");
			$(".enterName").remove();

			database.ref("Player2").set({				
		 		name: name,
		 		wins: wins,
		 		losses: losses
	 		});

			// Firebase watcher + initial loader HINT: .on("value")
		    database.ref().on("value", function(snapshot) {
				$("#player2Name").html(snapshot.child("Player2").child("name").val());

			});	

			$("#rock2").html("Rock");
			$("#paper2").html("Paper");
			$("#scissors2").html("Scissors");
			$("#player2Score").html("Wins: " + wins + " Losses: " + losses);
		} //else if($("#player1Name").html() !== "Waiting for Player 1" && $("#player2Name").html() !== "Waiting for Player 2"){
		// 	alert("The game is full!");
		// }
	}
 }

 $(document).ready(function(){
 // When the player types in their name and clicks "Start" it captures their name and creates an object for them in the database.
 $("#addPlayer").on("click", function(){
 	//Make sure the page doesn't refresh.
 	event.preventDefault();
	
	// Call the addPlayer function.
	addPlayer();
 });




});

