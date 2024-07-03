import { useEffect, useRef, useState } from "react";
import IconButton from "./IconButton";
import RefreshRoundedIcon from "@mui/icons-material/RefreshRounded";
import SettingsRoundedIcon from "@mui/icons-material/SettingsRounded";
import { PlayCircleFilledRounded } from "@mui/icons-material";
import { PauseCircleFilledRounded } from "@mui/icons-material";

function Timer({ setIsTimerRunning, isTimerRunning }) {
  const timerRef = useRef(null);

  const [defaultTime, setDefaultTime] = useState(50 * 60 * 1000);

  const [hour, setHour] = useState(0);
  const [minute, setMinute] = useState(50);
  const [second, setSecond] = useState(0);

  function startTimer() {
    if (!isTimerRunning) {
      setIsTimerRunning(true);
      timerRef.current = setInterval(() => {
        setDefaultTime((value) => {
          setSecond(Math.floor(value / 1000) % 60);
          setMinute(Math.floor(value / (1000 * 60)) % 60);
          setHour(Math.floor(value / (1000 * 60 * 60)) % 12);

          return value - 1000;
        });
      }, 1000);
    }
  }

  function pauseTimer() {
    setIsTimerRunning(false);
    clearInterval(timerRef.current);
  }

  function resetTimer() {
    setDefaultTime(50 * 60 * 1000);
    setHour(0);
    setSecond(0);
    setMinute(50);
    setIsTimerRunning(false);
    clearInterval(timerRef.current);
  }

  useEffect(() => {
    if (defaultTime === 0) {
      clearInterval(timerRef.current);
      setDefaultTime(50 * 60 * 1000);
      setIsTimerRunning(false);
    }
  }, [defaultTime, setDefaultTime, setIsTimerRunning]);

  return (
    <>
      <div className="focusTypes flex  justify-evenly items-center">
        <button
          className="border-2  focus:bg-white mr-5 rounded-full p-3 text-white border-white focus:text-slate-800"
          type="button" 
          onClick={() => (setDefaultTime(50 * 60 * 1000),setMinute(50))}
        >
          Pomodoro
        </button>
        <button
          className="border-2 mr-5 rounded-full p-3 text-white border-white focus:text-slate-800 focus:bg-white"
          type="button"
          onClick={() => (setDefaultTime(5 * 60 * 1000),setMinute(5))}
        >
          Short Break
        </button>
        <button
          className="border-2 rounded-full p-3 text-white border-white focus:text-slate-800 focus:bg-white"
          type="button"
          onClick={() => (setDefaultTime(10 * 60 * 1000),setMinute(10))}
        >
          Long Break
        </button>
      </div>
      <div className="focusWatch text-white text-center font-bold font-['Calibri'] text-[150px]">
        {/* toString(10) means decimal representation 2 for binary similarly  */}
        {hour < 10 ? "0" + hour.toString(10) : hour.toString()}:
        {minute < 10 ? "0" + minute.toString(10) : minute.toString()}:
        {second < 10 ? "0" + second.toString(10) : second.toString()}
      </div>
      <div className="focusButtons flex items-center justify-center">
        <button
          onClick={() => (!isTimerRunning ? startTimer() : pauseTimer())}
          className="border-2 mr-5 rounded-full text-white border-white hover:bg-white hover:text-slate-800"
          type="button"
        >
          {!isTimerRunning ? (
            <IconButton Icon={PlayCircleFilledRounded} color="white" />
          ) : (
            <IconButton Icon={PauseCircleFilledRounded} color="white" />
          )}
        </button>
        <button
          type="button"
          onClick={() => resetTimer()}
          className="rounded-full mr-5 border-2 border-white hover:bg-white"
        >
          <IconButton Icon={RefreshRoundedIcon} color="white" />
        </button>
        <button
          type="button"
          className="rounded-full mr-5 border-2 border-white hover:bg-white"
        >
          <IconButton Icon={SettingsRoundedIcon} color="white" />
        </button>
      </div>
    </>
  );
}

export default Timer;
