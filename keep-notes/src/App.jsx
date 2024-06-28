import { useState } from "react";
import Header from "./components/Header";
import SideBar from "./components/SideBar";
import PopUpScreen from "./components/PopUpScreen";
import { Outlet } from "react-router-dom";
import { useLocation } from "react-router-dom";

function App() {
  // this location helps to track the re routing
  const location = useLocation();
  // console.log(location);

  // the state variables

  const [hidden, setHidden] = useState(true);
  const [isInputActive, setIsInputActive] = useState(false);
  const [forcedSideBarDisplay, setForcedSideBarDisplay] = useState(false);
  const [isPopUp, setIsPopUp] = useState(false);
  const [selectedNote, setSelectedNote] = useState({});
  const [isListView, setIsListView] = useState(false);
  const [searchText, setSearchText] = useState("");

  return (
    <>
      <div className="app bg-gradient-to-r from-fuchsia-500 via-cyan-400 to-cyan-500">
        {/* screen that will appear on click of note to show its zoomed version on fullscreen  */}
        <PopUpScreen
          selectedNote={selectedNote}
          setSelectedNote={setSelectedNote}
          isPopUp={isPopUp}
          setIsPopUp={setIsPopUp}
        />

        {/* header section   */}
        <Header
          searchText={searchText}
          setSearchText={setSearchText}
          hidden={hidden}
          isListView={isListView}
          setIsListView={setIsListView}
          forcedSideBarDisplay={forcedSideBarDisplay}
          setForcedSideBarDisplay={setForcedSideBarDisplay}
          setHidden={setHidden}
        ></Header>

        <div className="appbody !h-[100%] flex flex-col md:flex-row items-center md:items-start">
          {/* sidebar section  */}
          <SideBar
            hidden={hidden}
            setHidden={setHidden}
            forcedSideBarDisplay={forcedSideBarDisplay}
          ></SideBar>

          {/* app main body with creating notes reminders etc.. and displaying them in a grid  */}

          {/* added logic to show certain page on condition of routing  */}
          {location.pathname.startsWith("/notes") && (
            <Outlet
              context={{
                isInputActive,
                setSelectedNote,
                setIsInputActive,
                isPopUp,
                setIsPopUp,
                isListView,
                searchText,
              }}
            ></Outlet>
          )}

          {location.pathname.startsWith("/reminder") && (
            <Outlet
              context={{
                setSelectedNote,
                isPopUp,
                setIsPopUp,
                isListView,
                searchText,
              }}
            ></Outlet>
          )}
        </div>
      </div>
    </>
  );
}
export default App;
