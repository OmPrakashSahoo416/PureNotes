import { useState } from "react";
import { useOutletContext } from "react-router-dom";

import Timer from "./Timer";
import IconButton from "./IconButton";
import { FullscreenRounded } from "@mui/icons-material";
// import IconButton from "./IconButton";

function FocusMode() {
  
  const { setIsFocus,userDetails, } = useOutletContext();

  const [isTimerRunning, setIsTimerRunning] = useState(false);

  const [gifVid, setGifVid] = useState("https://i.gifer.com/61I.gif");

  return (
    <>
      {setIsFocus(true)}
      <div className="focusMode overflow-y-auto ">
        <div
          style={{ backgroundImage: `url(${gifVid})` }}
          className={
            "focusContents flex justify-center items-center  bg-no-repeat bg-cover w-screen fixed h-screen "
          }
        >
          <div className="focusElement p-5 justify-center flex-col h-fit w-fit">
            <Timer
              setGifVid={setGifVid}
              setIsTimerRunning={setIsTimerRunning}
              isTimerRunning={isTimerRunning}
              userDetails={userDetails}
            />
          </div>
        </div>
        <div className="fullScreenBtn text-slate-800 rounded-md fixed bottom-10 right-10">
          <button
            onClick={() =>
              !document.fullscreenElement
                ? document.documentElement.requestFullscreen()
                : document.exitFullscreen()
            }
            type="button"
          >
            <IconButton Icon={FullscreenRounded} color="white" /> :
          </button>
        </div>
      </div>
    </>
  );
}

export default FocusMode;
