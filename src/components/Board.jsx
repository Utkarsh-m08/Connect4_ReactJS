import React from "react";
import boardWhite from "../assets/images/board-layer-white-large.svg";
import boardBlack from "../assets/images/board-layer-black-large.svg";
import "../css/board.css";

function Board({ board }) {
  return (
    <div className="board-wrapper">
      <img className="board-black" src={boardBlack} alt="Black board" />

      <div className="grid-layer">
        {board.map((row, rowIndex) => (
          <div className="grid-row" key={rowIndex}>
            {row.map((cell, colIndex) => (
              <div
                key={colIndex}
                className={`grid-cell ${
                  cell === 1 ? "player-1" : cell === 2 ? "player-2" : ""
                }`}
              />
            ))}
          </div>
        ))}
      </div>

      <img className="board-white" src={boardWhite} alt="White board" />
    </div>
  );
}

export default Board;

// import React from "react";
// import boardWhite from "../assets/images/board-layer-white-large.svg";
// import boardBlack from "../assets/images/board-layer-black-large.svg";
// import "../css/board.css";

// function Board() {
//   return (
//     <div className="board-wrapper">
//       {/* Bottom layer */}
//       <img className="board-black" src={boardBlack} alt="" />

//       {/* Grid layer (between black and white) */}
//       <div className="grid-layer">
//         {Array.from({ length: 6 }).map((_, row) => (
//           <div className="grid-row" key={row}>
//             {Array.from({ length: 7 }).map((_, col) => (
//               <div className="grid-cell" key={col}></div>
//             ))}
//           </div>
//         ))}
//       </div>

//       {/* Top layer */}
//       <img className="board-white" src={boardWhite} alt="" />
//     </div>
//   );
// }

// export default Board;
