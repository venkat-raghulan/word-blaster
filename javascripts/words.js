var wordsArray = [
  "ASCII",
  "ARRAY",
  "SPLIT",
  "MERGE",
  "INDEX",
  "MKDIR",
  "AXIOS",
  "MONGO"
];

var letterBoxes = document.querySelectorAll(".letter");
var $highScore = document.querySelector(".highscore");
var overlay = document.querySelector(".overlay");

var lettersArray = [];
wordsArray.forEach(element => {
  lettersArray = [...lettersArray, ...element.split("")];
});

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}

function shuffle(array) {
  var j, x, i;
  for (i = array.length - 1; i > 0; i--) {
    j = Math.floor(Math.random() * (i + 1));
    x = array[i];
    array[i] = array[j];
    array[j] = x;
  }
  return array;
  console.log("shuffling array");
}

function populateWord(word) {
  for (let i = 0; i < 5; i++) {
    letterBoxes[i].textContent = word[i];
    console.log("populating word");
  }
}
