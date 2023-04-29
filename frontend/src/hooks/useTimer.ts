/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from 'react';

export const useTimer = (timeSeconds: number) => {
  // state to store time
  const [time, setTime] = useState(timeSeconds);

  // state to check stopwatch running or not
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let intervalId: NodeJS.Timer;
    if (isRunning) {
      intervalId = setInterval(() => setTime(time + 1), 1000);
    }
    return () => clearInterval(intervalId);
  }, [isRunning, time]);

  const hours = Math.floor(time / 36000);

  const minutes = (time: number) => ~~((time % 3600) / 60);

  const seconds = (time: number) => Math.floor(time % 60);

  const start = () => {
    setIsRunning(true);
  };

  const stop = () => {
    setIsRunning(false);
  };
  // Method to reset timer back to 0
  const reset = () => {
    setTime(0);
  };
  return { reset, start, stop, seconds, minutes, time, isStarted: isRunning };
};
