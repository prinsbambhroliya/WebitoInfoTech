let timer;
let countdown;
let mistakeCount = 0;
const sentence =
  "A number of other techniques that you can use to establish coherence in paragraphs.";
const maxTime = 30000; // 30 seconds in milliseconds

let textInput = document.getElementById("textInput");
let startButton = document.getElementById("startButton");

function startTest() {
  textInput.disabled = false;
  textInput.value = "";
  document.getElementById("message").textContent = "";
  document.getElementById("time").textContent = "30";
  document.getElementById("mistakes").textContent = "0";
  mistakeCount = 0;
  //   To Focus and Write Directly
  textInput.focus();
  startButton.disabled = true;
  startButton.textContent = "Test in Progress...";

  timer = setTimeout(() => {
    checkResult();
  }, maxTime);

  countdown = setInterval(() => {
    const currentTime = parseInt(document.getElementById("time").textContent);
    if (currentTime > 0) {
      document.getElementById("time").textContent = currentTime - 1;
    } else {
      clearInterval(countdown);
    }
  }, 1000);
}

function checkResult() {
  clearTimeout(timer);
  clearInterval(countdown);
  const inputText = textInput.value;
  const messageElement = document.getElementById("message");

  if (inputText === "") {
    messageElement.textContent = "You are failed in test.";
    messageElement.className = "red";
  } else {
    let isPassed = true;
    for (let i = 0; i < sentence.length; i++) {
      if (sentence[i] !== inputText[i]) {
        isPassed = false;
        mistakeCount++;
      }
    }
    document.getElementById("mistakes").textContent = mistakeCount;
    if (isPassed) {
      messageElement.textContent = "You are passed in test.";
      messageElement.className = "green";
    } else {
      messageElement.textContent = "You are failed in test.";
      messageElement.className = "red";
    }
  }

  textInput.disabled = true;
  startButton.disabled = false;
  startButton.textContent = "Restart Test";
}

textInput.addEventListener("input", function () {
  const inputText = textInput.value;
  let currentMistakes = 0;
  for (let i = 0; i < inputText.length; i++) {
    if (inputText[i] !== sentence[i]) {
      currentMistakes++;
    }
  }
  mistakeCount = currentMistakes;
  document.getElementById("mistakes").textContent = mistakeCount;

  if (inputText === sentence) {
    checkResult();
  }
});
