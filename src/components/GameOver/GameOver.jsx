import { Link } from "react-router-dom";
import "./GameOver.scss";

const GameOver = ({ score }) => {
  console.log("score is ", score);
  if (score == undefined) {
    score = 0;
  }
  return (
    <div className="gameover">
      <h1 className="gameover__heading">Game Over</h1>
      <h2 className="gameover__score">
        Total score: <span className="gameover__actual-score">{score}</span>{" "}
      </h2>
      <Link className="gameover__restart-btn" to="/index.html">
        Restart
      </Link>
    </div>
  );
};

export default GameOver;
