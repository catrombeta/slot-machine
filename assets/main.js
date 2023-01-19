
const reel1 = document.getElementById("reel1");
const reel2 = document.getElementById("reel2");
const reel3 = document.getElementById("reel3");
const spinButton = document.getElementById("spin-button");
const result = document.getElementById("result");

// array of symbols for the slot machine
const symbols = [
    "cherry",
    "lemon",
    "orange",
    "plum",
    "bell",
    "bar",
    "seven",
    "blank",
];

// function to spin the reels and determine the outcome
function spin() {
    const spin1 = Math.floor(Math.random() * symbols.length);
    const spin2 = Math.floor(Math.random() * symbols.length);
    const spin3 = Math.floor(Math.random() * symbols.length);

    reel1.innerHTML = symbols[spin1];
    reel2.innerHTML = symbols[spin2];
    reel3.innerHTML = symbols[spin3];

    if (spin1 === spin2 && spin2 === spin3) {
        result.innerHTML = "JACKPOT!";
    } else {
        result.innerHTML = "Try Again!";
    }
}

// event listener for the spin button
spinButton.addEventListener("click", spin);

function rotation() {
    let position = 0;
    const intervalId = setInterval(() => {
        position += 10;
        reel1.style.transform = `rotate(${position}deg)`;
        reel2.style.transform = `rotate(${position}deg)`;
        reel3.style.transform = `rotate(${position}deg)`;
    }, 50);
}
