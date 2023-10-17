var level = 0;

startOver();

var gamePattern = [];
var count = 0;
var buttonColors = ["green", "red", "yellow", "blue"];
var userClickedPattern = [];

function nextSequence() {
  $(document).off();

  userClickedPattern = [];
  count = 0;
  var randomChosenColor = Math.floor(Math.random() * 4);
  var colorChosen = buttonColors[randomChosenColor];
  gamePattern.push(colorChosen);
  fadingAnimation(randomChosenColor);
  playColorSound(randomChosenColor);
  level++;
  $("h1").text("Level " + level);
}

function checkAnswer(currentLevel) {
  if (count === level) setTimeout(nextSequence, 1000);

  for (var i = 0; i < count; i++)
    if (userClickedPattern[i] !== gamePattern[i]) gameOver();
}

function gameOver() {
  $("h1").text("Game Over, Press Any Key to Restart");

  var audio = new Audio("./sounds/wrong.mp3");
  audio.play();

  $("body").addClass("game-over");
  setTimeout(function () {
    $("body").removeClass("game-over");
  }, 200);

  startOver();
}

function startOver() {
  level = 0;
  gamePattern = [];
  $(document).keypress(nextSequence);
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
