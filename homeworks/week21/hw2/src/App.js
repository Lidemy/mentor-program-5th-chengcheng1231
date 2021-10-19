import './App.css';
import React from 'react';
import { useState } from "react";
import Square from "./Square";


// board components
function Board() {
  // 設定棋盤各個十字的資料
  const [boardData, setBoardData] = useState(Array(19).fill(Array(19).fill(null))); //設定19X19 的棋盤資料
  const [next, setNext] = useState(true) //True 設定黑棋先下
  const [gameResult, setGameResult] = useState("Next player is: black") // 設定每次下棋的結果

  //產生棋盤
  const checkerBoardSize = 19;
  function creatCheckerBoard () {
    let checkerBoardAll = [];
    for (let i=0;i<=checkerBoardSize-1;i++) {
      let checkerBoardRow = [];
      for(let j=0;j<=checkerBoardSize-1;j++){
        //將 19 個格子資料裝進 checkerBoardRow
        checkerBoardRow.push(
          <Square
            key={[i,j]}
            squarePosition={[i,j]}
            squareData={boardData[i][j]}
            handleChessData={handleChessData}
          />
        )
      }
      // 將 checkerBoardRow 裝進 div tag
      checkerBoardAll.push(
        <div className="board-row">
          {checkerBoardRow}
        </div>
      )
    }
    
    return (
      checkerBoardAll
    )
  }

  //處理格子的點擊事件 // 這部分照作業提示來做的
  const handleChessData = (squarePosition) => {
    if (gameResult[0] === "W" || boardData[squarePosition[0]][squarePosition[1]]) return //如果結果開頭是 W 或是該格子有資料則回傳
    const newBoardData = JSON.parse(JSON.stringify(boardData))
    const chessColor = next ? "black" :"white"
    newBoardData[squarePosition[0]][squarePosition[1]] = chessColor
    setBoardData(newBoardData)
    setNext(!next) // 設定黑白棋輪流下
    const nextPlayer = !next ? "black" :"white"
    //開始判斷輸贏
    if (calculateWinner(newBoardData, squarePosition, chessColor)) {
      setGameResult(`Winner is: ${calculateWinner(newBoardData, squarePosition, chessColor)}`)
    } else {
      setGameResult(`Next player is: ${nextPlayer}`)
    }
  }

  //判斷勝負
  function calculateWinner (Data, newChessPosition) {
    var [x, y] = newChessPosition
    //檢查列
    for (var i = x-4; i<= x; i++) {
      if (i < 0 || i> 14) continue
      if (Data[i][y] === Data[i+1][y]
        && Data[i+1][y] === Data[i+2][y]
        && Data[i+2][y] === Data[i+3][y]
        && Data[i+3][y] === Data[i+4][y]
        && Data[i+4][y] === Data[i][y]
        )
      {
        return Data[i][y]
      }
    }
    // 檢查行
    for (var i = y-4; i<= y; i++) {
      if (i < 0 || i> 14) continue
      if (Data[x][i] === Data[x][i+1]
        && Data[x][i+1] === Data[x][i+2]
        && Data[x][i+2] === Data[x][i+3]
        && Data[x][i+3] === Data[x][i+4]
        && Data[x][i+4] === Data[x][i]
        )
      {
        return Data[x][i]
      }
    }
    //檢查右斜
    var j = 0 
    for (var i = x+4; i >= x; i--) {
      if (i>18 || i-4<0 || y-4+j<0 || y-4+j+4>18) {
        j+=1
        continue
      }
      if (Data[i][y-4+j] === Data[i-1][y-4+j+1]
        && Data[i-1][y-4+j+1] === Data[i-2][y-4+j+2]
        && Data[i-2][y-4+j+2] === Data[i-3][y-4+j+3]
        && Data[i-3][y-4+j+3] === Data[i-4][y-4+j+4]
        && Data[i-4][y-4+j+4] === Data[i][y-4+j]
        )
      {
        return Data[i][y-4+j]
      }
      j+=1
    }

    //檢查左斜
    var k = 0 
    for (var i = x-4; i <= x; i++) {
      if ( i+4 >18 || i<0 || y-4+k<0 ||  y-4+k+4 >18) {
        k+=1
        continue
      }
      if (Data[i][y-4+k] === Data[i+1][y-4+k+1]
        && Data[i+1][y-4+k+1] === Data[i+2][y-4+k+2]
        && Data[i+2][y-4+k+2] === Data[i+3][y-4+k+3]
        && Data[i+3][y-4+k+3] === Data[i+4][y-4+k+4]
        && Data[i+4][y-4+k+4] === Data[i][y-4+k]
        )
      {
        return Data[i][y-4+k]
      }
      k+=1
    }
    return null
  }

  
  // 設定點擊 Reset 棋盤
  const handleReset = () => {
    setBoardData(Array(19).fill(Array(19).fill(null)));
    setNext(true) //True 設定黑棋先下
    setGameResult("Next player is: black") //True 設定黑棋先下
  } 

  // 回傳 board components 結果
  return(
    <div className="board-section">
      <div className="status">Welcome! {gameResult}</div>
      <button className="reset-btn" onClick={handleReset}>Reset the game</button>
      {creatCheckerBoard ()}
    </div>
  )
}

function App() {
  return (
    <div className="App">
      <Board />
    </div>
  );
}

export default App;
