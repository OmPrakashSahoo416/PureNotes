import { useState } from "react";
import { useOutletContext } from "react-router-dom";

import Timer from "./Timer";
import IconButton from "./IconButton";
import { FullscreenRounded } from "@mui/icons-material";
import { useDispatch } from "react-redux";
import { setIsFocus } from "../states/isFocus/isFocus";
import { motion } from "framer-motion";
// import IconButton from "./IconButton";

function FocusMode() {
  const { userDetails } = useOutletContext();

  const dispatch = useDispatch();

  const [isTimerRunning, setIsTimerRunning] = useState(false);

  const [gifVid, setGifVid] = useState("https://i.gifer.com/61I.gif");

  function handleFocus() {
    dispatch(setIsFocus(true));
  }

  return (
    <>
      {handleFocus()}
      <motion.div
        className="relative z-[2002] w-full flex justify-center items-center bg-black"
        initial={{height:"100vh", top:0}}
        animate={{height:0, bottom:0,
          transition: {
            duration: 1.5,
            ease: [0.80, 0, 0.20, 1],
          }}}
          
          >
	      
      <motion.p
                
                className="text-slate-100 font-thin font-['Inter'] text-2xl p-2   z-[2001]"
                initial= {
                  {opacity:1}
                }
                animate= {
                  {opacity: 0,
                    
                  transition: {
                    duration: 1.5,
                    
                  }}
                }
                
      > Entering Focus Mode
      </motion.p>      
      </motion.div>
      <motion.div className="focusMode overflow-y-auto ">
        <div
          style={{ backgroundImage: `url(${gifVid})` }}
          className={
            "focusContents overflow-auto bg-center flex justify-center items-center  bg-no-repeat bg-cover w-screen fixed h-screen "
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
        <div className="fullScreenBtn  rounded-md fixed bottom-10 right-10">
          <button
            onClick={() =>
              !document.fullscreenElement
                ? document.documentElement.requestFullscreen()
                : document.exitFullscreen()
            }
            type="button"
          >
            <IconButton Icon={FullscreenRounded} color="text-slate-100" /> :
          </button>
        </div>
      </motion.div>
    </>
  );
}

export default FocusMode;
