/*
- Player must guess a number between a min and max
- Player gets a certain amount of guesses
- Notify player of guesses remaining 
- Notify the player of the correct answer if loose
- Let player choose to play again
*/

// Game values
let min = 1,
  max = 10,
  winningNum = getRandomNum(min, max),
  guessesLeft = 3;

// UI elements
const game = document.querySelector("#game"),
  minNum = document.querySelector(".min-num"),
  maxNum = document.querySelector(".max-num"),
  guessBtn = document.querySelector("#guess-btn"),
  guessInput = document.querySelector("#guess-input"),
  message = document.querySelector(".message");

// Assign UI min and max
minNum.textContent = min;
maxNum.textContent = max;

// Play again event listener 
game.addEventListener('mousedown', function(e){
if(e.target.className === 'play-again'){
window.location.reload();
}
});


// Listen for guess
guessBtn.addEventListener("click", function() {
  let guess = parseInt(guessInput.value);

  // Validate our input
  if (isNaN(guess) || guess < min || guess > max) {
    setMessage(`Please enter a number between ${min} and ${max}`, "red");
  }

  // Check if won
  if (guess === winningNum) {
    // Game over and you won
    gameOver(true, `${winningNum}, is correct, you WIN!`);
  } else {
    // Wrong guess
    guessesLeft -= 1;

    if (guessesLeft === 0) {
      // Game over and you lost
      gameOver(
        false,
        `Game Over, you loast. The correct number was ${winningNum}`
      );
    } else {
      // Game continues, answer wrong

      // Change border color to green
      guessInput.style.borderColor = "red";
      // Clear input
      guessInput.value = "";
      // Tel user it is the wrong guess
      setMessage(
        `${guess} is not correct, ${guessesLeft} guesses left.`,
        "red"
      );
    }
  }
});

// create a game over function
function gameOver(won, msg) {
  let color;
  won === true ? (color = "green") : (color = "red");

  // Disable input
  guessInput.disabled = true;
  // Change border color to green
  guessInput.style.borderColor = color;
  // Set message color to green
  message.style.color = color;
  // Set message
  setMessage(msg);
  // Play Again?
  guessBtn.value = "Play Again";
  guessBtn.className += "play-again";
}

// Get winning number 
function getRandomNum(min, max){
return Math.floor(Math.random()*(max-min+1)+min);
}
// Set Message
function setMessage(msg, color) {
  message.style.color = color;
  message.textContent = msg;
}
