import { useEffect, useState } from "react";
import Header from "./components/Header";
import SideBar from "./components/SideBar";
import PopUpScreen from "./components/PopUpScreen";
import { Outlet } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { db, auth } from "./Firebase";
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

  const [listContent, setListContent] = useState("Add your label ...");
  const [listChecked, setListChecked] = useState(false);

  // states for the timer

  return (
    <>
      <div className="app bg-gradient-to-r from-fuchsia-500 via-cyan-400 to-cyan-500">
        {/* screen that will appear on click of note to show its zoomed version on fullscreen  */}
        <PopUpScreen
          setListContent={setListContent}
          setListChecked={setListChecked}
          userDetails={userDetails}
        />

        <LeaderBoard />

        {/* header section   */}
        <Header userDetails={userDetails}></Header>

        {location.pathname.startsWith("/focus") && (
          <Outlet
            context={{
              userDetails,
            }}
          ></Outlet>
        )}

        <div className="appbody !h-[100%] flex flex-col md:flex-row items-center md:items-start">
          {/* sidebar section  */}
          <SideBar></SideBar>

          {/* app main body with creating notes reminders etc.. and displaying them in a grid  */}

          {/* added logic to show certain page on condition of routing  */}
          {location.pathname.startsWith("/notes") && (
            <Outlet
              context={{
                listContent,
                setListContent,
                listChecked,
                setListChecked,

                userDetails,
              }}
            ></Outlet>
          )}

          {location.pathname.startsWith("/reminder") && (
            <Outlet
              context={{
                userDetails,
              }}
            ></Outlet>
          )}
        </div>
      </div>
    </>
  );
}
export default App;
