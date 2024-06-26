import { useState } from "react";
import Header from "./components/Header"
import MainBody from "./components/MainBody"
import SideBar from "./components/SideBar"
import PopUpScreen from "./components/PopUpScreen";
import { Outlet } from "react-router-dom";

function App() {
  const [hidden, setHidden] = useState(true);
  const [isInputActive, setIsInputActive] = useState(false);
  const [forcedSideBarDisplay, setForcedSideBarDisplay] = useState(false);
  const [isPopUp, setIsPopUp] = useState(false);
  const [selectedNote, setSelectedNote] = useState({});
  const [isListView, setIsListView] = useState(false);

  return(
    <>
    <div className="app !h-[100%] bg-gradient-to-r from-fuchsia-500 to-cyan-500">
      {/* screen that will appear on click of note to show its zoomed version on fullscreen  */}
    <PopUpScreen selectedNote={selectedNote} setSelectedNote={setSelectedNote} isPopUp={isPopUp} setIsPopUp={setIsPopUp} />

      

      {/* header section   */}
      <Header hidden={hidden} isListView={isListView} setIsListView={setIsListView} forcedSideBarDisplay={forcedSideBarDisplay} setForcedSideBarDisplay={setForcedSideBarDisplay} setHidden={setHidden}></Header>

      <div className="appbody !h-[100%] flex flex-col md:flex-row items-center md:items-start">
        {/* sidebar section  */}
      <SideBar hidden={hidden} setHidden={setHidden} forcedSideBarDisplay={forcedSideBarDisplay}></SideBar>

      {/* app main body with creating notes reminders etc.. and displaying them in a grid  */}
      <MainBody isListView={isListView} setSelectedNote={setSelectedNote} isPopUp={isPopUp} setIsPopUp={setIsPopUp} isInputActive={isInputActive} setIsInputActive={setIsInputActive}></MainBody>
      {/* <Outlet></Outlet> */}

      </div>

      
    </div>

    </>
  )
}
export default App