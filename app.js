let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-button");
let gameMessage = document.querySelector("#game-message");

let turnO = true;
let moveCount = 0;

const winpatterns = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
];

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if (turnO) {
            box.innerText = "O";
            gameMessage.innerText = "Player X's Turn";
            turnO = false;
        } else {
            box.innerText = "X";
            gameMessage.innerText = "Player O's Turn";
            turnO = true;
        }
        box.disabled = true;
        moveCount++;

        let isWinner = checkWinner();

        if (moveCount === 9 && !isWinner) {
            gameMessage.innerText = "It's a Draw!";
        }
    });
});

const disableBoxes = () => {
    for (let box of boxes) {
        box.disabled = true;
    }
};

const checkWinner = () => {
    for (let pattern of winpatterns) {
        let pos1 = boxes[pattern[0]].innerText;
        let pos2 = boxes[pattern[1]].innerText;
        let pos3 = boxes[pattern[2]].innerText;

        if (pos1 !== "" && pos2 !== "" && pos3 !== "") {
            if (pos1 === pos2 && pos2 === pos3) {
                gameMessage.innerText = `Winner is Player ${pos1}!`;
                disableBoxes();
                return true;
            }
        }
    }
    return false;
};

const resetGame = () => {
    turnO = true;
    moveCount = 0;
    gameMessage.innerText = "Player O's Turn";
    for (let box of boxes) {
        box.innerText = "";
        box.disabled = false;
    }
};

resetBtn.addEventListener("click", resetGame);