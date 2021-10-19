import './App.css';
import React from 'react';

// square components
export default function Square({squareData, squarePosition, handleChessData}) {
  if (squareData === "black" ) {
    var chessClassName = "square-black-circle"
  } else if (squareData === "white") {
    var chessClassName = "square-white-circle"
  }

  const handleChessClick = () => {
    handleChessData(squarePosition);
  };

  return(
    <div className="square" onClick={()=>console.log(squareData, squarePosition)} onClick={handleChessClick}>
      <div className={chessClassName}></div>
      <div className="square-column">
      </div>
      
    </div>
  )
}
