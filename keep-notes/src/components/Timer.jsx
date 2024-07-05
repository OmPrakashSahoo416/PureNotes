import { useEffect, useRef, useState } from "react";
import IconButton from "./IconButton";
import RefreshRoundedIcon from "@mui/icons-material/RefreshRounded";
// import SettingsRoundedIcon from "@mui/icons-material/SettingsRounded";
import { PlayCircleFilledRounded } from "@mui/icons-material";
import { PauseCircleFilledRounded } from "@mui/icons-material";
import { db } from "../Firebase";

function Timer({ setIsTimerRunning, isTimerRunning, setGifVid }) {
  const timerRef = useRef(null);

  const [defaultTime, setDefaultTime] = useState(50 * 60 * 1000);

  const [hour, setHour] = useState(0);
  const [minute, setMinute] = useState(50);
  const [second, setSecond] = useState(0);

  const [totalFocusTime, setTotalFocusTime] = useState([]);

  function startTimer() {
    db.collection("focus")
      .doc("123")
      .update({ focusTime: totalFocusTime.at(0) })
      .catch();
    if (!isTimerRunning) {
      setIsTimerRunning(true);
      timerRef.current = setInterval(() => {
        setDefaultTime((value) => {
          setSecond(Math.floor(value / 1000) % 60);
          setMinute(Math.floor(value / (1000 * 60)) % 60);
          setHour(Math.floor(value / (1000 * 60 * 60)) % 12);
          setTotalFocusTime((val) => [Math.floor(val.at(0) + 1)]);

          return value - 1000;
        });
      }, 1000);
    }
  }

  function pauseTimer() {
    db.collection("focus")
      .doc("123")
      .update({ focusTime: totalFocusTime.at(0) })
      .catch();
    setIsTimerRunning(false);
    clearInterval(timerRef.current);
  }

  function resetTimer() {
    db.collection("focus")
      .doc("123")
      .update({ focusTime: totalFocusTime.at(0) })
      .catch();
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
  }, [defaultTime, setDefaultTime, setIsTimerRunning, totalFocusTime]);

  useEffect(() => {
    db.collection("focus").onSnapshot((snap) =>
      setTotalFocusTime(snap.docs.map((doc) => doc.data().focusTime))
    );
  }, []);

  return (
    <>
      <div className="focusTypes flex  justify-evenly items-center">
        <button
          className="border-2  focus:bg-white mr-5 rounded-full p-3 text-white border-white focus:text-slate-800"
          type="button"
          onClick={() => (setDefaultTime(50 * 60 * 1000), setMinute(50), setGifVid('https://i.gifer.com/61I.gif'))}
        >
          Pomodoro
        </button>
        <button
          className="border-2 mr-5 rounded-full p-3 text-white border-white focus:text-slate-800 focus:bg-white"
          type="button"
          onClick={() => (setDefaultTime(5 * 60 * 1000), setMinute(5), setGifVid('https://i.gifer.com/4Cb2.gif'))}
        >
          Short Break
        </button>
        <button
          className="border-2 rounded-full p-3 text-white border-white focus:text-slate-800 focus:bg-white"
          type="button"
          onClick={() => (setDefaultTime(10 * 60 * 1000), setMinute(10), setGifVid('https://i.gifer.com/xK.gif'))}
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
      </div>
      <div className="text-white flex font-semibold m-5 text-center justify-center">
        {/* keeping it divided by 120 because for some reason it is incrementing by 2 each time 
        may be because of more number of instances but clearing interval on useeffect just breaks everything */}
        <span className="text-slate-100 font-semibold text-center text-xl">
          {Math.floor(totalFocusTime[0] / 120) + " min."}{" "}
        </span>
      </div>
    </>
  );
}

export default Timer;
