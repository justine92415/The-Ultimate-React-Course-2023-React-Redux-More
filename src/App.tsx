import { useState } from 'react';

const message = [
    'Learn React 🤗',
    'Apply for jobs 😎',
    'Invest your new income 💰',
];

function App() {
    const [step, setStep] = useState(1);
    // const [test, setTest] = useState({ name: 'Justine' });
    const [isOpen, setIsOpen] = useState(true);

    function handlePrevious() {
        if (step > 1) setStep((s) => s - 1);
    }

    function handleNext() {
        if (step < 3) setStep((s) => s + 1);
        // Bad Practice
        // test.name = 'Fred';
        // setTest({ name: 'Fred' });
    }

    return (
        <>
            <button className="close" onClick={() => setIsOpen((is) => !is)}>
                &times;{' '}
            </button>

            {isOpen && (
                <div className="steps">
                    <div className="numbers">
                        <div className={step >= 1 ? 'active' : ''}>1</div>
                        <div className={step >= 2 ? 'active' : ''}>2</div>
                        <div className={step >= 3 ? 'active' : ''}>3</div>
                    </div>

                    <p className="message">
                        Step {step}:{message[step - 1]}
                    </p>

                    <div className="buttons">
                        <Button
                            textColor="#fff"
                            bgColor="#7950f2"
                            onClick={handlePrevious}
                        ><span>😒</span> Previous</Button>
                        <Button
                            textColor="#fff"
                            bgColor="#7950f2"
                            onClick={handleNext}
                        >Next <span>😒</span></Button>
                    </div>
                </div>
            )}
        </>
    );
}

function Button({ textColor, bgColor, onClick, children}: any) {
    return (
        <button
            style={{ backgroundColor: bgColor, color: textColor }}
            onClick={onClick}
        >
            {children}
        </button>
    );
}

export default App;
