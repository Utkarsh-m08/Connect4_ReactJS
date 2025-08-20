import React from "react";
import "../css/game.css";

function game({ player, col }) {
  coloumn = col;
  const rows = 6;
  const cols = 7;

  const [board, setBoard] = useState(() =>
    Array.from({ length: rows }, () => Array(cols).fill(0))
  );

  // how will i update the board eg
  // setBoard(prevBoard => {
  //   const newBoard = prevBoard.map(row => [...row]); // deep copy each row
  //   newBoard[2][3] = 1; // update desired cell
  //   return newBoard;
  // });

  // fill the coloumn depends on the nummber pressed and fill the row depending on the value filled

  // different updating func to keep score and display what kind of goti to be placed
  // updating the board for player 1 by copying prev board

  function updateBoard(playerId, coloumn) {
    setBoard((prevBoard) => {
      const newBoard = prevBoard.map((row) => [...row]); // deep copy
      for (let i = rows - 1; i >= 0; i--) {
        if (newBoard[i][coloumn] === 0) {
          newBoard[i][coloumn] = playerId;
          break;
        }
      }
      return newBoard;
    });
  }

  // check for winners
  // instead of checking fromm every cell
  // take the most recently placed goti and check from its position upwards downwards left right and diagnols
  // in main game save the coloumn and check from the top most row as it will be the most recently placed

  function Check({ coloumn }) {
    // won state
    let won1 = false;
    let won2 = false;
    // check/find the top most row
    let row = 0;
    for (let i = 6; i >= 0; i--) {
      if (board[i][{ coloumn }] != 0) {
        continue;
      } else {
        board[i][{ coloumn }] == 0;
        row = i;
        break;
      }
    }

    // no need to check upwards as we are the top most
    // check bottom from the row to max
    // note need to add error case by try
    function chkBottom() {
      try {
        if (
          board[row][coloumn] == 1 &&
          board[row + 1][coloumn] == 1 &&
          board[row + 2][coloumn] == 1 &&
          board[row + 3][coloumn] == 1
        ) {
          return (win1 = true);
        }
      } catch (e) {}

      try {
        if (
          board[row][coloumn] == 2 &&
          board[row + 1][coloumn] == 2 &&
          board[row + 2][coloumn] == 2 &&
          board[row + 3][coloumn] == 2
        ) {
          return (win2 = true);
        }
      } catch (e) {}
    }

    // check row
    function chkRow() {
      // for player 1
      for (let i = -3; i < 0; i++) {
        try {
          // __dirname.every(4parent, )
          if (
            board[row - i + 0][coloumn] == 1 &&
            board[row - i + 1][coloumn] == 1 &&
            board[row - i + 2][coloumn] == 1 &&
            board[row - i + 3][coloumn] == 1
          ) {
            return (win1 = true);
          }
        } catch (e) {}

        try {
          if (
            board[row - i][coloumn] == 2 &&
            board[row - i + 1][coloumn] == 2 &&
            board[row - i + 2][coloumn] == 2 &&
            board[row - i + 3][coloumn] == 2
          ) {
            return (win1 = true);
          }
        } catch (e) {}
      }
    }
    chkBottom({ coloumn });
    chkRow({ coloumn });

    // chk diagnol top - bottom
    // write later

    // chk diagnol bottom - top
    // write later
  }

  // alternate players

  return (
    <div className="game-board">
      {board.map((row, rowIndex) => (
        <div className="board-row" key={rowIndex}>
          {row.map((cell, colIndex) => (
            <div
              key={colIndex}
              className={`board-cell player-${cell}`}
              onClick={() => updateBoard(player, colIndex)}
            ></div>
          ))}
        </div>
      ))}
    </div>
  );
}

export default game;
