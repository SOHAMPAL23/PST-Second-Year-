import { useState } from "react";

export default function Calculator() {
  const [num1, setNum1] = useState("");
  const [num2, setNum2] = useState("");
  const [result, setResult] = useState(null);

  const calculate = (operator) => {
    const a = parseFloat(num1);
    const b = parseFloat(num2);
    if (isNaN(a) || isNaN(b)) {
      setResult("Enter valid numbers");
      return;
    }
    switch (operator) {
      case "+":
        setResult(a + b);
        break;
      case "-":
        setResult(a - b);
        break;
      case "*":
        setResult(a * b);
        break;
      case "/":
        setResult(b !== 0 ? a / b : "Cannot divide by 0");
        break;
      default:
        setResult("Error");
    }
  };

  return (
    <div className="firstdiv">
      <h1 className="text">Simple Calculator</h1>
      <input
        type="number"
        value={num1}
        onChange={(e) => setNum1(e.target.value)}
        placeholder="Enter first number"
        className="box"
      />
      <input
        type="number"
        value={num2}
        onChange={(e) => setNum2(e.target.value)}
        placeholder="Enter second number"
        className="box"
      />
      <div className="flex gap-2 my-4">
        <button onClick={() => calculate("+")} className="btn">+</button>
        <button onClick={() => calculate("-")} className="btn">-</button>
        <button onClick={() => calculate("*")} className="btn">*</button>
        <button onClick={() => calculate("/")} className="btn">/</button>
      </div>
      {result !== null && (
        <div className="res">Result: {result}</div>
      )}
    </div>
  );
}
