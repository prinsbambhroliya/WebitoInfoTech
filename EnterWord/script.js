const wordSelect = document.getElementById("wordSelect");
const wordContainer = document.getElementById("wordContainer");
const submitBtn = document.getElementById("submitBtn");
let message = document.getElementById("message");

wordSelect.addEventListener("change", generateWordBlocks);
wordSelect.addEventListener("change", clearmessage);
submitBtn.addEventListener("click", checkWord);

function clearmessage() {
  message.innerText = "";
}

function generateWordBlocks() {
  const word = wordSelect.value;
  wordContainer.innerHTML = "";

  // Create an array with word length filled with empty strings
  const wordArray = new Array(word.length).fill("");

  // Generate random positions for the filled blocks
  const randomIndices = [];
  while (randomIndices.length < Math.min(2, word.length)) {
    const randIndex = Math.floor(Math.random() * word.length);
    if (!randomIndices.includes(randIndex)) {
      randomIndices.push(randIndex);
      wordArray[randIndex] = word[randIndex];
    }
  }

  // Create input fields with the characters or empty values
  wordArray.forEach((char, index) => {
    const input = document.createElement("input");
    input.type = "text";
    input.maxLength = 1;
    input.value = char;
    input.dataset.index = index;
    wordContainer.appendChild(input);
  });
}

function checkWord() {
  const word = wordSelect.value;
  let guessedWord = "";

  Array.from(wordContainer.children).forEach((input) => {
    guessedWord += input.value;
  });

  if (guessedWord === word) {
    message.innerText = "You Fill The Correctly..";
    // alert("Passed!");
  } else {
    message.innerText = "Try Again...";
    // alert("Try Again!");
  }
}

// Initialize the first word on page load
generateWordBlocks();
