// import { useNavigate } from "react-router-dom"
import { useEffect } from "react";
import { auth } from "../Firebase";
import firebase from "firebase/compat/app";
import GoogleIcon from "@mui/icons-material/Google";

import { motion } from "framer-motion";
// import LoadingScreen from "./LoadingScreen";
// import IconButton from "./IconButton";

function Login() {
  // const navigate = useNavigate();

  // navigate("/notes");


let j = 0;
let currentWord = "";
let isDeleting = false;

// let textGenerated = "";

function sleep(time) {
  return new Promise((resolve) => setTimeout(resolve, time));
}


async function type() {
  currentWord = "The comprehensive notes tool you've been searching for.";

  while(true) {

    if (isDeleting) {
      document.getElementById("loginHeading").textContent = currentWord.substring(0, 0);
      // j--;
      j = 0;
      if (j == 0) {
        isDeleting = false;
        
      }
    } else {
      document.getElementById("loginHeading").textContent = currentWord.substring(0, j+1);
      j++;
      if (j == currentWord.length) {
        isDeleting = true;
      }
    }
    await sleep(300);
    
    // console.log(textGenerated);
  }
  
  
}

// setInterval(type(), 200);

//   console.log(textGenerated);



  
  useEffect(() => {
    auth.onAuthStateChanged(async (user) => {
      if (user) {
        window.location.href = "/notes";
      }
    });
    type();
    
  }, []);

  // useEffect(() => {
  //   const interval = 

  //   // clearInterval(interval);
  // })

  function handleGoogleAuth() {
    const provider = new firebase.auth.GoogleAuthProvider();

    auth.signInWithPopup(provider).then(async (result) => {
      console.log(result.user);
      if (result.user) {
        window.location.href = "/notes";
      } 
    });
  }

  return (
    <>
      <div className="loginPage h-screen bg-slate-100">

        <div className="loginHeader flex items-center sm:justify-start justify-center font-['Inter']  p-5">
            <div className="logo p-2">
              <img src="https://firebasestorage.googleapis.com/v0/b/notes-app-185ca.appspot.com/o/images%2Flogo.png?alt=media&token=7e697867-3a7e-463c-87bd-39474b903026" className="h-[40px] rounded-md hover:cursor-pointer  mr-5 sm:ml-[100px]" alt="" />
            </div>
            <p className="text-lg text-slate-600">PureNotes</p>
            
        </div>
        <div className="loginBody sm:flex items-center justify-between p-5 h-[600px] w-full">
          <div className="loginText flex  font-['Inter'] text-[50px] font-extralight p-2   sm:ml-[100px] sm:w-[40%]">
            <div className="w-full flex flex-col items-center sm:block ">


              <motion.p id="loginHeading" className="sm:min-h-[250px] min-h-[450px] text-slate-700"
                initial={{opacity:0}}
                animate={{opacity:1, transition:{
                  duration:0.5
                }}}
              
              
              
              ></motion.p> 


            <button
            type="button"
            className="bg-slate-100 rounded-md  text-sm p-3 flex items-center justify-between hover:drop-shadow-md border border-slate-200 drop-shadow-sm mt-10"
            onClick={handleGoogleAuth}
          >
            <p className="mr-1 font-['Inter']  text-sm font-medium text-slate-700">Sign in with</p>
            {
              <GoogleIcon
                style={{ fontSize: "25px" }}
                className="text-red-500 "
              />
            }
          </button>
            
            </div>
          </div>
          <motion.div
          initial={{y:[0, 20, 0]}}
          animate={{y:[20,0, 20]}}
          
          transition={{duration: 3, ease:"linear", repeat:Infinity}}
           className="loginImage sm:w-[60%] hidden sm:block ">
            <img src="https://firebasestorage.googleapis.com/v0/b/notes-app-185ca.appspot.com/o/images%2FloginImage.png?alt=media&token=00a09ead-d578-4af8-85c6-8e7afd5afaeb" className="!h-[750px] object-contain" alt="" />
          </motion.div>
        </div>
        
          
        
      </div>

      <div className="fixed text-center text-[10px] bottom-0 w-full p-1 z-[4000]  text-slate-600 font-['Inter']">

        <footer>PureNotes: Simplifying your thoughts, one note at a time.     Made with love ❤️
             Contact: <a  href="mailto: omprakashsahoo1234@gmail.com">omprakashsahoo1234@gmail.com</a> </footer>
      </div>
    </>
  );
}

export default Login;
