let newbtn = document.querySelector("#new-btn");
let winmsg = document.querySelector("#msg");
let rebtn = document.querySelector("#reset-btn");
let boxes = document.querySelectorAll(".box");
let msgcontainer = document.querySelectorAll(".msg-container");

let turnO = true; //playerX, playerO
let count = 0; //To Track Draw

const winPatterns = [
  [0, 1, 2],
  [0, 3, 6],
  [0, 4, 8],
  [1, 4, 7],
  [2, 5, 8],
  [2, 4, 6],
  [3, 4, 5],
  [6, 7, 8],
];

const resetgame = () => {
  turnO = true;
  count = 0;
  enableBoxes();
  document.querySelector(".msg-container").classList.add("hide");
};

boxes.forEach((box) => {
  box.addEventListener("click", () => {
    if (turnO) {
      box.innerHTML = "O";
      turnO = false;
    } else {
      box.innerHTML = "X";
      turnO = true;
    }
    count++
    box.disabled = true;
    let isWinner = checkwin();
    if (count === 9 && !isWinner) {
      gameDraw();
    }
  });
});

const enableBoxes = () => {
  for (let box of boxes) {
    box.disabled = false;
    box.innerText = "";
  }
};

const disableBoxes = () => {
  for (let box of boxes) {
    box.disabled = true;
  }
};

const gameDraw = () => {
  msg.innerText = `Game was a Draw.`;
  document.querySelector(".msg-container").classList.remove("hide");
  disableBoxes();
};
const showwinner = (winner) => {
  msg.innerText = `Congratulations, Winner is ${winner}`;
  document.querySelector(".msg-container").classList.remove("hide")
  disableBoxes();
};

const checkwin = () => {
    for(let pattern of winPatterns){
        let pos1Val = boxes[pattern[0]].innerText;
        let pos2Val = boxes[pattern[1]].innerText;
        let pos3Val = boxes[pattern[2]].innerText;
        if (pos1Val != "" && pos2Val != "" && pos3Val != "") {
            if (pos1Val === pos2Val && pos2Val === pos3Val) {
                showwinner(pos1Val);
                return true;
            }
        }
    }
};
newbtn.addEventListener("click", resetgame);
rebtn.addEventListener("click", resetgame);