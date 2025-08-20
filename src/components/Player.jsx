import React from "react";
import "../css/player.css";

function Player({ player }) {
  return (
    <>
      <div className="player-box">
        <div className="player-box-white">
          <img src={player.imgSrc} alt="" className="player-logo" />
          <h2 className="player-number">{player.name}</h2>
          <div className="player-score">{player.score}</div>
          {/* <p className="player-Score">{player.score}</p> */}
        </div>

        <div className="player-box-black"></div>
      </div>
    </>
  );
}

export default Player;
 