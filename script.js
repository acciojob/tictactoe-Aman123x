//your JS code here. If required.
document.getElementById("submit").addEventListener("click", startGame);

let currentPlayer = "X";
let player1Name = "";
let player2Name = "";

function startGame() {
    player1Name = document.getElementById("player-1").value;
    player2Name = document.getElementById("player-2").value;

    if (player1Name !== "" && player2Name !== "") {
        document.querySelector(".input-form").style.display = "none";
        document.querySelector(".board").style.display = "grid";
        document.querySelector(".message").textContent = `${player1Name}, you're up!`;

        createBoard();
    }
}

function createBoard() {
    const board = document.getElementById("board");
    for (let i = 1; i <= 9; i++) {
        const cell = document.createElement("div");
        cell.classList.add("cell");
        cell.id = i;
        cell.addEventListener("click", () => makeMove(cell));
        board.appendChild(cell);
    }
}

function makeMove(cell) {
    if (!cell.textContent) {
        cell.textContent = currentPlayer;
        cell.style.backgroundColor = "#fff";
        currentPlayer = currentPlayer === "X" ? "O" : "X";
        document.querySelector(".message").textContent = `${
            currentPlayer === "X" ? player1Name : player2Name
        }, you're up!`;

        if (checkWin()) {
            document.querySelector(".message").textContent = `${
                currentPlayer === "O" ? player1Name : player2Name
            } Congratulations, you won!`;
            disableBoard();
        }
    }
}

function checkWin() {
    const cells = document.querySelectorAll(".cell");
    const winPatterns = [
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 9],
        [1, 4, 7],
        [2, 5, 8],
        [3, 6, 9],
        [1, 5, 9],
        [3, 5, 7],
    ];

    for (const pattern of winPatterns) {
        const [a, b, c] = pattern;
        if (
            cells[a - 1].textContent &&
            cells[a - 1].textContent === cells[b - 1].textContent &&
            cells[b - 1].textContent === cells[c - 1].textContent
        ) {
            return true;
        }
    }

    return false;
}

function disableBoard() {
    const cells = document.querySelectorAll(".cell");
    cells.forEach((cell) => cell.removeEventListener("click", makeMove));
}
