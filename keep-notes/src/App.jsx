import { useState } from "react";
import Header from "./components/Header"
import MainBody from "./components/MainBody"
import SideBar from "./components/SideBar"
import PopUpScreen from "./components/PopUpScreen";

function App() {
  const [hidden, setHidden] = useState(true);
  const [isInputActive, setIsInputActive] = useState(false);
  const [forcedSideBarDisplay, setForcedSideBarDisplay] = useState(false);
  const [isPopUp, setIsPopUp] = useState(false);

  return(
    <>
    <PopUpScreen isPopUp={isPopUp} setIsPopUp={setIsPopUp} />
    <div className="app !h-[100%] bg-amber-100">

      

      {/* header section   */}
      <Header hidden={hidden} forcedSideBarDisplay={forcedSideBarDisplay} setForcedSideBarDisplay={setForcedSideBarDisplay} setHidden={setHidden}></Header>

      <div className="appbody !h-[100%] flex ">
        {/* sidebar section  */}
      <SideBar hidden={hidden} setHidden={setHidden} forcedSideBarDisplay={forcedSideBarDisplay}></SideBar>

      {/* app main body with creating notes reminders etc.. and displaying them in a grid  */}
      <MainBody isPopUp={isPopUp} setIsPopUp={setIsPopUp} isInputActive={isInputActive} setIsInputActive={setIsInputActive}></MainBody>

      </div>

      
    </div>

    </>
  )
}
export default App