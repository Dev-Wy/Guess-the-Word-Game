const guessedLettersElement = document.querySelector(".guessed-letters");
const guessedLetterButton = document.querySelector(".guess");
const letterInput = document.querySelector(".letter");
const wordInProgress = document.querySelector(".word-in-progress");
const remainingGuessesElement = document.querySelector(".remaining");
const remainingGuessesSpan = document.querySelector(".remaining span");
const message = document.querySelector(".message");
const playAgainButton = document.querySelector(".play-again");

let word = "magnolia";
let guessedLetters = [];
let remainingGuesses = 8;

const getWord = async function () {
    const res = await fetch (`https://gist.githubusercontent.com/skillcrush-curriculum/7061f1d4d3d5bfe47efbfbcfe42bf57e/raw/5ffc447694486e7dea686f34a6c085ae371b43fe`);
    const words = await res.text();
    const wordArray = words.split("\n");
    const randomIndex = Math.floor(Math.random() * wordArray.length);
    word = wordArray[randomIndex].trim();
    placeholder(word);
};
getWord();

const placeholder = function (word){
    const placeholderLetters = [];
    for (const letter of word) {
        console.log(letter);
        placeholderLetters.push("●");
    }
    wordInProgress.innerText = placeholderLetters.join("");
};

placeholder(word);

guessedLetterButton.addEventListener("click", function (e) {
    e.preventDefault();
    message.innerText = "";
    const guess = letterInput.value;
    const goodGuess = validateInput(guess);

    if (goodGuess) {
        makeGuess(guess);
    }
    letterInput.value = "";
    
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

const makeGuess = function (guess) {
    guess = guess.toUpperCase();
    if (guessedLetters.includes(guess)) {
        message.innerText = "Been there. Done that. Try again.";
    } else {
        guessedLetters.push(guess);
        console.log(guessedLetters);
        updateGuessesRemaining(guess);
        showGuessedLetters();
        updateWordInProgress(guessedLetters);
    }
};

const showGuessedLetters = function () {
    guessedLettersElement.innerHTML = "";
    for (const letter of guessedLetters){
        const li = document.createElement("li");
        li.innerText = letter;
        guessedLettersElement.append(li);
    } 
};

const updateWordInProgress = function (guessedLetters) {
    const wordUpper = word.toUpperCase();
    const wordArray = wordUpper.split("");
    const revealWord = [];
        for (const letter of wordArray) {
            if(guessedLetters.includes(letter)) {
                revealWord.push(letter.toUpperCase());
            } else {
                revealWord.push("●");
            }
        }
    wordInProgress.innerText = revealWord.join("");
    checkIfWin();
};

const updateGuessesRemaining = function (guess) {
    const upperWord = word.toUpperCase();
    if(!upperWord.includes(guess)){
    
        message.innerText = `The word doesn't have ${guess}.`;
        remainingGuesses -= 1;
        } else {message.innerText = 
            "You got one!"}

    if (remainingGuesses === 0) {
        message.innerHTML = `Game Over! The answer was <span class="highlight">${word}</span>.`;
        startOver();
    } else if (remainingGuesses === 1){
        remainingGuessesSpan.innerText = `${remainingGuesses} guesses.`;
    } else {remainingGuessesSpan.innerText = `You have ${remainingGuesses} guesses.`;
    }
};

const checkIfWin = function () {
    if(word.toUpperCase() === wordInProgress.innerText) {
        message.classList.add("win");
        message.innerHTML = `<p class="highlight">You guessed the correct word! Congrats!</p>`;
        
        startOver();
    }
};

const startOver = function (){
    guessedLetterButton.classList.add("hide");
    remainingGuessesElement.classList.add("hide");
    guessedLettersElement.classList.add("hide");
    playAgainButton.classList.remove("hide");
};

playAgainButton.addEventListener("click", function () {
    message.classList.remove("win");
    guessedLetters = [];
    remainingGuesses = 8;
    remainingGuessesSpan.innerText = `You have ${remainingGuesses} guesses.`;
    guessedLettersElement.innerHTML = "";
    message.innerText = "";
    getWord();

    guessedLetterButton.classList.remove("hide");
    playAgainButton.classList.add("hide");
    remainingGuessesElement.classList.remove("hide");
    guessedLettersElement.classList.remove("hide");  
});