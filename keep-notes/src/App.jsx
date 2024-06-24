import { useState } from "react";
import Header from "./components/Header"
import MainBody from "./components/MainBody"
import SideBar from "./components/SideBar"

function App() {
  const [hidden, setHidden] = useState(true);

  return(
    <>
    <div className="app !h-[500px] bg-gray-700">

      {/* header section   */}
      <Header hidden={hidden} setHidden={setHidden}></Header>

      <div className="appbody flex ">
        {/* sidebar section  */}
      <SideBar hidden={hidden} setHidden={setHidden}></SideBar>

      {/* app main body with creating notes reminders etc.. and displaying them in a grid  */}
      <MainBody></MainBody>

      </div>

      
    </div>

    </>
  )
}
export default App