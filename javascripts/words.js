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

var wordsMeaning = {
  ASCII: "American Standard Code for Information Interchange",
  ARRAY: "A special type of object used for storing ordered collections",
  SPLIT: "A method used on strings to split them using a delimiter",
  MERGE: "The action of combining multiple objects into a single entity",
  INDEX: "Indicates the position on ordered collections - array, string etc",
  MKDIR: "Command to make directory in the terminal",
  AXIOS: "HTTP client used to send async requests",
  MONGO: "Mongo or MongoDB is a database that can store hu'mongo'us data"
};

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
