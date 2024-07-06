// import { useNavigate } from "react-router-dom"
import { useEffect } from "react";
import { auth } from "../Firebase";
import firebase from "firebase/compat/app";
import GoogleIcon from '@mui/icons-material/Google';
import IconButton from "./IconButton";

function Login() {
  // const navigate = useNavigate();

  // navigate("/notes");
  useEffect(() => {
    auth.onAuthStateChanged(async (user) => {
      if (user) {
        window.location.href = "/notes";
      }
    });
  }, []);

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
      <div className="loginPage w-screen h-screen flex justify-center items-center mt-5">

        <div className="loginContainer flex-col items-center flex bg-slate-200 drop-shadow-xl  w-1/2 h-1/2">
          <img
            src="https://shorturl.at/sXRcm"
            className="!h-[50px] mr-2 mt-3 drop-shadow-xl ml-3 hover:cursor-pointer object-contain"
            alt=""
          />
          <p className="font-extralight font-['poppins'] text-[40px] p-1">Welcome to </p>
          <p className="font-['poppins'] font-medium text-green-500 text-[20px] ">ZeNotes</p>
          <button
                type="button"
                className="bg-slate-50 font-thin text-sm p-2 flex items-center justify-between drop-shadow-lg mt-5"
                onClick={handleGoogleAuth}
              >
                <p className="mr-1 font-['poppins'] font-light">Sign in with</p>
                 {<GoogleIcon style={{fontSize:"15px"}} className="text-green-500 " />}
                
              </button>
          
        </div>
      </div>
    </>
  );
}

export default Login;
