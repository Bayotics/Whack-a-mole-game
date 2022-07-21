const holes = document.querySelectorAll(".hole");
const moles = document.querySelectorAll(".mole");
const totalScore = document.querySelector(".score");
let score = 0;
let gameOver = false;
let lastHole;

function randonTime(min, max) {
    return Math.round(Math.random() * (max - min) + min);
}

function randomHole(holes) {
    const index = Math.floor(Math.random() * holes.length)
    const hole = holes[index];
    if (hole === lastHole) {
        return randomHole(holes);
    }
    lastHole = hole;
    return hole;
}

function peep() {
    const time = randonTime(500, 1000);
    const hole = randomHole(holes);
    hole.classList.add("up");

    setTimeout(() => {
        hole.classList.remove("up");
        if (!gameOver) {
            peep();
        }
    }, time);
};

function startGame() {

    totalScore.textContent = 0;
    gameOver = false;
    score = 0;
    peep();
    setTimeout(() => {
        gameOver = true;
    }, 15000);
};

function wack(e) {
    // if (!e.isTrusted) return;
    score++;
    this.parentElement.classList.remove("up");
    totalScore.textContent = score
}

moles.forEach(function (mole) {
    mole.addEventListener("click", wack);
})
