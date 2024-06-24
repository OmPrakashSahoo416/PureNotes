import { useState } from "react";
import Header from "./components/Header"
import MainBody from "./components/MainBody"
import SideBar from "./components/SideBar"

function App() {
  const [hidden, setHidden] = useState(true);
  const [isInputActive, setIsInputActive] = useState(false);

  return(
    <>
    <div className="app !h-[100%] bg-gray-700">

      {/* header section   */}
      <Header hidden={hidden} setHidden={setHidden}></Header>

      <div className="appbody !h-[100%] flex ">
        {/* sidebar section  */}
      <SideBar hidden={hidden} setHidden={setHidden}></SideBar>

      {/* app main body with creating notes reminders etc.. and displaying them in a grid  */}
      <MainBody isInputActive={isInputActive} setIsInputActive={setIsInputActive}></MainBody>

      </div>

      
    </div>

    </>
  )
}
export default App