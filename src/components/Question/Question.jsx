import { useEffect, useState } from "react";
import { shuffleResponses } from "../../lib/utils";

const axios = require("axios").default;
const Question = () => {
  const [noOfQuestion, setNoOfQuestion] = useState(10);
  const [arrayOfQuestions, setArrayOfQuestions] = useState();
  const [questionNo, setQuestionNo] = useState(1);
  const [currentQuestion, setCurrentQuestion] = useState();
  const [options, setOptions] = useState();
  const [correctAnswer, setCorrectAnswer] = useState();
  const [userResponse, setUserResponse] = useState();

  const API = "https://opentdb.com/api.php?";

  const getQuestions = () => {
    try {
      axios
        .get(`${API}amount=${noOfQuestion}`)
        .then((response) => {
          setArrayOfQuestions(response.data.results);
          setCurrentQuestion(response.data.results[questionNo - 1]);

          setCorrectAnswer(
            response.data.results[questionNo - 1].correct_answer
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

  const shuffleOptions = (incorrectArray, correctArray) => {
    let temp = [];

    incorrectArray.forEach((option) => temp.push(option));

    const insertCorrect = temp[Math.floor(Math.random() * temp.length)];

    temp.splice(insertCorrect, 0, correctArray);

    return temp;
  };

  useEffect(() => {
    getQuestions();
  }, []);

  const clickHandler = (e) => {
    e.preventDefault();
    console.log(e);
  };

  if (currentQuestion == undefined) {
    return <h1>Loading data</h1>;
  }

  return (
    <>
      <div className="question">
        <h1>Question Component</h1>
        <h2>Question {questionNo}.</h2>
        <h3>{currentQuestion.question}</h3>
        {options.map((option, i) => {
          return (
            <>
              <div key={i}>
                <input
                  onSubmit={clickHandler}
                  type="radio"
                  id={`option${i}`}
                  name={`option${i}`}
                />{" "}
                <label htmlFor={`option${i}`}>{option}</label>
              </div>
            </>
          );
        })}
      </div>
    </>
  );
};

export default Question;
