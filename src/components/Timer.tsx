import { useEffect } from 'react';
import { Dispatch } from '../type/type';

function Timer({
  dispatch,
  secondsRemaining,
}: {
  dispatch: Dispatch;
  secondsRemaining: number;
}) {
  const mins = Math.floor(secondsRemaining / 60);
  const secs = secondsRemaining % 60;

  useEffect(
    function () {
      const id = setInterval(function () {
        dispatch({ type: 'tick' });
      }, 1000);
      return function () {
        clearInterval(id);
      };
    },
    [dispatch]
  );
  return (
    <div className="timer">
      {mins < 10 && '0'}
      {mins}:{secs < 10 && '0'}
      {secs}
    </div>
  );
}

export default Timer;
