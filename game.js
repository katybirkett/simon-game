const buttonColors = ["red", "blue", "green", "yellow"];
let gamePattern = [];
let level = 0;
let started = false;
let userClickedPattern = [];

//starting the game
$(document).on("keypress", function() {
  if (!started) {
    $("#level-title").html("Level " + level);
    nextSequence();
    started = true;
  };
});

//playing the game

function checkAnswer(currentLevel) {
//correct answer
  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
    console.log("success");
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function() {
        nextSequence();
      }, 1000);
    }

//wrong answer
  } else {
    console.log("wrong");
    makeSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 200);
    $("#level-title").html("Game over. Press any key to restart");
    startOver ()
  }

}

function startOver() {
  gamePattern=[];
  started = false;
  level = 0;
}

//user patterns
$(".btn").click(function() {

  let userChosenColor = this.id;
  userClickedPattern.push(userChosenColor);
  makeSound(userChosenColor);
  animatePress(userChosenColor);
  checkAnswer(userClickedPattern.length - 1);
});


//game patterns
function nextSequence() {
  //resets the user clicked pattern to zero so check answer checks ALL answers in array
  userClickedPattern =  []
  let randomNumber = Math.floor(Math.random() * 4);
  let randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);
  //animation for computer chosen colour on line below
  $("#" + randomChosenColor).fadeOut(100).fadeIn(100);
  makeSound(randomChosenColor);
  level++;
  $("#level-title").text("Level " + level);
};


// buttonSounds
function makeSound(buttonName) {
  let buttonSounds = new Audio("sounds/" + buttonName + ".mp3");
  buttonSounds.play();
};


//button presses animations
function animatePress(currentColor) {
  $("." + currentColor).addClass("pressed");
  setTimeout(function() {
    $("." + currentColor).removeClass("pressed");
  }, 100);
};
