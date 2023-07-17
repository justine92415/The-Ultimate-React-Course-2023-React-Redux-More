import React from 'react';
import ReactDOM from 'react-dom/client';
// import './index.css';
// import App from './App';
import StartRating from './StartRating';

function Test() {
  const [movieRating, setMovieRating] = React.useState(0);

  return (
    <div>
      <StartRating color="blue" maxRating={10} onSetRating={setMovieRating} />
      <p>This movie was rated {movieRating} stars</p>
    </div>
  );
}

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    {/* <App /> */}
    <StartRating
      maxRating={5}
      messages={['Terrible', 'Bad', 'Okay', 'Good', 'Amazing']}
    ></StartRating>
    <StartRating
      size={24}
      color="red"
      className="test"
      defaultRating={3}
    ></StartRating>
    <Test />
  </React.StrictMode>
);
