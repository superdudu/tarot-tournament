import React, { useEffect, useState } from "react";

export default function Timer({ duration }) {
  const [time, setTime] = useState(duration);
  const [running, setRunning] = useState(false);

  useEffect(() => {
    if (!running) return;
    const interval = setInterval(() => {
      setTime(t => (t > 0 ? t - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, [running]);

  const minutes = Math.floor(time / 60);
  const seconds = time % 60;

  return (
    <div className="flex items-center gap-4">
      <span className="text-xl font-mono">
        {minutes}:{seconds.toString().padStart(2, "0")}
      </span>
      <button
        onClick={() => setRunning(!running)}
        className="bg-green-500 text-white px-2 py-1 rounded"
      >
        {running ? "Pause" : "Start"}
      </button>
      <button
        onClick={() => {
          setRunning(false);
          setTime(duration);
        }}
        className="bg-red-500 text-white px-2 py-1 rounded"
      >
        Reset
      </button>
    </div>
  );
}