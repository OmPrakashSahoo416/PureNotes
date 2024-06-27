// import ZoomedNote from "./ZoomedNote";
import firebase from 'firebase/compat/app';

import IconButton from "./IconButton";
import NotificationAddRoundedIcon from "@mui/icons-material/NotificationAddRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import "firebase/compat/firestore";

import { db } from "../Firebase";
// import firebase from "firebase/compat/app";
import DoneAllRoundedIcon from "@mui/icons-material/DoneAllRounded";

// the notifications library and css file [required]
// import { ToastContainer, toast, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import { useState } from "react";

// const getField = async (docId) => {
//   const docRef = db.collection("notes").doc(docId);
//   const doc = await docRef.get();
//   const isReminder = await doc.data().isReminder; 
//   return isReminder;
// };


function Note({
  title,
  textBody,
  isPopUp,
  setIsPopUp,
  setSelectedNote,
  isListView,
  docId,
  isReminder
  
}) {

  

  function onSubmitReminderHandler(e) {
    // preventdefault is necessary to avoid a re render which would reset the contents of states
    e.preventDefault();
    (!isReminder &&
    db.collection("notes")
      .doc(docId)
      .update({
        isReminder: true,
      })
      .catch(console.log("Error updating the value")));

    // toast.success("Reminder added successfully!", {
    //   position: "bottom-right",
    //   autoClose: 3000,
    //   hideProgressBar: false,
    //   closeOnClick: true,
    //   pauseOnHover: false,
    //   draggable: true,
    //   progress: undefined,
    //   theme: "light",
    //   transition: Slide,
    // });
    // setIsReminder(true);
  }

  return (
    // next implement the on click zoom of note on a pop up screen
    <>
      <div
        draggable
        className={
          (isListView ? "min-w-[100%] " : "min-w-[25%] ") +
          "note  border-[1px] mr-3 bg-amber-100 drop-shadow-xl  border-gray-800 rounded-lg p-4 max-w-[200px] group max-h-[250px] "
        }
      >
        <div
          onClick={() => {
            setIsPopUp(!isPopUp);
            setSelectedNote({ title: title, text: textBody });
          }}
          className=" overflow-hidden w-full h-full "
        >
          <p className="mb-3 outline-none text-lg font-['Calibri'] font-semibold text-amber-800">
            {title}
          </p>
          <p className="h-[90%] leading-9 text-md outline-none font-['Calibri'] text-slate-800">
            {textBody}
          </p>
        </div>

        <div className="contextMenu">
          {/* reminder button  */}
          <button
            onClick={(e) => onSubmitReminderHandler(e)}
            className={(!isReminder ?  " bg-blue-600  ": " bg-green-800 ") +  " absolute top-14 group-hover:block hidden z-[1100] rounded-full right-1  "}
            type="button"
          >
            <IconButton
              Icon={
                !isReminder
                  ? NotificationAddRoundedIcon
                  : DoneAllRoundedIcon
              }
              color={!isReminder?"text-blue-50" : "text-green-50"}
            ></IconButton>
          </button>

          {/* delete button on top of the note on hover  */}
          {/* db.collection("notes").doc("0BNs1cv3iRzjUJRnY9YU").delete() ==> this thing
                works on deleting a record */}
          <button
            onClick={() => db.collection("notes").doc(docId).delete()}
            type="button"
            className="rounded-full group-hover:block hidden absolute top-1 bg-red-500 z-[1100] right-1 text-slate-800"
          >
            <IconButton Icon={CloseRoundedIcon} />
          </button>
        </div>
      </div>
      {/* <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover={false}
        theme="light"
        transition:Slide
      /> */}
    </>
  );
}
export default Note;
