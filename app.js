let gameSeq = [];
let userSeq = [];

let btns = ["yellow", "green", "blue", "red"];

let started = false;
let level = 0;
let score=0;
let h2 = document.querySelector("h2");
//let btn=document.querySelector(".btn");

document.addEventListener("keypress", function () {
  if (started == false) {
    console.log("clicked!!!");
    started = true;
    levelUp();
  }
});

function flash(btn) {
  btn.classList.add("flash");
  setTimeout(function () {
    btn.classList.remove("flash");
  }, 250);
}

function userflash(btn) {
  btn.classList.add("userflash");
  setTimeout(function () {
    btn.classList.remove("userflash");
  }, 250);
}

function levelUp() {
  userSeq = [];
  level++;
  h2.innerText = `level ${level}`;

  let randIdx = Math.floor(Math.random() * 3);
  let randColor = btns[randIdx];
  let randFlash = document.querySelector(`.${randColor}`);
  gameSeq.push(randColor);
  console.log(gameSeq);
  flash(randFlash);
}

function checkAns(idx) {
  //let idx=level-1;
  if (userSeq[idx] === gameSeq[idx]) {
    if (userSeq.length == gameSeq.length) {
      setTimeout(levelUp(), 1000);
    }
  } else {
   score =Math.max(score,level);
    h2.innerHTML = `Game Over!  Your score was <b>${level}</b> <br>Highest Score: ${score} <br> Press any key to start.`;
    document.querySelector("body").style.backgroundColor = "red";
    setTimeout(function () {
      document.querySelector("body").style.backgroundColor = "white";
    }, 350);
    reset();
  }
}

function btnpress() {
  let btn = this;
  userflash(btn);

  let userColor = btn.getAttribute("id");
  //console.log(userColor);
  userSeq.push(userColor);
  //console.log(userSeq);
  checkAns(userSeq.length - 1);
}

let allBtns = document.querySelectorAll(".btn");
for (btn of allBtns) {
  btn.addEventListener("click", btnpress);
}

function reset() {
  started = false;
  userSeq = [];
  gameSeq = [];
  level = 0;
}
