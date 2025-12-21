let boxes = document.querySelectorAll(".box");
let resetbtn = document.querySelector("#reset-btn");
let newGameBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");

let turnO = true;
let count = 0;
let gameOver = false;

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

// -------- reset game --------
const resetGame = () => {
    turnO = true;
    count = 0;
    gameOver = false;
    enableBoxes();
    msgContainer.classList.add("hide");
};

// -------- box click --------
boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if (box.innerText !== "" || gameOver) return;

        if (turnO) {
            box.innerText = "O";
            turnO = false;
            box.classList.remove("text-color-x");
        } else {
            box.innerText = "X";
            turnO = true;
            box.classList.add("text-color-x");
        }

        box.disabled = true;
        count++;

        checkWinner();
        gameDraw();
    });
});

// -------- draw check --------
const gameDraw = () => {
    if (count === 9 && !gameOver) {
        showDraw();
        gameOver = true;
    }
};

const showDraw = () => {
    msg.innerText = "Game was drawn";
    msgContainer.classList.remove("hide");
    disableBoxes();
};

// -------- enable / disable boxes --------
const disableBoxes = () => {
    for (let box of boxes) {
        box.disabled = true;
    }
};

const enableBoxes = () => {
    for (let box of boxes) {
        box.disabled = false;
        box.innerText = "";
    }
};

// -------- show winner --------
const showWinner = (winner) => {
    msg.innerText = `Congratulations, winner is ${winner}`;
    msgContainer.classList.remove("hide");
    gameOver = true;
    disableBoxes();
};

// -------- check winner --------
const checkWinner = () => {
    for (let pattern of winPatterns) {
        let pos1Val = boxes[pattern[0]].innerText;
        let pos2Val = boxes[pattern[1]].innerText;
        let pos3Val = boxes[pattern[2]].innerText;

        if (pos1Val && pos1Val === pos2Val && pos2Val === pos3Val) {
            showWinner(pos1Val);
            return;
        }
    }
};

newGameBtn.addEventListener("click", resetGame);
resetbtn.addEventListener("click", resetGame);
