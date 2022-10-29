import { useState, useEffect } from "react";

export const useCountdown = (
  initialTime: number,
  callBack: () => void,
  interval = 1000
) => {
  const [time, setTime] = useState(initialTime);
  useEffect(() => {
    const customInterval = setInterval(() => {
      time > 0 && setTime((prev) => prev - interval);
    }, interval);
    if (time === 0) callBack();

    return () => clearInterval(customInterval);
  }, [time]);
  return time;
};
