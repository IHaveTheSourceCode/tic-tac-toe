const gameboard = (() => {
  const game_board = [];
  const players = document.querySelectorAll(".player");
  const restartButton = document.querySelector(".restart-btn");
  const overlay = document.querySelector(".overlay");
  const game_end_image = document.querySelector(".game-end-image");
  const game_results = document.querySelector(".game-results");

  return {
    game_board,
    players,
    restartButton,
    overlay,
    game_end_image,
    game_results,
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
    gameFlow.pickWinner();
    cosmetics.highlight_current_player();
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

const cosmetics = (() => {
  const highlight_current_player = () => {
    gameboard.players.forEach((player) => {
      player.classList.toggle("highlight-current-player");
    });
  };

  const drawWinningLine = () => {};

  return { highlight_current_player };
})();

const gameFlow = (() => {
  let current_player = "X";

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
    gameboard.game_board.length = 0;
    current_player = "X";
    gameFlow.startGame();
    gameboard.overlay.classList.toggle("overlay-display-on");
    document.querySelectorAll(".grid-cell").forEach((cell) => {
      cell.style.pointerEvents = "auto";
    });
  };

  const pickWinner = () => {
    let board = gameboard.game_board;

    if (board[1] != undefined) {
      if (board[2] == board[1] && board[3] == board[1]) endGame(board[1]);
      if (board[5] == board[1] && board[9] == board[1]) endGame(board[1]);
      if (board[4] == board[1] && board[7] == board[1]) endGame(board[1]);
    }
    if (board[7] != undefined) {
      if (board[5] == board[7] && board[3] == board[7]) endGame(board[7]);
      if (board[8] == board[7] && board[9] == board[7]) endGame(board[7]);
    }
    if (board[5] != undefined) {
      if (board[2] == board[5] && board[8] == board[5]) endGame(board[5]);
      if (board[4] == board[5] && board[6] == board[5]) endGame(board[5]);
    }
    if (board[6] != undefined) {
      if (board[3] == board[6] && board[9] == board[6]) endGame(board[6]);
    }
    checkDraw();
  };

  const checkDraw = () => {
    for (let i = 1; i < 9; i++) {
      if (gameboard.game_board[i] == undefined) {
        return;
      }
    }
    return true;
  };

  const endGame = (winning_marker) => {
    document.querySelectorAll(".grid-cell").forEach((cell) => {
      cell.style.pointerEvents = "none";
    });
    setTimeout(() => {
      if (winning_marker == "x") {
        gameboard.game_results.textContent = "You Won!";
        gameboard.game_end_image.style =
          'background-image: url("images/squidward-dabbing.jpg")';
      } else if (winning_marker == "circle") {
        gameboard.game_results.textContent = "You Lost!";
        gameboard.game_end_image.style =
          'background-image: url("images/spongebob-crying.jpg")';
      }
      document.querySelectorAll(".grid-cell").forEach((cell) => {
        cell.textContent = "";
      });
      gameboard.overlay.classList.toggle("overlay-display-on");
    }, 200);
  };

  gameboard.restartButton.addEventListener("click", restartGame);

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
