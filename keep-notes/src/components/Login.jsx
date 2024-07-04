// import { useNavigate } from "react-router-dom"
import { auth } from "../Firebase"
import firebase from 'firebase/compat/app';

function Login() {

  // const navigate = useNavigate();

  // navigate("/notes");


  function handleGoogleAuth() {

    const provider = new firebase.auth.GoogleAuthProvider();
    
    auth.signInWithPopup(provider).then(async (result) => {
      console.log(result.user);
      if(result.user) {
        window.location.href = '/notes';
      }
    })

  }

  return (
    <>
    <div className="loginPage flex justify-center mt-5">
      <button onClick={handleGoogleAuth}  className="rounded-md text-sm hover:bg-blue-800 drop-shadow-xl p-2 text-white bg-blue-500" type="button">Sign In ❤️</button>
    </div>
    </>
  )
}

export default Login