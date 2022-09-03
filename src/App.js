import "./App.scss";
import Question from "./components/Question/Question";
import { Route, Routes } from "react-router-dom";
import Home from "./components/Home/Home";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/answer" element={<Question />} />
        <Route
          path={"/questions/:totalQuestions"}
          element={<Question />}
          // render={(routerProps) => {
          //   console.log(routerProps);
          //   return <Question />;
          // }}
        />
      </Routes>
    </div>
  );
}

export default App;
