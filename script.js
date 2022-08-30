const gameboard = (() => {
  const game_board = [];

  //   const

  return {
    game_board,
  };
})();

const player = (marker) => {
  const grid_cells = document.querySelectorAll(".grid-cell");

  const place_marker = (e) => {
    let el = document.createElement("img");
    el.src = `images/${marker}.png`;
    el.classList.add(`${marker}-marker`);
    e.target.appendChild(el);
    gameboard.game_board[e.target.dataset.spot] = marker;
    console.log(gameboard.game_board);
    gameFlow.pickWinner();
    gameFlow.swapCurrentPlayer();
  };

  const enableMark = () => {
    grid_cells.forEach((cell) => {
      if (gameboard.game_board[cell.dataset.spot] == undefined) {
        cell.addEventListener("click", place_marker);
      }
    });
  };

  const disableMark = () => {
    grid_cells.forEach((cell) => {
      cell.removeEventListener("click", place_marker);
    });
  };
  return { enableMark, disableMark };
};

const gameFlow = (() => {
  let current_player = "X";
  let firstPlayerScore = 0;
  let secondPlayerScore = 0;

  const startGame = () => {
    playerX.enableMark();
  };

  const swapCurrentPlayer = () => {
    if (current_player == "X") {
      playerX.disableMark();
      playerO.enableMark();
      current_player = "O";
    } else {
      playerO.disableMark();
      playerX.enableMark();
      current_player = "X";
    }
  };

  const restartGame = () => {
    document.querySelectorAll(".grid-cell").forEach((cell) => {
      cell.textContent = "";
    });
    gameboard.game_board.length = 0;
    current_player = "X";
  };

  const pickWinner = () => {
    let board = gameboard.game_board;

    if (board[1] != undefined) {
      if (board[2] == board[1] && board[3] == board[1]) return board[1];
      if (board[5] == board[1] && board[9] == board[1]) return board[1];
      if (board[4] == board[1] && board[7] == board[1]) return board[1];
    }
    if (board[7] != undefined) {
      if (board[5] == board[7] && board[3] == board[7]) return board[7];
      if (board[8] == board[7] && board[9] == board[7]) return board[7];
    }
    if (board[5] != undefined) {
      if (board[2] == board[5] && board[8] == board[5]) return board[5];
      if (board[4] == board[5] && board[6] == board[5]) return board[5];
    }
    if (board[6] != undefined) {
      if (board[3] == board[6] && board[9] == board[6]) return board[6];
    }
    checkDraw();
  };

  const checkDraw = () => {
    for (let i = 1; i < 9; i++) {
      if (gameboard.game_board[i] == undefined) {
        return;
      }
    }
    // return true;
    console.log("draw");
    alert("DRAW!");
  };

  return {
    current_player,
    startGame,
    swapCurrentPlayer,
    restartGame,
    pickWinner,
    checkDraw,
  };
})();

const playerX = player("x");
const playerO = player("circle");

gameFlow.startGame();
