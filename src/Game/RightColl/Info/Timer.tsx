import { configObj } from 'js-chess-engine';
import { FC, Fragment, useEffect, useState } from 'react';

type input = {
  data: configObj;
  type: configObj['turn'];
};

/**
 * Timer component
 */
const Timer: FC<input> = ({ type, data }) => {
  const [time, setTime] = useState(0);

  let runTimer = !data.isFinished && data.turn === type && data.fullMove > 1;
  let reset = false;
  if (time > 0 && data.fullMove <= 1) {
    reset = true;
  }

  useEffect(() => {
    if (reset) setTime(0);
  }, [reset]);

  useEffect(() => {
    if (!runTimer) return;
    const interval = setInterval(() => {
      setTime((prevTime) => prevTime + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [runTimer]);
  return (
    <Fragment>
      <span>{('0' + Math.floor((time / 3600) % 86400)).slice(-2)}:</span>
      <span>{('0' + Math.floor((time / 60) % 3600)).slice(-2)}:</span>
      <span>{('0' + (time % 60)).slice(-2)}</span>
    </Fragment>
  );
};

export default Timer;
