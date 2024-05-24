let gameSeq = [];
let userSeq = [];
let started = false;
let level = 0;
let h2 = document.querySelector("h2");
let color = ["yellow", "purple", "green", "red"];
let body = document.querySelector("body");
let highestScore = 0;

let high=document.getElementById("highest-score")
high.innerText = `Highest Score: ${highestScore}`;

document.addEventListener("keypress", () => {
    if (started == false) {
        started = true;
        levelUp();
    }
});

function levelUp() {
    console.log('userSeq',userSeq);
    userSeq = [];
    console.log('userSeq after',userSeq);

    level++;
    h2.innerText = `Level-${level}`;

    let randIdx = Math.floor(Math.random() * 4);
    let randcolor = color[randIdx];
    gameSeq.push(randcolor);
    console.log(gameSeq);
    let randbtn = document.querySelector(`.${randcolor}`);

    gameflash(randbtn);
}

function gameflash(btn) {
    btn.classList.add("flash");
    setTimeout(() => {
        btn.classList.remove("flash");
    }, 250);
}

let btnAll = document.querySelectorAll(".btn");
for (let btn of btnAll) {
    btn.addEventListener("click", buttonPress);
}

function userFlash(btn) {
    btn.classList.add("userFlash");
    setTimeout(() => {
        btn.classList.remove("userFlash");
    }, 250);
}

function buttonPress() {
    let btn = this;
    userFlash(btn);
    let usercolor = btn.getAttribute("id");
    userSeq.push(usercolor);
    console.log('color length',userSeq);
    checkAns(userSeq.length - 1);
    
}

function checkAns(idx) {
    if (userSeq[idx] == gameSeq[idx]) {
        if (userSeq.length == gameSeq.length) {
            setTimeout(levelUp, 1000);
        }
    } else {
        if (level > highestScore) {
            highestScore = level;
            high.innerText = `Highest Score: ${highestScore}`;
        }
        h2.innerHTML = `Game Over! Your score is <b>${level}</b><br>Press Any Key to Restart`;
        body.style.backgroundColor = "red";
        setTimeout(() => {
            body.style.backgroundColor = "white";
        }, 150);

        reset();
    }
}

function reset() {
    started = false;
    userSeq = [];
    gameSeq = [];
    level = 0;
    h2.innerText = "Press Any Key to Start";
}
