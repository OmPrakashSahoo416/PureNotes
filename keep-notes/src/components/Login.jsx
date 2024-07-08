// import { useNavigate } from "react-router-dom"
import { useEffect } from "react";
import { auth } from "../Firebase";
import firebase from "firebase/compat/app";
import GoogleIcon from "@mui/icons-material/Google";
// import IconButton from "./IconButton";

function Login() {
  // const navigate = useNavigate();

  // navigate("/notes");

  let i = 0;
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
    await sleep(100);
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
      <div className="loginPage bg-slate-100">

        <div className="loginHeader flex items-center sm:justify-start justify-center font-['Inter']  p-5">
            <div className="logo p-2">
              <img src="./public/logo.png" className="h-[40px] rounded-md hover:cursor-pointer  mr-5 sm:ml-[100px]" alt="" />
            </div>
            <p className="text-lg text-slate-600">PureNotes</p>
            
        </div>
        <div className="loginBody sm:flex items-center justify-between p-5 h-[600px] w-full">
          <div className="loginText flex  font-['Inter'] text-[50px] font-extralight p-2   sm:ml-[100px] sm:w-[40%]">
            <div className="w-full flex flex-col items-center sm:block ">
              <p id="loginHeading" className="sm:min-h-[250px] min-h-[450px] text-slate-700"></p> 
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
          <div className="loginImage sm:w-[60%] hidden sm:block ">
            <img src="./public/loginImage.png" className="!h-[750px] object-contain" alt="" />
          </div>
        </div>
        
          
        
      </div>
    </>
  );
}

export default Login;
