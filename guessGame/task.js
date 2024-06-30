"use strict";

const containerEl = document.querySelector('.container');
const btnPlayEl = document.querySelector('.btn_again');
const btnChckEl = document.querySelector('.btn_check');
const hideNumEl = document.querySelector('.hide_num');
const msgEl = document.querySelector('.message');
const inputNumEl = document.querySelector('.input_number');
const highScoreEl = document.querySelector('.high_score');
const scoreEl = document.querySelector('.score');

// Generate Random Number from 1 to 20
let secretNum = Math.trunc(Math.random() * 20 +1);
console.log(secretNum);
let score = 20;
let highScore = 0;

btnChckEl.addEventListener('click' , () =>{
    const guess = Number(inputNumEl.value);

    // Check Empty Input
    if(guess){
        // Not Match hide Number
        if(guess != secretNum){

            if(score>1){
                score--;
                scoreEl.textContent = score;
                
                msgEl.textContent = guess > secretNum ? "Too High": "Too Low"
                scoreEl.textContent = score;

            }else{
                msgEl.textContent = "You've Lossed the Game";
                displayMessage("You've Lossed the Game");
                containerEl.style.backgroundColor = "#fff";
                scoreEl.textContent = 0
            }


        }else { // Success
            hideNumEl.textContent = secretNum;
            hideNumEl.style.width = "50%";
            hideNumEl.style.transition = "all 0.5s ease-in";
            containerEl.style.backgroundColor = "#e0d8d3";
            displayMessage("Congratulation You Have Won The Game :)");
            highScoreEl.textContent = score;
        }

    }else {
        displayMessage("Please Enter the number:(");
    }


})

// Display Message
const displayMessage = function(message) {
    msgEl.textContent = message;
}

// reset The Game
btnPlayEl.addEventListener('click',()=>{
    score= 20;
    secretNum = Math.floor(Math.random()*20) +1;
    scoreEl.textContent = score;
    hideNumEl.textContent = "?";
    hideNumEl.style.width = "25%";
    hideNumEl.style.transition = "all 0.5s ease-in";
    inputNumEl.value = "";
    containerEl.style.backgroundColor = "#ddd";
    displayMessage("Start Guessing...................");
})

