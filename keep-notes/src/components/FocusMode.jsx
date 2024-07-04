import {  useState } from "react";
import {  useOutletContext } from "react-router-dom";

import Timer from "./Timer";
import IconButton from "./IconButton";
import { FullscreenRounded } from "@mui/icons-material";
// import IconButton from "./IconButton";

function FocusMode() {
  const { setIsFocus } = useOutletContext();

  const[isTimerRunning, setIsTimerRunning] = useState(false);
  

  return (
    <>
      {setIsFocus(true)}
      <div className="focusMode overflow-y-auto ">
        <div className="focusContents flex justify-center items-center bg-[url('https://i.gifer.com/8B7.gif')] bg-no-repeat bg-cover w-screen fixed h-screen">
          <div className="focusElement p-5 justify-center flex-col h-fit w-fit">
            



            
                <Timer setIsTimerRunning={setIsTimerRunning}  isTimerRunning={isTimerRunning}  />




            
          </div>
        </div>
        <div className="fullScreenBtn text-slate-800 rounded-md fixed bottom-10 right-10">
          
          <button onClick = {() => !document.fullscreenElement ?  document.documentElement.requestFullscreen(): document.exitFullscreen()} type="button">

          
          <IconButton Icon={FullscreenRounded} color="white" /> :
          </button>
          
        </div>
      </div>
    </>
  );
}

export default FocusMode;
