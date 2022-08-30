import { useState } from "react";
import { NavLink } from "react-router-dom";
import "./Home.scss";

const Home = () => {
  const [selectedQuestionNo, setSelectedQuestionNo] = useState();
  return (
    <>
      <div className="home">
        <h1 className="home__heading">Welcome to Adeleye's trivia</h1>

        <h3 className="home__directions">
          For now it give you 10 questions of mixed difficulty
        </h3>
        <p className="home__points">
          3 points for correct responses to hard question, 2 for medium and 1
          for easy enjoy
        </p>

        <form className="home__form">
          <label htmlFor="questions-number">
            Number of Questions (1 - 50):
          </label>
          <input
            type="number"
            className="home__input-box"
            id="questions-number"
            name="questions-number"
            min="1"
            placeholder="10"
            max="50"
            required
            onChange={(e) => setSelectedQuestionNo(e.target.value)}
          />

          <NavLink to={`/questions/${selectedQuestionNo}`}>
            <button type="submit" className="home__start">
              Start
            </button>
          </NavLink>
        </form>
      </div>
    </>
  );
};

export default Home;
