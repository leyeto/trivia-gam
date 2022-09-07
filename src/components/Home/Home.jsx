import { useEffect } from "react";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import "./Home.scss";

const Home = () => {
  const [selectedQuestionNo, setSelectedQuestionNo] = useState();

  const selectionChecker = (e) => {
    setSelectedQuestionNo(e);
    const submitButton = document.querySelector(".home__start");
    const userQuestions = parseInt(selectedQuestionNo);
    console.log(typeof userQuestions);

    if (selectedQuestionNo === "") {
      submitButton.disabled = true;
    } else if (userQuestions > 0 && userQuestions <= 50) {
      submitButton.disabled = false;
      console.log("submit enabled");
    } else {
      submitButton.disabled = true;
      console.log("submit disabled");
    }
    console.log("selectedQuestion: ", userQuestions);
  };

  return (
    <>
      <div className="home">
        <h4 className="home__directions">
          User must select the number of questions they desired
        </h4>
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
            required="required"
            onChange={(e) => selectionChecker(e.target.value)}
          />

          <NavLink
            to={
              selectedQuestionNo > 0 && selectedQuestionNo <= 50
                ? `/questions/${selectedQuestionNo}`
                : `/`
            }
          >
            <button type="submit" disabled className="home__start">
              Start
            </button>
          </NavLink>
        </form>
      </div>
    </>
  );
};

export default Home;
