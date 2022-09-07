import "./App.scss";
import Question from "./components/Question/Question";
import { Route, Routes } from "react-router-dom";
import Home from "./components/Home/Home";
import Header from "./components/Header/Header";

function App() {
  return (
    <div className="App">
      <header>
        <Header />
      </header>
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/answer" element={<Question />} />
          <Route path={"/questions/:totalQuestions"} element={<Question />} />
        </Routes>
      </main>
      <footer></footer>
    </div>
  );
}

export default App;
