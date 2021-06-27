var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var started = false;
var level = 0;

$(document).on("keydown", function (e) {
	if (started === false) {
		$("#level-title").text("Level " + level);
		nextSequence();
		started = true;
	}
});

$(".btn").on("click", function () {
	var userChosenColour = $(this).attr("id");
	userClickedPattern.push(userChosenColour);
	playSound(userChosenColour);
	animatePress(userChosenColour);
	checkAnswer(userClickedPattern.length - 1);
});

function checkAnswer(currentLevel) {
	if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
		console.log("success");

		if (userClickedPattern.length === gamePattern.length) {
			setTimeout(function () {
				nextSequence();
			}, 1000);
		}
	} else {
		playSound("wrong");
		$("body").addClass("game-over");
		$("#level-title").text("Game Over, Press Any Key to Restart");

		setTimeout(function () {
			$("body").removeClass("game-over");
		}, 200);
		startOver();
	}
}

function nextSequence() {
	userClickedPattern = [];
	level++;
	$("#level-title").text("Level " + level);
	var randomNumber = Math.floor(Math.random() * 4);
	var randomChosenColor = buttonColours[randomNumber];
	gamePattern.push(randomChosenColor);
	// $("#" + randomChosenColour)
	// 	.fadeIn(100)
	// 	.fadeOut(100)
	// 	.fadeIn(100);
	$(document).ready(function () {
		setInterval(function () {
			$("#" + randomChosenColor).fadeIn();
		}, 100);
		setTimeout(function () {
			$("#" + randomChosenColor).fadeOut();
		}, 100);
	});
	playSound(randomChosenColor);
}

// $("#" + randomChosenColor);
// $(document).ready(() => {
// 	setInterval(() => {
// 		$("#" + randomChosenColor).fadeIn();
// 		$("#" + randomChosenColor).fadeOut();
// 	}, 500);
// });
// function interval() {
// 	$("#" + randomChosenColor).fadeIn();
// 	$("#" + randomChosenColor).fadeOut();
// }

function animatePress(currentColour) {
	$("#" + currentColour).addClass("pressed");
	setTimeout(function () {
		$("#" + currentColour).removeClass("pressed");
	}, 100);
}

function playSound(name) {
	var sound = new Audio("sounds/" + name + ".mp3");
	sound.play();
}

function startOver() {
	level = 0;
	gamePattern = [];
	started = false;
}
