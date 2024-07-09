import { useEffect, useRef, useState } from "react";
import IconButton from "./IconButton";
import RefreshRoundedIcon from "@mui/icons-material/RefreshRounded";
// import SettingsRoundedIcon from "@mui/icons-material/SettingsRounded";
import { PlayCircleFilledRounded } from "@mui/icons-material";
import { PauseCircleFilledRounded } from "@mui/icons-material";
import { db } from "../Firebase";
import { motion } from "framer-motion";
import LoadingScreen from "./LoadingScreen";

function Timer({ setIsTimerRunning, isTimerRunning, setGifVid, userDetails }) {
  const timerRef = useRef(null);

  const [defaultTime, setDefaultTime] = useState(50 * 60 * 1000);

  // const [hour, setHour] = useState(0);
  const [minute, setMinute] = useState(50);
  const [second, setSecond] = useState(0);

  const [totalFocusTime, setTotalFocusTime] = useState([0]);

  function startTimer() {
    userDetails &&
      db
        .collection("focus")
        .doc(userDetails.uid)
        .update({ focusTime: totalFocusTime.filter((num) => num !== -1)[0] })
        .catch();
    if (!isTimerRunning) {
      setIsTimerRunning(true);
      timerRef.current = setInterval(() => {
        setDefaultTime((value) => {
          setSecond(Math.floor(value / 1000) % 60);
          setMinute(Math.floor(value / (1000 * 60)) % 60);

          setTotalFocusTime((val) => [Math.floor(val.at(0) + 1)]);

          return value - 1000;
        });
      }, 1000);
    }
  }

  function pauseTimer() {
    userDetails &&
      db
        .collection("focus")
        .doc(userDetails.uid)
        .update({ focusTime: totalFocusTime.filter((num) => num !== -1)[0] })
        .catch();
    setIsTimerRunning(false);
    clearInterval(timerRef.current);
  }

  function resetTimer() {
    userDetails &&
      db
        .collection("focus")
        .doc(userDetails.uid)
        .update({ focusTime: totalFocusTime.filter((num) => num !== -1)[0] })
        .catch();
    setDefaultTime(50 * 60 * 1000);

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
      // resetTimer();
    }
  }, [defaultTime, setDefaultTime, setIsTimerRunning, totalFocusTime]);

  useEffect(() => {
    userDetails &&
      db
        .collection("focus")
        .onSnapshot((snap) =>
          setTotalFocusTime(
            snap.docs
              .filter((doc) => doc.id === userDetails.uid)
              .map((d) => d.data().focusTime)
          )
        );
  }, [userDetails]);

  useEffect(() => {
    if (defaultTime === 0) {
      userDetails &&
      db
        .collection("focus")
        .doc(userDetails.uid)
        .update({ focusTime: totalFocusTime.filter((num) => num !== -1)[0] })
        .catch();
    setDefaultTime(50 * 60 * 1000);

    setSecond(0);
    setMinute(50);
    setIsTimerRunning(false);
    clearInterval(timerRef.current);

    }

  }, [setDefaultTime,setIsTimerRunning, defaultTime, userDetails, totalFocusTime])
  

  return (
    <>
    {(userDetails === null && <LoadingScreen />)}
      <motion.div className="focusTypes font-['Inter'] flex  justify-evenly items-center"
      initial={{y:-100, opacity:0}}
      animate={{ y: 0,
        opacity: 1,
        transition: {
          duration: 2,
          
          ease: [0.6, -0.05, 0.01, 0.99],
        }}}
      
      
      >
        <button
          className="border-2  focus:bg-slate-100 mr-5 rounded-full p-3 text-slate-100 border-white focus:text-slate-800"
          type="button"
          onClick={() => (
            setDefaultTime(50 * 60 * 1000),
            setMinute(50),
            setGifVid("https://i.gifer.com/61I.gif")
          )}
        >
          Pomodoro
        </button>
        <button
          className="border-2 mr-5 rounded-full p-3 text-slate-100 border-white focus:text-slate-800 focus:bg-slate-100"
          type="button"
          onClick={() => (
            resetTimer(),
            setDefaultTime(5 * 60 * 1000),
            setMinute(5),
            setGifVid("https://i.gifer.com/4Cb2.gif")
          )}
        >
          Short Break
        </button>
        <button
          className="border-2 rounded-full p-3  text-slate-100 border-white focus:text-slate-800 focus:bg-slate-100"
          type="button"
          onClick={() => (
            resetTimer(),
            setDefaultTime(10 * 60 * 1000),
            setMinute(10),
            setGifVid("https://i.gifer.com/8B7.gif")
          )}
        >
          Long Break
        </button>
      </motion.div>
      <motion.div className="focusWatch text-white text-center font-bold font-['Inter'] text-[150px]" initial={{y:-100, opacity:0}}
      animate={{ y: 0,
        opacity: 1,
        transition: {
          duration: 2,
          
          ease: [0.6, -0.05, 0.01, 0.99],
        }}}>
        {/* toString(10) means decimal representation 2 for binary similarly  */}
        {minute < 10 ? "0" + minute.toString(10) : minute.toString()}:
        {second < 10 ? "0" + second.toString(10) : second.toString()}
      </motion.div>
      <motion.div className="focusButtons flex items-center justify-center" initial={{y:-100, opacity:0}}
      animate={{ y: 0,
        opacity: 1,
        transition: {
          duration: 2,
          
          ease: [0.6, -0.05, 0.01, 0.99],
        }}}>
        <button
          onClick={() => (!isTimerRunning ? startTimer() : pauseTimer())}
          className="border-2 mr-5 rounded-full text-slate-100 border-slate-100 focus:text-slate-800 focus:bg-slate-100"
          type="button"
        >
          {!isTimerRunning ? (
            <IconButton Icon={PlayCircleFilledRounded} color="text-slate-400" />
          ) : (
            <IconButton Icon={PauseCircleFilledRounded} color="text-slate-400" />
          )}
        </button>
        <button
          type="button"
          onClick={() => resetTimer()}
          className="rounded-full mr-5 border-2 border-white hover:bg-white"
        >
          <IconButton Icon={RefreshRoundedIcon} color="text-slate-100" />
        </button>
      </motion.div>
      <motion.div className="text-white flex font-semibold m-5 text-center justify-center" initial={{y:-100, opacity:0}}
      animate={{ y: 0,
        opacity: 1,
        transition: {
          duration: 2,
          
          ease: [0.6, -0.05, 0.01, 0.99],
        }}}>
        {/* keeping it divided by 120 because for some reason it is incrementing by 2 each time 
        may be because of more number of instances but clearing interval on useeffect just breaks everything */}
        <span className="text-slate-100 font-semibold text-center text-xl">
          {Math.floor(totalFocusTime.filter((num) => num !== -1)[0] / 120) +
            " min."}{" "}
        </span>
      </motion.div>
    </>
  );
}

export default Timer;
