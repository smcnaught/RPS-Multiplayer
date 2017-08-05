// Initialize Firebase
var config = {
	apiKey: "AIzaSyAa492vI0blvlFSqja8nJgOyGy8pnXc36k",
	authDomain: "rock-paper-scissors-9c795.firebaseapp.com",
	databaseURL: "https://rock-paper-scissors-9c795.firebaseio.com",
	projectId: "rock-paper-scissors-9c795",
	storageBucket: "rock-paper-scissors-9c795.appspot.com"
};
firebase.initializeApp(config);

// Create a variable to reference the database
var database = firebase.database();

// Global variables.
var name = ""; 
var choice = "";
var answer;
var Player1;
var Player2;
var waitingPlay1 = "Waiting for Player 1";
var waitingPlay2 = "Waiting for Player 2";
var wins1 = 0;
var wins2 = 0;
var losses1 = 0;
var losses2 = 0;
winner = "";
var turn = "Waiting for 2 players to join the game.";
var Chat = "";
var message = "";

// Firebase snapshots
database.ref().on("value", function(snapshot) {
		Player1 = snapshot.child("Player1").val();
		$("#player1Name").html(snapshot.child("Player1").child("name").val());

		Player2 = snapshot.child("Player2").val();
		$("#player2Name").html(snapshot.child("Player2").child("name").val());

		// Adding winner information to the HTML.
		$("#winner").html(snapshot.child("Player1").child("winner").val());

		// Adding Player 1 Score to HTML. 
		$("#player1Wins").html(snapshot.child("Player1").child("wins").val());
		$("#player1Losses").html(snapshot.child("Player1").child("losses").val());

		// Adding Player 2 Score to HTML. 
		$("#player2Wins").html(snapshot.child("Player2").child("wins").val());
		$("#player2Losses").html(snapshot.child("Player2").child("losses").val());

		// Changing the turn info on the HTML.
		$("#turnInfo").html(snapshot.child("Player1").child("turn").val());
		
		// Take snapshots of the messages so they all show up in the message box. 
		$("#messages").html(snapshot.child("Chat").child("message").val());
})

// Function that creates a new table row for user messages. 
function newMessageRow(userName){
	var table = document.getElementById("messages");
	var row = table.insertRow();
	var cell1 = row.insertCell(0);
	var cell2 = row.insertCell(1);
	// cell1.innerHTML = "userName: ";
	cell2.innerHTML = document.getElementById("input").value;
	message = cell2.innerHTML;

	// Push message to firebase database.
	database.ref("Chat").set({
		message: document.getElementById("input").value
	})
}
// Answer Function : Subtracts Player 1's "choice" from Player 2's "choice" and returns answer.
function myAnswer(){
	answer = (Player1.choice - Player2.choice);

	// Determine who wins. 
	if(answer > 0 || answer === -6){
		// Player 2 wins. 
		winner = "Player 2 wins!";
		// Increment Player 2 wins.
		wins2++;
		// Increment Player 1 losses.
		losses1++;

		// Update Player 1's database.
		database.ref("Player1").update({
			losses: losses1,
			winner: winner
		});

		// Update Player 2's database.
		database.ref("Player2").update({
			wins: wins2,
			winner: winner
		});

		// Run the final winner function to see if Player 2 won.
		finalWinner();

	} else if(answer < 0 || answer === 6){
		// Player 1 wins.
		winner = "Player 1 wins!";
		// Increment Player 1 wins.
		wins1++;
		// Increment Player 2 losses.
		losses2++;

		// Update Player 1's database.
		database.ref("Player1").update({
			wins: wins1,
			winner: winner
		});

		database.ref("Player2").update({
			winner: winner
		});

		// Update Player 2's database.
		database.ref("Player2").update({
			losses: losses2,
			winner: winner
		});

		database.ref("Player1").update({
			winner: winner
		});

		// Run the final winner function to see if Player 1 won.
		finalWinner();

	} else {
		// The game is a tie.
		winner = "It's a tie!";

		database.ref("Player1").update({
			winner: winner
		});

		database.ref("Player2").update({
			winner: winner
		});
	}
}

// Function that determines final winner. If either player has 3 wins, they win the game and it resets wins & losses.
function finalWinner(){
	if(wins1 === 3){
		// Tell the players who won & reset the wins/losses.
		database.ref("Player1").update({
			turn: "Player 1 has won the game!!!",
			wins: 0,
			losses: 0
		});
		database.ref("Player2").update({
			wins: 0,
			losses: 0
		});
	} else if (wins2 === 3){
		database.ref("Player1").update({
			turn: "Player 2 has won the game!!!",
			wins: 0,
			losses: 0
		});
		database.ref("Player2").update({
			wins: 0,
			losses: 0
		});
	}
}
$(document).ready(function(){
	// Clear messages. 
	database.ref("Chat").set({
		message:""
	})
	// Remove turn info.
	// Set intial values for Player 1 and 2 in the database. 
	database.ref("Player1").set({
		isAssigned: false,
		resetClicked: false,
		wins: wins1,
		losses: losses1,
		name: waitingPlay1,
		turn: turn
	});

	database.ref("Player2").set({
		isAssigned: false,
		resetClicked: false,
		wins: wins2,
		losses: losses2,
		name: waitingPlay2
	});

	// Event listener : a player joins - clicks "start"
	$("#addPlayer").on("click", function(){
		// Prevent page from refreshing. 
		event.preventDefault();

		// Get user input (their name) and assign it to the "name" variable. 
		name = $("#name").val().trim();

		// Determine if the user is player 1 or player 2.
		// If Player 1 is not assigned, assign the user to Player 1.  
		if(!Player1.isAssigned){
			// Update the firebase data.
			database.ref("Player1").update({
				name: name,
				isAssigned: true,
				turn: name + "'s turn"
			});

			// Change the HTML to reflect Player 1. 
			$("#welcome").html("Hi " + name + "! You are Player 1");
			$(".enterName").remove();
			$("#rock").prepend('<img src="assets/Images/rock.png" alt="Rock"/>');
			$("#paper").prepend('<img src="assets/Images/paper.jpg" alt="Paper"/>');
			$("#scissors").prepend('<img src="assets/Images/scissors.png" alt="Paper"/>');
			$("#player1Wins").html(wins1);
			$("#player1Losses").html(losses1);
			$("#leaveGame1").prepend('<button>Leave Game</button>');
			
		} else if(!Player2.isAssigned){
			// Update the firebase data.
			database.ref("Player2").update({
				name: name,
				isAssigned: true
			});

			// Change the HTML to reflect Player 2.
			$("#welcome").html("Hi " + name + "! You are Player 2");
			$(".enterName").remove();
			$("#rock2").prepend('<img src="assets/Images/rock.png" alt="Rock"/>');
			$("#paper2").prepend('<img src="assets/Images/paper.jpg" alt="Paper"/>');
			$("#scissors2").prepend('<img src="assets/Images/scissors.png" alt="Paper"/>');
			$("#player2Wins").html(wins2);
			$("#player2Losses").html(losses2);
			$("#leaveGame2").prepend('<button>Leave Game</button>');
		}
	})

		// Event listener: Player 1 "Leave Game" Button
		$("#leaveGame1").on("click", function(){
			// Reset the Player 1 database.
			database.ref("Player1").set({
				name: waitingPlay1,
				isAssigned: false,
				wins: wins1,
				losses: losses1,
				resetClicked: false
			});

			// Reset the Player 1 HTML.
			$("#player1Name").html(waitingPlay1);
			$("#rock").remove();
			$("#paper").remove();
			$("#scissors").remove();
			$("#leaveGame1").remove();
			$("#welcome").remove();
			// $("#turnInfo").remove();
			$(".info").prepend('<button id="addPlayer" class="enterName" type="submit">Start</button>');
			$(".info").prepend('<input id="name" class="enterName" type="text">');
		})

		// Event listener: Player 2 "Leave Game" Button
		$("#leaveGame2").on("click", function(){
			// Reset the Player 2 database.
			database.ref("Player2").set({
				name: waitingPlay2,
				isAssigned: false,
				resetClicked: false
			});

			// Reset the Player 2 HTML.
			$("#player2Name").html(name);
			$("#rock2").remove();
			$("#paper2").remove();
			$("#scissors2").remove();
			$("#leaveGame2").remove();
			$("#welcome").remove();
			// $("#turnInfo").remove();
			$(".info").prepend('<button id="addPlayer" class="enterName" type="submit">Start</button>');
			$(".info").prepend('<input id="name" class="enterName" type="text">');
		})

		// Event listener : Player 1 Clicks Rock
		$("#rock").on("click", function(){
			// Set the choice variable to 1.
			choice = 1;

			// Update the database.
			database.ref("Player1").update({
				choice: 1,
				turn: Player2.name + "'s turn"
			});
		})
		// Event listener : Player 1 Clicks Paper
		$("#paper").on("click", function(){
			// Set the choice variable to 7. 
			choice = 7;

			// Update the database.
			database.ref("Player1").update({
				choice: 7,
				turn: Player2.name + "'s turn"
			});
		})
		// Event listener : Player 1 Clicks Scissors
		$("#scissors").on("click", function(){
			// Set the choice variable to 4.
			choice = 4;

			// Update the database.
			database.ref("Player1").update({
				choice: 4,
				turn: Player2.name + "'s turn"
			});
		})
		// Event listener : Player 2 Clicks Rock
		$("#rock2").on("click", function(){
			// Set the choice variable to 1.
			choice = 1;

			// Update the database.
			database.ref("Player2").update({
				choice: 1
			});
			database.ref("Player1").update({
				turn: Player1.name + "'s turn"
			})

			// Since Player 2 goes after Player 1, run the answer function as soon as they make a selection. 
			myAnswer();
		})

		// Event listener : Player 2 Clicks Paper
		$("#paper2").on("click", function(){
			// Set the choice variable to 7.
			choice = 7;

			// Update the database.
			database.ref("Player2").update({
				choice: 7,
			});
			database.ref("Player1").update({
				turn: Player1.name + "'s turn"
			})

			// Since Player 2 goes after Player 1, run the answer function as soon as they make a selection. 
			myAnswer();
		})

		// Event listener : Player 2 Clicks Scissors
		$("#scissors2").on("click", function(){
			// Set the choice variable to 4.
			choice = 4;

			// Update the database.
			database.ref("Player2").update({
				choice: 4,
			});
			database.ref("Player1").update({
				turn: Player1.name + "'s turn"
			})

			// Since Player 2 goes after Player 1, run the answer function as soon as they make a selection. 
			myAnswer();
		})

		// Event listener for the chat box.
		$("#send").on('click', function(){
			newMessageRow();

			// Remove user input from text bar.
			$("#input").val('');
		})
});