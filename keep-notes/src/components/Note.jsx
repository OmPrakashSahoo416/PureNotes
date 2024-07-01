// import ZoomedNote from "./ZoomedNote";
// import firebase from 'firebase/compat/app';

import IconButton from "./IconButton";
import PushPinRoundedIcon from "@mui/icons-material/PushPinRounded";
import { PushPinOutlined } from "@mui/icons-material";
import NotificationAddRoundedIcon from "@mui/icons-material/NotificationAddRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import "firebase/compat/firestore";

import { db } from "../Firebase";
// import firebase from "firebase/compat/app";
import DoneAllRoundedIcon from "@mui/icons-material/DoneAllRounded";

// the notifications library and css file [required]
import { ToastContainer, toast, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useLocation } from "react-router-dom";
import CheckedListItem from "./CheckListItem";
// import CheckList from "./CheckList";
// import { getStorage, ref } from "firebase/storage";
// import { useState } from "react";

function Note({
  title,
  textBody,
  isPopUp,
  setIsPopUp,
  setSelectedNote,
  isListView,
  docId,
  isReminder,
  imgUrl,
  tasks,
  isPinned,
}) {
  const location = useLocation();

  function onSubmitReminderHandler(e) {
    // preventdefault is necessary to avoid a re render which would reset the contents of states
    e.preventDefault();
    !isReminder &&
      db
        .collection("notes")
        .doc(docId)
        .update({
          isReminder: true,
        })
        .catch(console.log("Error updating the value"));

    // BUG:extra reminder remains after adding and it just breaks the code

    !isReminder
      ? toast("Reminder added successfully!", {
          toastId: "suc1",
          position: "bottom-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: false,
          progress: undefined,
          theme: "light",
          transition: Slide,
        })
      : toast("Reminder already added!", {
          toastId: "suc2",
          position: "bottom-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: false,
          progress: undefined,
          theme: "light",
          transition: Slide,
        });
    // setIsReminder(true);
  }
  function onSubmitPinHandler(e) {
    // preventdefault is necessary to avoid a re render which would reset the contents of states
    e.preventDefault();
    if (location.pathname.startsWith("/reminder")) {
      toast("Can't pin/unpin here!", {
        toastId: "suc3",
        position: "bottom-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
        theme: "light",
        transition: Slide,
      });
      return;
    }
    !isPinned &&
      db
        .collection("notes")
        .doc(docId)
        .update({
          isPinned: true,
        })
        .catch(console.log("Error updating the value"));
    isPinned &&
      db
        .collection("notes")
        .doc(docId)
        .update({
          isPinned: false,
        })
        .catch(console.log("Error updating the value"));

    // isPinned = !isPinned;
  }

  function onCloseNoteHandler() {
    if (location.pathname.startsWith("/notes")) {
      db.collection("notes").doc(docId).delete();
    } else {
      db.collection("notes").doc(docId).update({
        isReminder: false,
      });
    }
  }

  return (
    // next implement the on click zoom of note on a pop up screen
    <>
      <div
        draggable
        onClick={() => setIsPopUp(!isPopUp)}
        onDragOver={(e) => e.preventDefault()}
        className={
          (isListView ? "min-w-[100%] " : "min-w-[25%] ") +
          "note  border-[1px] mr-3 bg-amber-100 drop-shadow-xl  border-gray-800 rounded-lg p-4  max-w-[200px] group max-h-[250px] "
        }
      >
        <div
          onClick={() => {
            
            setSelectedNote({
              title: title,
              text: textBody,
              imgUrl: imgUrl,
              docId: docId,
              tasks: tasks,
            });
          }}
          className=" overflow-hidden w-full h-full "
        >
          {/* title of note  */}
          <p className="mb-3 rounded-md outline-none text-lg font-['Calibri'] border-[1px] hover:border-amber-800 font-semibold text-amber-800">
            {title}
          </p>

          {/* paragraph of note  */}
          <p className=" mb-3 leading-9 border-[1px] hover:border-amber-800 rounded-md text-md outline-none font-['Calibri'] text-slate-800">
            {textBody}
          </p>
          {/* tasks list here  */}
          <div className="rounded-md font-semibold border-2 mb-3 border-amber-900 p-3">
            TASKS :
            {tasks.map((eachItem, index) => (
              <CheckedListItem
                key={index}
                listContentVal={tasks.length > 0 ? eachItem.text : ""}
                listCheckedVal={tasks.length > 0 ? eachItem.checked : false}
                isInput={true}
              />
            ))}
          </div>

          {/* image here  */}
          <img src={imgUrl} alt="" className="overflow-auto mb-5" />
        </div>

        <div className="contextMenu">
          {/* pinning button to pin notes on top  */}
          <button
            onClick={(e) => onSubmitPinHandler(e)}
            className={
              (!isPinned ? " bg-fuchsia-600  " : " bg-white ") +
              " absolute top-[100px] group-hover:block md:hidden z-[1100] rounded-full right-1  "
            }
            type="button"
          >
            <IconButton
              Icon={!isPinned ? PushPinRoundedIcon : PushPinOutlined}
              color={"text-black"}
            ></IconButton>
          </button>

          {/* reminder button */}
          <button
            onClick={(e) => onSubmitReminderHandler(e)}
            className={
              (!isReminder ? " bg-blue-600  " : " bg-green-800 ") +
              " absolute top-[50px] group-hover:block md:hidden z-[1100] rounded-full right-1  "
            }
            type="button"
          >
            <IconButton
              Icon={
                !isReminder ? NotificationAddRoundedIcon : DoneAllRoundedIcon
              }
              color={!isReminder ? "text-blue-50" : "text-green-50"}
            ></IconButton>
          </button>

          {/* delete button on top of the note on hover  */}
          {/* db.collection("notes").doc("0BNs1cv3iRzjUJRnY9YU").delete() ==> this thing
                works on deleting a record */}
          <button
            onClick={onCloseNoteHandler}
            type="button"
            className="rounded-full group-hover:block md:hidden absolute top-0 bg-red-500 z-[1100] right-1 text-slate-800"
          >
            <IconButton Icon={CloseRoundedIcon} />
          </button>
        </div>
      </div>
      <ToastContainer
        position="bottom-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover={false}
        theme="light"
        transition:Slide
      />
    </>
  );
}
export default Note;
