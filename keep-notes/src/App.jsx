import { useEffect, useState } from "react";
import Header from "./components/Header";
import SideBar from "./components/SideBar";
import PopUpScreen from "./components/PopUpScreen";
import { Outlet } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { db, auth } from "./Firebase";
import LeaderBoard from "./components/LeaderBoard";
import { motion } from "framer-motion";
import LoadingScreen from "./components/LoadingScreen";
// import LoadingScreen from "./components/LoadingScreen";
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
    {(userDetails === null && <LoadingScreen />)}
      <div className="relative inset-0">
        <motion.div
          className="absolute z-[2000] w-full flex justify-center items-center bg-black"
          initial={{ height: "100vh", top: 0 }}
          animate={{
            height: 0,
            bottom: 0,
            transition: {
              duration: 1.5,
              ease: [0.8, 0, 0.2, 1],
            },
          }}
          exit={{ height: 0, top: 0 }}
        >
          <motion.img
            src="./public/logo.png "
            className="h-[40px] p-2 bg-slate-50  z-[2001]"
            initial={{ opacity: 1 }}
            animate={{
              opacity: 0,
              rotate: 360,
              transition: {
                duration: 1.5,
              },
            }}
          ></motion.img>
        </motion.div>
      </div>

      <div className="app bg-slate-300">
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
      <motion.div
        initial={{ opacity: 0, y: -100 }}
        animate={{
          opacity: 1,
          y: 0,
          transition: {
            duration: 1,
            delay: 1,
          },
        }}
        className={
          location.pathname.startsWith("/notes") ||
          location.pathname.startsWith("/reminder") ||
          location.pathname.startsWith("/focus")
            ? " hidden "
            : "  " +
              "sm:w-[500px] w-[250px]  m-auto h-full text-center mt-20 font-extralight text-[50px] font-['Inter']"
        }
      >
        Welcome to PureNote.
        <p className="font-['Inter'] font-light text-sm ">
          Welcome to PureNote, the ultimate tool for all your note-taking needs.
          Designed with simplicity and functionality in mind, Pure Note offers a
          seamless experience to help you capture, organize, and focus on your
          tasks effortlessly. Whether you are a student, professional, or
          someone who loves to keep things organized, PureNote is here to
          support your productivity journey.
        </p>
        <button
          className="text-sm rounded-full p-2 hover:bg-slate-300 bg-slate-200"
          onClick={() => (window.location.href = "/notes")}
        >
          Get Notes
        </button>
      </motion.div>
    </>
  );
}
export default App;
