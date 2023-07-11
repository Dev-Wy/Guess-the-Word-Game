const guessedLettersElement = document.querySelector(".guessed-letters");
const button = document.querySelector(".guess");
const letter = document.querySelector(".letter");
const wordInProgress = document.querySelector(".word-in-progress");
const remaining = document.querySelector(".remaining");
const remainingGuessesSpan = document.querySelector(".remaining span");
const message = document.querySelector(".message");
const playAgainButton = document.querySelector(".play-again");

const word = "magnolia";

const guessedLetters = [];

const placeholder = function (word){
    const placeholderLetters = [];
    for (const letter of word) {
        console.log(letter);
        placeholderLetters.push("●");
    };
    wordInProgress.innerText = placeholderLetters.join("");
};

placeholder(word)

button.addEventListener("click", function (e) {
    e.preventDefult();
    message.innerText = "";
    const guess = letter.value;
    console.log(guess);
    const goodGuess = validateInput(guess);
    if (goodGuess) {
        makeGuess(guess);
    }
    letter.value = "";
    
});

const validateInput = function (input) {
    const acceptedLetter = /[a-zA-Z]/;
    if (input.length === 0){
        message.innerText = "Please enter a letter.";
    } else if (input.length > 1){
        message.innerText = "Please enter a single letter."
    } else if (!input.match(acceptedLetter)) {
        message.innerText = "Please enter a letter from A to Z."
    } else {
    return input;
    }
};

const makeGuess = function(guess){
    guess = guess.toUpperCase();
    if (guessedLetters.includes(guess)) {
        message.innerText = "Been there. Done that. Try again."
    } else {
        guessedLetters.push(guess);
        console.log(guessedLetters);
    }
};