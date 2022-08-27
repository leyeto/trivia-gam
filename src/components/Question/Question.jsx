import { useEffect, useState } from "react";
import { b64ToUnicode } from "../../lib/utils";

const axios = require("axios").default;
const Question = () => {
  const [noOfQuestions, setNoOfQuestions] = useState(100);
  const [arrayOfQuestions, setArrayOfQuestions] = useState();
  const [questionNo, setQuestionNo] = useState(1);
  const [currentQuestion, setCurrentQuestion] = useState();
  const [options, setOptions] = useState();
  const [correctAnswer, setCorrectAnswer] = useState();
  const [userResponse, setUserResponse] = useState();
  const [score, setScore] = useState(0);
  const [gameOn, setGameOn] = useState(true);

  const API = "https://opentdb.com/api.php?";

  const getQuestions = () => {
    try {
      axios
        .get(`${API}amount=${noOfQuestions}`)
        .then((response) => {
          setArrayOfQuestions(response.data.results);
          setCurrentQuestion(response.data.results[questionNo - 1]);

          setCorrectAnswer(
            b64ToUnicode(response.data.results[questionNo - 1].correct_answer)
          );

          const tempOptions = shuffleOptions(
            response.data.results[questionNo - 1].incorrect_answers,
            response.data.results[questionNo - 1].correct_answer
          );
          setOptions(tempOptions);
        })
        .catch((err) => console.log("error from getQuestions: ", err));
    } catch (err) {
      console.log("error from getQuestions: ", err);
    }
  };

  const shuffleOptions = (incorrectArray, correctAnswer) => {
    let temp = [];

    incorrectArray.forEach((option) => temp.push(b64ToUnicode(option)));

    const insertCorrect = temp[Math.floor(Math.random() * temp.length)];

    temp.splice(insertCorrect, 0, b64ToUnicode(correctAnswer));

    return temp;
  };

  useEffect(() => {
    getQuestions();
  }, []);

  const changeHandler = (e) => {
    e.preventDefault();
    setUserResponse(e.target.value);
  };

  const uncheckRadios = () => {
    const radioButtons = document.querySelectorAll(".radio-input");
    radioButtons.forEach((radio) => (radio.checked = false));
  };

  const changeQuestion = () => {
    const newQuestionNo = questionNo + 1;

    setOptions("");
    setUserResponse("");
    setCorrectAnswer("");
    setQuestionNo(newQuestionNo);
    setCurrentQuestion(arrayOfQuestions[newQuestionNo - 1]);
    setCorrectAnswer(
      b64ToUnicode(arrayOfQuestions[newQuestionNo - 1].correct_answer)
    );

    const shuffledOptions = shuffleOptions(
      arrayOfQuestions[newQuestionNo - 1].incorrect_answers,
      arrayOfQuestions[newQuestionNo - 1].correct_answer
    );
    setOptions(shuffledOptions);
    uncheckRadios();
  };

  const submitHandler = (e) => {
    e.preventDefault();

    if (userResponse === correctAnswer) {
      const questionDifficulty = currentQuestion.difficulty;
      if (questionDifficulty === "easy") {
        setScore(score + 1);
        console.log("correct 1 points added");
      } else if (questionDifficulty === "medium") {
        setScore(score + 2);
        console.log("correct 2 points added");
      } else {
        setScore(score + 3);
        console.log("correct 3 points added");
      }
    }

    if (questionNo < noOfQuestions) {
      console.log("questionNo ", questionNo);
      console.log("noOfQuestions ", noOfQuestions);
      changeQuestion();
    } else {
      console.log("End of Game");
      setGameOn(false);
    }
  };

  if (currentQuestion === undefined) {
    return <h1>Loading data</h1>;
  }

  if (!gameOn) {
    return <h1>Game Over</h1>;
  }

  return (
    <>
      <div className="question">
        <h1>Question Component</h1>
        <h2>Question {questionNo}.</h2>
        <h3>{b64ToUnicode(currentQuestion.question)}</h3>
        <p>Current Score: {score}</p>
        <div>
          <form
            onChange={(e) => changeHandler(e)}
            onSubmit={(e) => {
              submitHandler(e);
            }}
          >
            {options.map((option, i) => {
              return (
                <div key={i}>
                  <input
                    className="radio-input"
                    type="radio"
                    id={`option${i}`}
                    value={option}
                    name={`question${questionNo}`}
                  />
                  <label htmlFor={`option${i}`}>{option}</label>
                </div>
              );
            })}
            <button type="submit">Submit</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Question;
