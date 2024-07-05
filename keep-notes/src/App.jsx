import { useEffect, useState } from "react";
import Header from "./components/Header";
import SideBar from "./components/SideBar";
import PopUpScreen from "./components/PopUpScreen";
import { Outlet } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { db,auth } from "./Firebase";
import LeaderBoard from "./components/LeaderBoard";
// import { getAuth } from 'firebase/auth';

function App() {
  const [userDetails, setUserDetails] = useState(null);

  // userDetails &&
  // auth()
  // .getUser(userDetails.uid)
  // .then((userRecord) => {
  //   // See the UserRecord reference doc for the contents of userRecord.
  //   console.log(userRecord);
  // })
  // .catch((error) => {
  //   console.log('Error fetching user data:', error);
  // });


  // function leaderBoardStats() {
  //   db.collection("focus").onSnapshot((snap) =>
      
  //       snap.docs.map((doc) => {
  //         let id = doc.id;
  //         let focusTime = doc.data().focusTime;
          
  //       })
    
  // )
  // }

   function fetchUserData() {
     auth.onAuthStateChanged(async (user) => {
      if (!user) {
        window.location.href = "/login";
      } else {
        if (auth.currentUser) {
          setUserDetails(user);
          console.log(user);
          const userRef = db.collection("focus").doc(user.uid);
          const docExists = await userRef.get();
          if (!docExists.exists) {
            await userRef.set({
              focusTime: 0,
              name: user.displayName,
              profilePic: user.photoURL,
            });
          }
          
        }
      }
    });

    //  window.location.href = "/notes";
  }



  useEffect(() => {
    fetchUserData();
  }, [userDetails]);

  // const navigate = useNavigate();
  // navigate('/notes');
  // this location helps to track the re routing
  const location = useLocation();
  // console.log(location);

  // the state variables

  const [hidden, setHidden] = useState(true);
  const [isInputActive, setIsInputActive] = useState(false);
  const [isPopUp, setIsPopUp] = useState(false);
  const [selectedNote, setSelectedNote] = useState({});
  const [isListView, setIsListView] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [listContent, setListContent] = useState("Add your label ...");
  const [listChecked, setListChecked] = useState(false);
  const [indexMaxCount, setIndexMaxCount] = useState(0);
  const [isFocus, setIsFocus] = useState(false);
  const [showLeaderboard, setShowLeaderboard] = useState(false);

  // states for the timer

  return (
    <>
      <div className="app bg-gradient-to-r from-fuchsia-500 via-cyan-400 to-cyan-500">
        {/* screen that will appear on click of note to show its zoomed version on fullscreen  */}
        <PopUpScreen
          selectedNote={selectedNote}
          setSelectedNote={setSelectedNote}
          isPopUp={isPopUp}
          setIsPopUp={setIsPopUp}
          setListContent={setListContent}
          setListChecked={setListChecked}
          userDetails={userDetails}
        />

        <LeaderBoard showLeaderboard={showLeaderboard} setShowLeaderboard={setShowLeaderboard} />

        {/* header section   */}
        <Header
          searchText={searchText}
          setSearchText={setSearchText}
          isListView={isListView}
          setIsListView={setIsListView}
          isFocus={isFocus}
          userDetails={userDetails}
          setShowLeaderboard={setShowLeaderboard}
          showLeaderboard={showLeaderboard}
        ></Header>

        {location.pathname.startsWith("/focus") && (
          <Outlet
            context={{
              setIsFocus,
              userDetails,
            }}
          ></Outlet>
        )}

        <div className="appbody !h-[100%] flex flex-col md:flex-row items-center md:items-start">
          {/* sidebar section  */}
          <SideBar hidden={hidden} setHidden={setHidden}></SideBar>

          {/* app main body with creating notes reminders etc.. and displaying them in a grid  */}

          {/* added logic to show certain page on condition of routing  */}
          {location.pathname.startsWith("/notes") && (
            <Outlet
              context={{
                isInputActive,
                listContent,
                setListContent,
                listChecked,
                setListChecked,
                indexMaxCount,
                setIndexMaxCount,
                userDetails,
                setSelectedNote,
                setIsInputActive,
                isPopUp,
                setIsPopUp,
                isListView,
                searchText,
                setIsFocus,
              }}
            ></Outlet>
          )}

          {location.pathname.startsWith("/reminder") && (
            <Outlet
              context={{
                setSelectedNote,
                userDetails,
                isPopUp,
                setIsPopUp,
                isListView,
                searchText,
                setIsFocus,
              }}
            ></Outlet>
          )}
          
        </div>
        
      </div>
    </>
  );
}
export default App;
