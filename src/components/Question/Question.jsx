import { useEffect, useState } from "react";
import { shuffleResponses } from "../../lib/utils";

const axios = require("axios").default;
const Question = () => {
  const [noOfQuestions, setNoOfQuestions] = useState(10);
  const [arrayOfQuestions, setArrayOfQuestions] = useState();
  const [questionNo, setQuestionNo] = useState(1);
  const [currentQuestion, setCurrentQuestion] = useState();
  const [options, setOptions] = useState();
  const [correctAnswer, setCorrectAnswer] = useState();
  const [userResponse, setUserResponse] = useState();
  const [score, setScore] = useState(0);

  const API = "https://opentdb.com/api.php?";

  const getQuestions = () => {
    try {
      axios
        .get(`${API}amount=${noOfQuestions}`)
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

  const changeHandler = (e) => {
    e.preventDefault();
    setUserResponse(e.target.value);
  };

  // const [noOfQuestion, setNoOfQuestion] = useState(10);
  // const [arrayOfQuestions, setArrayOfQuestions] = useState();
  // const [questionNo, setQuestionNo] = useState(1);
  // const [currentQuestion, setCurrentQuestion] = useState();
  // const [options, setOptions] = useState();
  // const [correctAnswer, setCorrectAnswer] = useState();
  // const [userResponse, setUserResponse] = useState();
  // const [score, setScore] = useState(0);

  const changeQuestion = () => {
    if (questionNo + 1 <= noOfQuestions) {
      const newQuestionNo = questionNo + 1;
      setOptions("");
      setUserResponse("");
      setCorrectAnswer("");
      setQuestionNo(newQuestionNo);
      setCurrentQuestion(arrayOfQuestions[newQuestionNo]);
      console.log(arrayOfQuestions[newQuestionNo].correctAnswer);
      setCorrectAnswer(arrayOfQuestions[newQuestionNo].correct_answer);

      const shuffledOptions = shuffleOptions(
        arrayOfQuestions[newQuestionNo].incorrect_answers,
        arrayOfQuestions[newQuestionNo].correct_answer
      );
      setOptions(shuffledOptions);
    } else {
      return <h1>Game Over</h1>;
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();

    if (userResponse === correctAnswer) {
      setScore(score + 5);
      console.log("correct 5 points added");
    }
    changeQuestion();
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
