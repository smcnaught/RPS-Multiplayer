$(document).ready(function(){
// Links to Firebase
var database = new Firebase("")
var presenceRef = new Firebase("")
var playersRef = new Firebase("")
var turnRef = new Firebase("")
var chatRef = new Firebase("")

// Initialize variables
var player;
var otherPlayer;
var name = {};
var userRef;
var wins1, wins2, losses1, losses2;

var choices = ['rock', 'paper', 'scissors'];

// Remove turn and chat when either player disconnects
turnRef.onDisconnect().remove();
chatRef.onDisconnect().remove();

// Game object
var game = {
    listeners: function(){
        // Listen for more than two clients
        database.on("value", function(snapshot){
            var turnVal = snapshot.child('turn').val();
        })
    }
}




























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

 // Declaring Global Variables:
 var name = "";
 var win = 0;
 var loss = 0;
 var player1 = {};
 var player2 = {};
 var totalPlayers = 2;
 var playerCount = 0;
 var waitingPlay1 = "Waiting for Player 1";
 var waitingPlay2 = "Waiting for Player 2";

// Firebase watcher + initial loader HINT: .on("value")
database.ref().on("value", function(snapshot) {
	if (snapshot.child("Player1").child("isAssigned").val() === true) {
		$("#player1Name").html(snapshot.child("Player1").child("name").val());
		player1 = snapshot.child("Player1").val();
	}

	if(snapshot.child("Player2").child("isAssigned").val() === true){
		$("#player2Name").html(snapshot.child("Player2").child("name").val());
		player2 = snapshot.child("Player2").val();
	}

	if(snapshot.child("Player1").child("resetClicked").val() === true){
		$("#player1Name").html(snapshot.child("Player1").child("name").val());
	}

	if(snapshot.child("Player2").child("resetClicked").val() === true){
		$("#player2Name").html(snapshot.child("Player2").child("name").val());
	}

	// Show winner
	// if both players have made a selection, determine the winner. 
	var isRock1 = (snapshot.child("Player1").child("rock").val() === true);
	var isPaper1 = (snapshot.child("Player1").child("paper").val() === true);
	var isScissors1 = (snapshot.child("Player1").child("scissors").val() === true);
	var winner1 = (snapshot.child("Player1").child("winner").val());
	var isRock2 = (snapshot.child("Player2").child("rock").val() === true);
	var isPaper2 = (snapshot.child("Player2").child("paper").val() === true);
	var isScissors2 = (snapshot.child("Player2").child("scissors").val() === true);
	var winner2 = (snapshot.child("Player2").child("winner").val());

	if(isRock1 === true || isPaper1 === true || isScissors1 === true && isRock2 === true || isPaper2 === true || isScissors2 === true){
		if(winner1 === "Player 1 wins!" || winner1 === "Player 2 wins!" || winner1 === "It's a tie!"){
			$("#winner").html(snapshot.child("Player1").child("winner").val());
		}
		if (winner2 === "Player 1 wins!" || winner2 === "Player 2 wins!" || winner2 === "It's a tie!"){
			$("#winner").html(snapshot.child("Player2").child("winner").val());
		}			
	}
	
	// Increment wins and losses.
	var wins1 = (snapshot.child("Player1").child("win").val());
	var losses1 = (snapshot.child("Player1").child("loss").val());
	var wins2 = (snapshot.child("Player2").child("win").val());
	var losses2 = (snapshot.child("Player2").child("loss").val());
	
	// if(winner1 === "Player 1 wins!" || winner1 === "Player 2 wins!" || winner1 === "It's a tie!"){
	// 	$("#player1Score").html("Wins: " + wins1 + " Losses: " + losses1);
	// }
	// if (winner2 === "Player 1 wins!" || winner2 === "Player 2 wins!" || winner2 === "It's a tie!"){
	// 	$("#player2Score").html("Wins: " + wins2 + " Losses: " + losses2);
	// }	
});	

// Switch statement for Player 1's selections (Rock, Paper, Scissors).
function showSelection ( rockPaperScissors ){
	switch(rockPaperScissors){
		case 'rock': 
			$("#paper").remove();
			$("#scissors").remove();
			$("#rock").find('img').addClass('bigger'); 
			database.ref("Player1").set({
				name: name,
		 		wins: win,
		 		losses: loss,
				isAssigned: true,
				resetClicked: false, 
				rock: true,
				paper: false,
				scissors: false,
			});			
			// if both players have made a selection, determine the winner. 
			if(player2.rock){
				database.ref("Player1").set({				
				name: name,
		 		wins: win,
		 		losses: loss,
				isAssigned: true,
				resetClicked: false, 
				rock: true,
				paper: false,
				scissors: false,
				winner: "It's a tie!"
			 	});
			 } else if(player2.paper){
				database.ref("Player1").set({				
				name: name,
				wins: win,
				losses: loss,
				isAssigned: true,
				resetClicked: false, 
				rock: true,
				paper: false,
				scissors: false,
				winner: "Player 2 wins!"
			 	});
			 } else if(player2.scissors){
				database.ref("Player1").set({
				name: name,
				wins: win,
		 		losses: loss,
				isAssigned: true,
				resetClicked: false, 
				rock: true,
				paper: false,
				scissors: false,
				winner: "Player 1 wins!"
			 	});
			 }
			break;
		case 'paper':
			$("#rock").remove();
			$("#scissors").remove();
			$("#paper").find('img').addClass('bigger');
			database.ref("Player1").set({				
				name: name,
		 		wins: win,
		 		losses: loss,
				isAssigned: true,
				resetClicked: false, 
				rock: false,
				paper: true,
				scissors: false
			 });
			 // if both players have made a selection, determine the winner. 
			if(player2.rock){
				database.ref("Player1").set({				
				name: name,
		 		wins: win,
		 		losses: loss,
				isAssigned: true,
				resetClicked: false, 
				rock: true,
				paper: false,
				scissors: false,
				winner: "Player 1 wins!"
			 	});
			} else if(player2.paper){
				database.ref("Player1").set({				
				name: name,
		 		wins: win,
		 		losses: loss,
				isAssigned: true,
				resetClicked: false, 
				rock: true,
				paper: false,
				scissors: false,
				winner: "It's a tie!"
			 	});
			} else if(player2.scissors){
				database.ref("Player1").set({				
				name: name,
		 		wins: win,
		 		losses: loss,
				isAssigned: true,
				resetClicked: false, 
				rock: true,
				paper: false,
				scissors: false,
				winner: "Player 2 wins!"
			 	});
			}
			break;
		case 'scissors':
			$("#rock").remove();
			$("#paper").remove();
			$("#scissors").find('img').addClass('bigger');
			database.ref("Player1").set({				
				name: name,
		 		wins: win,
		 		losses: loss,
				isAssigned: true,
				resetClicked: false, 
				rock: false,
				paper: false,
				scissors: true
			 });
			 // if both players have made a selection, determine the winner. 
			if(player2.rock){
				database.ref("Player1").set({				
				name: name,
		 		wins: win,
		 		losses: loss,
				isAssigned: true,
				resetClicked: false, 
				rock: true,
				paper: false,
				scissors: false,
				winner: "Player 2 wins!"
				});
			} else if(player2.paper){
				database.ref("Player1").set({				
				name: name,
		 		wins: win,
		 		losses: loss,
				isAssigned: true,
				resetClicked: false, 
				rock: true,
				paper: false,
				scissors: false,
				winner: "Player 1 wins!"
			 	});
			}else if(player2.scissors){
				database.ref("Player1").set({				
				name: name,
		 		wins: win,
		 		losses: loss,
				isAssigned: true,
				resetClicked: false, 
				rock: true,
				paper: false,
				scissors: false,
				winner: "It's a tie!"
			 	});
			}
			break;
		case 'rock2':
			$("#paper2").remove();
			$("#scissors2").remove();
			$("#rock2").find('img').addClass('bigger');
			database.ref("Player2").set({				
				name: name,
		 		wins: win,
		 		losses: loss,
				isAssigned: true,
				resetClicked: false, 
				rock: true,
				paper: false,
				scissors: false
			 });
			if(player1.rock){
				database.ref("Player2").set({				
				name: name,
		 		wins: win,
		 		losses: loss,
				isAssigned: true,
				resetClicked: false, 
				rock: true,
				paper: false,
				scissors: false,
				winner: "It's a tie!"
				 });
			}else if(player1.paper){
				database.ref("Player2").set({				
				name: name,
		 		wins: win,
		 		losses: loss,
				isAssigned: true,
				resetClicked: false, 
				rock: true,
				paper: false,
				scissors: false,
				winner: "Player 1 wins!"
				});
			} else if(player1.scissors){
				database.ref("Player2").set({				
				name: name,
		 		wins: win,
		 		losses: loss,
				isAssigned: true,
				resetClicked: false, 
				rock: true,
				paper: false,
				scissors: false,
				winner: "Player 2 wins!"
				});
			}
			break;
		case 'paper2':
			$("#rock2").remove();
			$("#scissors2").remove();
			$("#paper2").find('img').addClass('bigger');
			database.ref("Player2").set({				
				name: name,
		 		wins: win,
		 		losses: loss,
				isAssigned: true,
				resetClicked: false, 
				rock: false,
				paper: true,
				scissors: false
			 });
			if(player1.rock){
				database.ref("Player2").set({				
				name: name,
		 		wins: win,
		 		losses: loss,
				isAssigned: true,
				resetClicked: false, 
				rock: true,
				paper: false,
				scissors: false,
				winner: "Player 2 wins!"
				});
			} else if(player1.paper){
				database.ref("Player2").set({				
				name: name,
		 		wins: win,
		 		losses: loss,
				isAssigned: true,
				resetClicked: false, 
				rock: true,
				paper: false,
				scissors: false,
				winner: "It's a tie!"
				});
			}else if(player1.scissors){
				database.ref("Player2").set({				
				name: name,
		 		wins: win,
		 		losses: loss,
				isAssigned: true,
				resetClicked: false, 
				rock: true,
				paper: false,
				scissors: false,
				winner: "Player 1 wins!"
				});
			}
			break;
		case 'scissors2':
			$("#rock2").remove();
			$("#paper2").remove();
			$("#scissors2").find('img').addClass('bigger');
			database.ref("Player2").set({				
				name: name,
		 		wins: win,
		 		losses: loss,
				isAssigned: true,
				resetClicked: false, 
				rock: false,
				paper: false,
				scissors: true
			 });
			if(player1.rock){
				database.ref("Player2").set({				
				name: name,
		 		wins: win,
		 		losses: loss,
				isAssigned: true,
				resetClicked: false, 
				rock: true,
				paper: false,
				scissors: false,
				winner: "Player 1 wins!"
				});
			}else if(player1.paper){
				database.ref("Player2").set({				
				name: name,
		 		wins: win,
		 		losses: loss,
				isAssigned: true,
				resetClicked: false, 
				rock: true,
				paper: false,
				scissors: false,
				winner: "Player 2 wins!"
				});
			}else if(player1.scissors){
				database.ref("Player2").set({				
				name: name,
		 		wins: win,
		 		losses: loss,
				isAssigned: true,
				resetClicked: false, 
				rock: true,
				paper: false,
				scissors: false,
				winner: "It's a tie!"
				});
			}
			break;
		default : alert("Sorry, there was an error in the program");
	}
};

// Function for determining if the game is full, then if it's not, determining if the user is player 1 or player 2. 
 function addPlayer(){
 	name = $("#name").val().trim();
 	// Add an if else that determines which player they are. 
 	// for (var i = 0; i < totalPlayers; i++) 
{ 	
		if (!player1.isAssigned) {
			// Assign player1 to equal the player's name.
			player1 = name;
			playerCount++;			

			// update firebase data
			database.ref("Player1").set({				
		 		name: name,
		 		wins: win,
		 		losses: loss,
				isAssigned: true,
				resetClicked: false
	 		});
			
			// change the html to reflect
			$("#welcome").html("Hi " + name + "! You are Player 1");
			$(".enterName").remove();
			$("#rock").prepend('<img src="assets/Images/rock.png" alt="Rock"/>');
			$("#paper").prepend('<img src="assets/Images/paper.jpg" alt="Paper"/>');
			$("#scissors").prepend('<img src="assets/Images/scissors.png" alt="Paper"/>');
			$("#player1Score").html("Wins: " + win + " Losses: " + loss);
			$("#reset").prepend('<button>Leave Game</button>');
			$("#turnInfo").html("It's your turn!");

		} else if(!player2.isAssigned){
			// Assign user to player2.
			player2 = name;

			// update firebase data
			database.ref("Player2").set({				
		 		name: name,
		 		wins: win,
		 		losses: loss,
				isAssigned: true,
				resetClicked: false
	 		});
			
			// change the html to reflect
			$("#welcome").html("Hi " + name + "! You are Player 2");
			$(".enterName").remove();
			$("#rock2").prepend('<img src="assets/Images/rock.png" alt="Rock"/>');
			$("#paper2").prepend('<img src="assets/Images/paper.jpg" alt="Paper"/>');
			$("#scissors2").prepend('<img src="assets/Images/scissors.png" alt="Paper"/>');
			$("#player2Score").html("Wins: " + win + " Losses: " + loss);
			$("#reset2").prepend('<button>Leave Game</button>');
			$("#turnInfo").html("Waiting for player 1 to choose.");
		} //else if($("#player1Name").html() !== "Waiting for Player 1" && $("#player2Name").html() !== "Waiting for Player 2"){
		// 	alert("The game is full!");
		// }
	// }
 }
 }

 
 // When the player types in their name and clicks "Start" it captures their name and creates an object for them in the database.
 $("#addPlayer").on("click", function(){
 	//Make sure the page doesn't refresh.
	event.preventDefault();
	
	// update firebase data
	database.ref("Player1").set({				
		name: name,
		wins: win,
		losses: loss,
		isAssigned: false,
		resetClicked: false,
		winner: ""
	});

	database.ref("Player2").set({				
		name: name,
		wins: win,
		losses: loss,
		isAssigned: false,
		resetClicked: false,
		winner: ""
	});
	
	// Call the addPlayer function.
	addPlayer();
 });




//  // set up the chat functionality. 
// var myFirebase = new Firebase('https://chat-rps.firebaseio.com/');
// if(name){
// 	 $('#send').on('click', function(e){
// 		e.preventDefault();
// 		var text = $('#messages').val();
// 		if (text){
// 			myFirebase.push({name: name, text: text});
// 			$('#messages').val('');
// 		}
// 	 })
//  }

// myFirebase.on('child_added'), function(snapshot){
// 	var mainMessage = snapshot.val();
// 	var html = 
// 		'<tr>' + 
// 		'<td><i class = "chat"></i>' + mainMessage.name + ': </td>' +
// 		'<td>' + mainMessage.text + '</td>' + 
// 		'</tr>';
//  }



// Event listener for the Player1 reset button. 
$("#reset").on("click", function(){
	location.reload();
	// Clear out the player info from firebase. 
	database.ref("Player1").set({				
		name: waitingPlay1,
		wins: win,
		losses: loss,
		isAssigned: false,
		resetClicked: true
	});
	// Reset the html
	// $("#player1Name").html("Waiting for Player 1")
	$("#rock").remove();
	$("#paper").remove();
	$("#scissors").remove();
	$("#player1Score").remove();
	$("#reset").remove();
	$("#welcome").remove();
	$(".info").prepend('<button id="addPlayer" class="enterName" type="submit">Start</button>');
	$(".info").prepend('<input id="name" class="enterName" type="text">');
});

// Event listener for the Player2 reset button. 
$("#reset2").on("click", function(){
	location.reload();
	// Clear out the player info from firebase. 
	database.ref("Player2").set({				
		name: waitingPlay2,
		wins: win,
		losses: loss,
		isAssigned: false,
		resetClicked: true
	});
	// Reset the html
	// $("#player2Name").html("Waiting for Player 2")
	$("#rock2").remove();
	$("#paper2").remove();
	$("#scissors2").remove();
	$("#player2Score").remove();
	$("#reset2").remove();
	$("#welcome").remove();
	$(".info").prepend('<button id="addPlayer" class="enterName" type="submit">Start</button>');
	$(".info").prepend('<input id="name" class="enterName" type="text">');
});

});

