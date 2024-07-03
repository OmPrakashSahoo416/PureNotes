import { useEffect, useState } from "react";
import { useLocation, useOutletContext } from "react-router-dom";
import RefreshRoundedIcon from "@mui/icons-material/RefreshRounded";
import SettingsRoundedIcon from "@mui/icons-material/SettingsRounded";
import Timer from "./Timer";
import IconButton from "./IconButton";

function FocusMode() {
  const { setIsFocus,hour, setHour, minute,setMinute,second,setSecond } = useOutletContext();

  const[isTimerRunning, setIsTimerRunning] = useState(false);
  const[defaultTime, setDefaultTime] = useState();

  return (
    <>
      {setIsFocus(true)}
      <div className="focusMode overflow-y-auto ">
        <div className="focusContents flex justify-center items-center bg-[url('https://images.unsplash.com/photo-1534274988757-a28bf1a57c17?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')] w-screen fixed h-screen">
          <div className="focusElements border-2 rounded-md border-white p-5 justify-center flex-col h-fit w-fit">
            <div className="focusTypes flex  justify-evenly items-center">
              <button
                className="border-2 mr-5 rounded-full p-3 text-white border-white hover:bg-white hover:text-slate-800"
                type="button"
              >
                Pomodoro
              </button>
              <button
                className="border-2 mr-5 rounded-full p-3 text-white border-white hover:bg-white hover:text-slate-800"
                type="button"
              >
                Short Break
              </button>
              <button
                className="border-2 rounded-full p-3 text-white border-white hover:bg-white hover:text-slate-800"
                type="button"
              >
                Long Break
              </button>
            </div>



            <div className="focusWatch text-white text-center font-bold font-['Calibri'] text-[150px]">

                {/* toString(10) means decimal representation 2 for binary similarly  */}
                <Timer defaultTime={defaultTime} setDefaultTime={setDefaultTime} isTimerRunning={isTimerRunning} setSecond={setSecond} second={second} setHour={ setHour} hour={hour} setMinute={ setMinute} minute={minute} />
              {hour < 10 ? "0" + hour.toString(10):hour.toString() }:{minute < 10 ? "0" + minute.toString(10):minute.toString() }:{second < 10 ? "0" + second.toString(10):second.toString() }
            </div>




            <div className="focusButtons flex items-center justify-center">
              <button
              onClick={() => setIsTimerRunning(!isTimerRunning)}
                className="border-2 mr-5 rounded-full p-3 text-white border-white hover:bg-white hover:text-slate-800"
                type="button"
              >
                ▶
              </button>
              <button
                type="button"
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
          </div>
        </div>
      </div>
    </>
  );
}

export default FocusMode;
