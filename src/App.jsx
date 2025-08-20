import { useState } from "react";
import "./css/App.css";
import HeaderCard from "./components/HeaderCard";
import Board from "./components/Board";
import Timer from "./components/Timer";
import Player from "./components/Player";
import player1Image from "./assets/images/player-one.svg";
import player2Image from "./assets/images/player-two.svg";

function App() {
  const [turn, setTurn] = useState(1);
  const [board, setBoard] = useState(() =>
    Array.from({ length: 6 }, () => Array(7).fill(0))
  );
  const [selectedCol, setSelectedCol] = useState("");

  const player1 = { imgSrc: player1Image, name: "Player 1", score: 0 };
  const player2 = { imgSrc: player2Image, name: "Player 2", score: 0 };

  function changeTurn() {
    setTurn((prev) => (prev === 1 ? 2 : 1));
  }

  //  chk winner
  function CheckWinner(row, col, board) {
    const currentPlayer = board[row][col];

    function countInDirection(deltaRow, deltaCol) {
      let count = 0;
      let r = row + deltaRow;
      let c = col + deltaCol;
      while (
        r >= 0 &&
        r < 6 &&
        c >= 0 &&
        c < 7 &&
        board[r][c] === currentPlayer
      ) {
        count++;
        r += deltaRow;
        c += deltaCol;
      }
      return count;
    }

    function isWinningMove() {
      const directions = [
        [0, 1], // horizontal
        [1, 0], // vertical
        [1, 1], // diagonal /
        [1, -1], // diagonal \
      ];

      return directions.some(([dRow, dCol]) => {
        const total =
          1 + countInDirection(dRow, dCol) + countInDirection(-dRow, -dCol);
        return total >= 4;
      });
    }

    if (isWinningMove()) {
      alert(`Player ${currentPlayer} wins!`);
    }
  }

  // function CheckWinner(coloumn, board) {
  //   console.log(board);
  //   // won state
  //   let won1 = false;
  //   let won2 = false;
  //   // check/find the top most row
  //   let row = 0;
  //   for (let i = 5; i >= 0; i--) {
  //     if (board[i][coloumn] != 0) {
  //       continue;
  //     } else {
  //       board[i][coloumn] == 0;
  //       row = i;
  //       break;
  //     }
  //   }

  //   // no need to check upwards as we are the top most
  //   // check bottom from the row to max
  //   // note need to add error case by try
  //   function chkBottom(coloumn, board) {
  //     try {
  //       if (
  //         board[row][coloumn] == 1 &&
  //         board[row + 1][coloumn] == 1 &&
  //         board[row + 2][coloumn] == 1 &&
  //         board[row + 3][coloumn] == 1
  //       ) {
  //         return (won1 = true);
  //       }
  //     } catch (e) {}

  //     try {
  //       if (
  //         board[row][coloumn] == 2 &&
  //         board[row + 1][coloumn] == 2 &&
  //         board[row + 2][coloumn] == 2 &&
  //         board[row + 3][coloumn] == 2
  //       ) {
  //         return (won2 = true);
  //       }
  //     } catch (e) {}
  //   }

  //   // check row
  //   function chkRow(coloumn, board) {
  //     // for player 1
  //     for (let i = -3; i < 0; i++) {
  //       try {
  //         // __dirname.every(4parent, )
  //         if (
  //           board[row][coloumn - i] == 1 &&
  //           board[row][coloumn - i + 1] == 1 &&
  //           board[row][coloumn - i + 2] == 1 &&
  //           board[row][coloumn - i + 3] == 1
  //         ) {
  //           return (won1 = true);
  //         }
  //       } catch (e) {}

  //       try {
  //         if (
  //           board[row][coloumn - i] == 2 &&
  //           board[row][coloumn - i + 1] == 2 &&
  //           board[row][coloumn - i + 2] == 2 &&
  //           board[row][coloumn - i + 3] == 2
  //         ) {
  //           return (won2 = true);
  //         }
  //       } catch (e) {}
  //     }
  //   }
  //   chkBottom(coloumn, board);
  //   chkRow(coloumn, board);
  //   if (won1 == true) {
  //     alert("player 1 wins");
  //   }
  //   if (won2 == true) {
  //     alert("player 2 wins");
  //   }

  //   // chk diagnol top - bottom
  //   // write later

  //   // chk diagnol bottom - top
  //   // write later
  // }

  function placeCounter() {
    const col = parseInt(selectedCol);
    if (isNaN(col) || col < 0 || col > 6) return;

    let placedRow = -1;

    setBoard((prevBoard) => {
      const newBoard = prevBoard.map((row) => [...row]);
      for (let i = 5; i >= 0; i--) {
        if (newBoard[i][col] === 0) {
          newBoard[i][col] = turn;
          placedRow = i;
          break;
        }
      }

      // Run winner check *after* board updated and row found
      if (placedRow !== -1) {
        CheckWinner(placedRow, col, newBoard);
      }

      return newBoard;
    });

    changeTurn();
  }

  // function placeCounter() {
  //   const col = parseInt(selectedCol);
  //   if (isNaN(col) || col < 0 || col > 6) return;
  //   setBoard((prevBoard) => {
  //     const newBoard = prevBoard.map((row) => [...row]); // deep copy
  //     for (let i = 5; i >= 0; i--) {
  //       if (newBoard[i][col] === 0) {
  //         newBoard[i][col] = turn;
  //         break;
  //       }
  //     }

  //     CheckWinner(col, board);
  //     return newBoard;
  //   });

  //   changeTurn();
  // }

  return (
    <div className="main-app">
      <HeaderCard />
      <div className="board-player-layout">
        <div className="form-button">
          <input
            className={`coloumn-form ${
              turn === 1 ? "turn-red" : "turn-yellow"
            }`}
            placeholder="!"
            value={selectedCol}
            onChange={(e) => setSelectedCol(e.target.value)}
          />
          <img
            src={turn === 1 ? player1Image : player2Image}
            alt=""
            className="active-player-image"
          />
        </div>
        <button
          className={`coloumn-button ${
            turn === 1 ? "turn-red" : "turn-yellow"
          }`}
          onClick={placeCounter}
        >
          Place
        </button>
        <div className="main-game">
          <Player player={player1} />
          <Board board={board} />
          <Player player={player2} />
        </div>
      </div>
      <Timer />
    </div>
  );
}

export default App;

// import { useState } from "react";
// import "./css/App.css";
// import HeaderCard from "./components/HeaderCard";
// import Board from "./components/Board";
// import Timer from "./components/Timer";
// import Player from "./components/Player";
// import player1Image from "./assets/images/player-one.svg";
// import player2Image from "./assets/images/player-two.svg";

// function App() {
//   var player1 = { imgSrc: player1Image, name: "Player 1", score: 0 };
//   var player2 = { imgSrc: player2Image, name: "Player 2", score: 0 };

//   // states
//   const [turn, setTurn] = useState(1);
//   const [board, setBoard] = useState(() =>
//     Array.from({ length: 6 }, () => Array(7).fill(0))
//   );
//   const [selectedCol, setSelectedCol] = useState("");

//   // call this function everytime someone places the goti
//   function changeTurn() {
//     if (turn == 1) {
//       setTurn(2);
//     } else if (turn == 2) {
//       setTurn(1);
//     }
//     console.log(turn);
//   }
//   return (
//     <>
//       <div className="main-app">
//         <HeaderCard />
//         <div className="board-player-layout">
//           <div className="form-button">
//             <input
//               action={""}
//               className={`coloumn-form ${
//                 turn === 1 ? "turn-red" : "turn-yellow"
//               }`}
//               placeholder="!"
//             />
//             {/* change this image based on chance */}
//             <img
//               src={turn === 1 ? player1Image : player2Image}
//               alt=""
//               className="active-player-image"
//             />
//           </div>
//           {/* change on click we can append the class name and change the code in css  */}
//           <button
//             className={`coloumn-button ${
//               turn === 1 ? "turn-red" : "turn-yellow"
//             }`}
//             onClick={() => changeTurn()}
//           >
//             Place
//           </button>
//           <div className="main-game">
//             <Player player={player1}></Player>
//             <Board />
//             <Player player={player2}></Player>
//           </div>
//         </div>
//         <Timer />
//       </div>
//     </>
//   );
// }

// export default App;
