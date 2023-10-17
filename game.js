var level = 0;
var gamePattern = [];
var count = 0;
var buttonColors = ["green", "red", "yellow", "blue"];
var userClickedPattern = [];
var isOver = false;

$(document).on("keypress", startOver);

function nextSequence() {
  $(document).off("keypress");
  console.log("nextSequence called.");

  userClickedPattern = [];
  count = 0;
  var randomChosenColor = Math.floor(Math.random() * 4);
  var colorChosen = buttonColors[randomChosenColor];
  gamePattern.push(colorChosen);
  fadingAnimation(randomChosenColor);
  playColorSound(randomChosenColor);
  level++;
  console.log("level in nextSequence: " + level);
  $("h1").text("Level " + level);
}

function checkAnswer(currentLevel) {
  for (var i = 0; i < count; i++) {
    console.log("value of count and i: " + count + ", " + i);
    if (userClickedPattern[i] !== gamePattern[i]) gameOver();
  }

  if (count === level && !isOver) {
    console.log("count and level: " + count + ", " + level);
    setTimeout(nextSequence, 1000);
  }
}

function gameOver() {
  $("h1").text("Game Over, Press Any Key to Restart");
  count = 0;
 
  $("body").addClass("game-over");

  setTimeout(function () {
    var audio = new Audio("./sounds/wrong.mp3");
    audio.play();
    $("body").removeClass("game-over");
  }, 200);

  isOver = true;
  console.log("before startOver inside gameOver.");

  $(document).on("keypress", startOver);
}

function startOver() {
  console.log("startover called");
  level = 0;
  gamePattern = [];
  isOver = false;
  console.log("level in startOver: " + level);
  nextSequence();
}

$("div .btn").click(function (e) {
  var userChosenColor = e.target.id;

  userClickedPattern.push(userChosenColor);
  playColorSound(buttonColors.indexOf(userChosenColor));
  animatePress(userChosenColor);
  count++;
  checkAnswer(userChosenColor);
});

function animatePress(currentColor) {
  $("div ." + currentColor).addClass("pressed");
  setTimeout(function () {
    $("div ." + currentColor).removeClass("pressed");
  }, 100);
}

function fadingAnimation(randomChosenColor) {
  $("#" + buttonColors[randomChosenColor])
    .fadeOut()
    .fadeIn();
}

function playColorSound(randomChosenColor) {
  switch (randomChosenColor) {
    case 0:
      var audio = new Audio("./sounds/green.mp3");
      audio.play();
      break;

    case 1:
      var audio = new Audio("./sounds/red.mp3");
      audio.play();
      break;

    case 2:
      var audio = new Audio("./sounds/yellow.mp3");
      audio.play();
      break;

    case 3:
      var audio = new Audio("./sounds/blue.mp3");
      audio.play();
      break;
  }
}
