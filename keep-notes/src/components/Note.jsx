// import ZoomedNote from "./ZoomedNote";

import IconButton from "./IconButton";
import NotificationAddRoundedIcon from "@mui/icons-material/NotificationAddRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import { db } from "../Firebase";
import firebase from "firebase/compat/app";
// import {NotificationManager} from 'react-notifications';


function Note({
  title,
  textBody,
  isPopUp,
  setIsPopUp,
  setSelectedNote,
  isListView,
  docId,
}) {
  function onSubmitReminderHandler(e) {
    
    

    // preventdefault is necessary to avoid a re render which would reset the contents of states
    e.preventDefault();
    db.collection("reminders").add({
      title: title,
      content: textBody,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });
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
            className="absolute top-14 group-hover:block hidden z-[1100] rounded-full right-1 bg-blue-800"
            type="button"
          >
            <IconButton
              Icon={NotificationAddRoundedIcon}
              color="text-blue-100"
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
    </>
  );
}
export default Note;
