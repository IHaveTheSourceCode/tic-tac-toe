// make Gameboard object using a module
const gameboard = (() => {
  const game_board = [];

  return {
    game_board,
  };
})();

const player = (marker) => {
  const grid_cells = document.querySelectorAll(".grid-cell");

  const place_marker = (cell) => {
    let el = document.createElement("img");
    el.src = `images/${marker}.png`;
    el.classList.add(`${marker}-marker`);
    gameFlow.swapCurrentPlayer();
    cell.appendChild(el);
  };

  const enableDraw = () => {
    grid_cells.forEach((cell) => {
      if (gameboard.game_board[cell.dataset.spot] == undefined) {
        cell.addEventListener("click", function () {
          place_marker(cell);
          this.removeEventListener("click", arguments.callee);
        });
        gameboard.game_board[cell.dataset.spot] = marker;
      }
    });
  };

  //   const disableDraw = () => {
  //     grid_cells.forEach((cell) => {
  //       cell.removeEventListener("click", place_marker);
  //     });
  //   };
  return { enableDraw };
};

const gameFlow = (() => {
  let current_player = "X";
  let firstPlayerScore = 0;
  let secondPlayerScore = 0;

  const startGame = () => {
    playerX.enableDraw();
  };

  const swapCurrentPlayer = () => {
    console.log("hi");
    if (current_player == "X") {
      playerO.enableDraw();
      current_player = "O";
    } else {
      playerX.enableDraw();
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

  const checkPositions = () => {
    let board = gameboard.game_board;

    if (board[1] != undefined) {
      if ((board[2] && board[3]) == board[1]) return board[1];
      if ((board[5] && board[9]) == board[1]) return board[1];
      if ((board[4] && board[7]) == board[1]) return board[1];
    }
    if (board[7] != undefined) {
      if ((board[5] && board[3]) == board[7]) return board[7];
      if ((board[8] && board[9]) == board[7]) return board[7];
    }
    if (board[5] != undefined) {
      if ((board[2] && board[8]) == board[5]) return board[5];
      if ((board[4] && board[6]) == board[5]) return board[5];
    }
    if (board[6] != undefined) {
      if ((board[3] && board[9]) == board[6]) return board[6];
    }
  };

  return {
    current_player,
    startGame,
    swapCurrentPlayer,
    restartGame,
    checkPositions,
  };
})();

const playerX = player("x");
const playerO = player("circle");

gameFlow.startGame();
