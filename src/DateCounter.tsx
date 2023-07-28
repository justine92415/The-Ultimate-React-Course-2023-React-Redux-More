import { ChangeEvent, useReducer, useState } from 'react';

function reducer(
  state: number,
  action: { type: 'inc' | 'dec' | 'setCount'; payload?: number }
): number {
  console.log(state, action);
  if (action.type === 'inc') return state + 1;
  if (action.type === 'dec') return state - 1;
  if (action.type === 'setCount') return action.payload!;
  return state;
}

function DateCounter() {
  // const [count, setCount] = useState(0);
  const [count, dispatch] = useReducer(reducer, 0);
  const [step, setStep] = useState(1);

  // This mutates the date object.
  const date = new Date('june 21 2027');
  date.setDate(date.getDate() + count);

  const dec = function () {
    dispatch({ type: 'dec' });
    // setCount((count) => count - 1);
    // setCount((count) => count - step);
  };

  const inc = function () {
    dispatch({ type: 'inc' });
    // setCount((count) => count + 1);
    // setCount((count) => count + step);
  };

  const defineCount = function (e: ChangeEvent<HTMLInputElement>) {
    dispatch({ type: 'setCount', payload: Number(e.target.value) });
    // setCount(Number(e.target.value));
  };

  const defineStep = function (e: ChangeEvent<HTMLInputElement>) {
    setStep(Number(e.target.value));
  };

  const reset = function () {
    // setCount(0);
    setStep(1);
  };

  return (
    <div className="counter">
      <div>
        <input
          type="range"
          min="0"
          max="10"
          value={step}
          onChange={(e: ChangeEvent<HTMLInputElement>) => defineStep(e)}
        />
        <span>{step}</span>
      </div>

      <div>
        <button onClick={dec}>-</button>
        <input
          value={count}
          onChange={(e: ChangeEvent<HTMLInputElement>) => defineCount(e)}
        />

        <button onClick={inc}>+</button>
      </div>

      <p>{date.toDateString()}</p>

      <div>
        <button onClick={reset}>Reset</button>
      </div>
    </div>
  );
}
export default DateCounter;
