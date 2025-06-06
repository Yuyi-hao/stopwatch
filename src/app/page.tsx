"use client"
import { useRef, useState } from "react";


export default function Home() {
  const [elaspedTime, setElaspedTime] = useState<number>(0);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [isRunning, setIsRunning] = useState<boolean>(false); 
  const startTimeRef = useRef<number>(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> |null>(null);

  const startStopwatch = () => {
    setIsPaused(false);
    setIsRunning(true);
    startTimeRef.current = Date.now() - elaspedTime;
    intervalRef.current = setInterval(() => {
      setElaspedTime(Date.now() - startTimeRef.current);
    });
  }
  const stopStopwatch = () => {
    setIsRunning(false);
    setIsPaused(true);
    if(intervalRef.current !== null){
      clearInterval(intervalRef.current);
    }
    return;
  }
  const resetStopwatch = () => {
    setIsRunning(false);
    setIsPaused(false);
    setElaspedTime(0);
    startTimeRef.current = 0;
    if(intervalRef.current !== null){
      clearInterval(intervalRef.current);
    }
    intervalRef.current = null;
  }
  const formatTime = (time: number) => {
    const minutes = Math.floor(time/60000);
    const seconds = Math.floor((time%60000)/1000);
    const milliseconds = Math.floor((time%1000)/10);
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}:${milliseconds.toString().padStart(2, '0')}`;
  };
  return (
    <>
    <main className="relative rounded-xl bg-green-600 flex flex-col gap-12 shadow-2xl px-8 py-8">
      <div className="absolute -top-17 left-1/2 transform translate-x-1/2 ">
        <img src="/assets/images/summer-pusheen.gif" alt="Pusheen" className="w-30" />
      </div>
      <h1 className="text-3xl font-bold text-center text-shadow-indigo-200">Stopwatch</h1>
      <p className="text-orange-400 font-bold text-6xl text-center" aria-live="polite">{formatTime(elaspedTime)}</p>
      <div className="flex flex-row place-content-center">
        <button className="bg-orange-300 hover:bg-orange-400 text-gray-600 font-bold py px-2 rounded mx-1 disabled:opacity-50 disabled:cursor-not-allowed" 
        disabled={isRunning}
        onClick={startStopwatch}>
          {isPaused?'Resume':'Start'}
        </button>
        <button className="bg-orange-300 hover:bg-orange-400 text-gray-600 font-bold py px-2 rounded mx-1 disabled:opacity-50 disabled:cursor-not-allowed"
        disabled={!isRunning} onClick={stopStopwatch}>stop</button>
        <button className="bg-blue-300 hover:bg-blue-400 text-gray-600 font-bold py px-2 rounded mx-1" onClick={resetStopwatch}>Reset</button>
      </div>
    </main>
    </>
  );
}
