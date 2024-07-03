import { useEffect, useState } from "react";
import { useLocation, useOutletContext } from "react-router-dom";

import Timer from "./Timer";
import IconButton from "./IconButton";

function FocusMode() {
  const { setIsFocus } = useOutletContext();

  const[isTimerRunning, setIsTimerRunning] = useState(false);
  

  return (
    <>
      {setIsFocus(true)}
      <div className="focusMode overflow-y-auto ">
        <div className="focusContents flex justify-center items-center bg-[url('https://images.unsplash.com/photo-1534274988757-a28bf1a57c17?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')] w-screen fixed h-screen">
          <div className="focusElements border-2 rounded-md border-white p-5 justify-center flex-col h-fit w-fit">
            



            
                <Timer setIsTimerRunning={setIsTimerRunning}  isTimerRunning={isTimerRunning}  />




            
          </div>
        </div>
      </div>
    </>
  );
}

export default FocusMode;
