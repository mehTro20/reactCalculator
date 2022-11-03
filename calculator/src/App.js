import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [buttons] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9, 0]);
  const [actions] = useState(["+", "-", "*", "/", "."]);
  const [equation, setEquation] = useState("0");
  const [ans, setAns] = useState("0");
  const [signClicked, setSignClicked] = useState(true);

  let last = equation[equation.length - 1];
  useEffect(() => {
    if ((ans === "0" && equation === "0") || actions.includes(last)) {
      setSignClicked(true);
    } else {
      setSignClicked(false);
    }
  }, [ans, equation, actions, last]);

  const evaluation = (e) => {
    setSignClicked(false);
    if (e === "=") {
      setAns(eval(equation));
      return setEquation("0");
    } else if (equation === "0" && ans === "0") {
      setEquation("");
    } else if (equation === "0" && ans !== "0" && !buttons.includes(e)) {
      setEquation(ans);
    } else if (equation === "0") {
      setEquation("");
    }
    setEquation((preState) => {
      return (preState += String(e));
    });
    console.log(equation[equation.length - 1]);
  };

  return (
    <div className="App">
      <div>{equation}</div>
      <div>{ans}</div>
      <div className="numbers">
        {buttons.map((x, key) => (
          <button key={key} value={x} onClick={() => evaluation(x)}>
            {x}
          </button>
        ))}
      </div>
      <div className="actions">
        {actions.map((y, key) => (
          <button
            key={key}
            value={y}
            disabled={signClicked}
            onClick={() => evaluation(y)}
          >
            {y}
          </button>
        ))}
      </div>
      <div className="equal-sign">
        <button value={"="} onClick={() => evaluation("=")}>
          =
        </button>
      </div>
      <div className="delete-btn">
        <button
          onClick={() => setEquation(equation.slice(0, equation.length - 1))}>
          Del
        </button>
      </div>
    </div>
  );
}

export default App;
