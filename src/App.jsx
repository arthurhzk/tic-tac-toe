import "./App.css";
import { useState } from "react";
import { Button } from "@mui/material";
function App() {
  const [matrix, setMatrix] = useState([
    [null, null, null],
    [null, null, null],
    [null, null, null],
  ]);
  const [player] = useState("X");
  const [isComputerTurn, setIsComputerTurn] = useState(false);
  const handleClick = (row, col) => {
    if (matrix[row][col] === null) {
      const copy = [...matrix];
      copy[row][col] = player;
      setMatrix(copy);
      setIsComputerTurn(true);
      setTimeout(() => {
        handleComputerMove();
        setIsComputerTurn(false);
      }, 1000);
    }
  };

  const handleResetGame = () => {
    setMatrix([
      [null, null, null],
      [null, null, null],
      [null, null, null],
    ]);
  };

  const HandleCheckWinner = (matrix) => {
    for (let i = 0; i < 3; i++) {
      if (
        matrix[i][0] === matrix[i][1] &&
        matrix[i][1] === matrix[i][2] &&
        matrix[i][0] !== null
      ) {
        return matrix[i][0];
      }
    }

    for (let i = 0; i < 3; i++) {
      if (
        matrix[0][i] === matrix[1][i] &&
        matrix[1][i] === matrix[2][i] &&
        matrix[0][i] !== null
      ) {
        return matrix[0][i];
      }
    }

    if (
      (matrix[0][0] === matrix[1][1] &&
        matrix[1][1] === matrix[2][2] &&
        matrix[0][0] !== null) ||
      (matrix[0][2] === matrix[1][1] &&
        matrix[1][1] === matrix[2][0] &&
        matrix[0][2] !== null)
    ) {
      return matrix[1][1];
    }

    return null;
  };

  const handleComputerMove = () => {
    if (!HandleCheckWinner(matrix)) {
      const [randomColumn, randomRow] = handleGetMatrixPosition();
      const copy = [...matrix];
      copy[randomColumn][randomRow] = "O";
      setMatrix(copy);
    }
  };

  const handleGetMatrixPosition = () => {
    const randomColumn = Math.floor(Math.random() * 3);
    const randomRow = Math.floor(Math.random() * 3);
    if (matrix[randomRow][randomColumn]) {
      return handleGetMatrixPosition();
    }
    return [randomRow, randomColumn];
  };

  return (
    <>
      <h1>Tic Tac Toe</h1>
      <div className={"container"}>
        <div className="game-board">
          {matrix.map((row, rowIndex) => (
            <div
              style={{ cursor: isComputerTurn ? "not-allowed" : "auto" }}
              className="row"
              key={rowIndex}
            >
              {row.map((cell, colIndex) => (
                <div
                  style={{ cursor: isComputerTurn ? "not-allowed" : "auto" }}
                  className="cell"
                  key={colIndex}
                  onClick={() => handleClick(rowIndex, colIndex)}
                >
                  {cell || ""}
                </div>
              ))}
            </div>
          ))}
        </div>
        <div className="game-info">
          {HandleCheckWinner(matrix) ? (
            <h1>Player {HandleCheckWinner(matrix)} won 🎉🎉</h1>
          ) : (
            <h1 className="game-over">
              {HandleCheckWinner(matrix) ? "Game over!" : ""}
            </h1>
          )}
          <Button
            color="secondary"
            variant="text"
            onClick={() => handleResetGame()}
          >
            Reset
          </Button>
        </div>
      </div>
    </>
  );
}

export default App;
