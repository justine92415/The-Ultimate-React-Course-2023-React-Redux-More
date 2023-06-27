import './App.css';
import { useState } from 'react';

function App() {
    return (
        <div className="App">
            <Counter />
        </div>
    );
}

function Counter() {
    const [count, setCount] = useState(0);
    const [step, setStep] = useState(0);

    const date = new Date('june 21 2027');
    date.setDate(date.getDate() + count);
    return (
        <div>
            <div>
                <button onClick={() => setStep((c) => c - 1)}>-</button>
                <span>Step: {step}</span>
                <button onClick={() => setStep((c) => c + 1)}>+</button>
            </div>
            <div>
                <button onClick={() => setCount((c) => c - step)}>-</button>
                <span>Count: {count}</span>
                <button onClick={() => setCount((c) => c + step)}>+</button>
            </div>
            <p>
                <span>
                    {!count
                        ? 'Today is'
                        : count > 0
                        ? `${count} days from today is `
                        : `${count} days ago was`}
                </span>
                <span>{date.toDateString()}</span>
            </p>
        </div>
    );
}

export default App;
