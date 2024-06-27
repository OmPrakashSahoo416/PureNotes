import { useEffect, useState } from "react";
import Note from "./Note";
import { db } from "../Firebase";
import firebase from "firebase/compat/app";
import { useOutletContext } from 'react-router-dom';
// import { Outlet } from "react-router-dom";

function MainBody() {

  const { isInputActive, setSelectedNote, setIsInputActive, isPopUp,isReminder, setIsReminder, setIsPopUp, isListView} = useOutletContext();

  const [note, setNote] = useState([]);
  const [newTitle, setNewTitle] = useState("");
  const [inpTextNote, setInpTextNote] = useState("");

  useEffect(() => {
    db.collection("notes").orderBy("timestamp","desc").onSnapshot((snap) => (
        setNote(snap.docs.map((doc) => (
            {
                id: doc.id,
                data: doc.data()

            }
        )))
    ))
  },[]);

  

  function onSubmitNoteHandler(e) {
    // preventdefault is necessary to avoid a re render which would reset the contents of states
    e.preventDefault();

    db.collection("notes").add({
      title: newTitle,
      content: inpTextNote,
      isReminder: false,
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    });
    // const updatedNote = [...note,{title:newTitle,inpText:inpTextNote}] === previous code ===
    // setNote(updatedNote);
    onCloseNoteHandler(e);
  }

  function onCloseNoteHandler(e) {
    setIsInputActive(!isInputActive);
    e.preventDefault();

    // resetting the note contents on close
    setNewTitle("");
    setInpTextNote("");
  }

  return (
    <>
      <div className="mainBody rounded-md flex justify-center flex-col  w-full mr-2 ml-2 p-5 ">
        <div className="mainBodyInp rounded-md flex justify-center flex-col items-center  w-full mb-16 ">
          <div className="noteCreater drop-shadow-lg w-[50%] rounded-md mt-24 md:mt-0  bg-gradient-to-r from-amber-200 to-yellow-400 p-3 mb-16 ">
            <form action="" className="w-[100%] z-[950]">
              {!isInputActive ? (
                <input
                  onClick={() => setIsInputActive(!isInputActive)}
                  type="text"
                  className="w-[100%] outline-none bg-gradient-to-r from-amber-200 to-yellow-400 text-amber-900 placeholder:text-amber-900 "
                  placeholder="Take a note ..."
                  name=""
                  id=""
                />
              ) : (
                <div className="max-w-full ">
                  {/* enter title  */}
                  <input
                    onChange={(e) => setNewTitle(e.target.value)}
                    type="text"
                    placeholder="Title"
                    value={newTitle}
                    className="w-[100%] mb-3 outline-none text-lg font-semibold bg-gradient-to-r from-amber-200 to-yellow-400 placeholder:text-amber-900 text-amber-900"
                    name=""
                    id=""
                  />

                  

                  <input
                    onChange={(e) => setInpTextNote(e.target.value)}
                    type="text"
                    placeholder="Take a note ..."
                    className="w-[100%] mb-5 text-sm outline-none bg-gradient-to-r from-amber-200 to-yellow-400 placeholder:text-amber-900 text-amber-900"
                    name=""
                    id=""
                    value={inpTextNote}
                  />

                  {/* submit note  */}
                  <div className="flex justify-center">
                    <button
                      type="submit"
                      onClick={onSubmitNoteHandler}
                      className="w-[50%] mr-5 p-2 rounded-md hover:bg-green-600 hover:text-slate-100 bg-slate-100"
                    >
                      Submit
                    </button>
                    <button
                      onClick={onCloseNoteHandler}
                      type="button"
                      className="w-[50%] p-2 rounded-md hover:bg-red-600 hover:text-slate-100 bg-slate-100"
                    >
                      Close
                    </button>
                  </div>
                </div>
              )}
            </form>
          </div>
        </div>
        

        {/* may be using display grid will be a better option here to try  */}
        <div className="notesList flex mb-[200px] flex-wrap lg:justify-start justify-center gap-y-5">
          {
            note.map((eachNote) => (
                <Note isListView={isListView} setSelectedNote={setSelectedNote} isPopUp={isPopUp} setIsPopUp={setIsPopUp} key={eachNote.id} docId={eachNote.id} isReminder={eachNote.data.isReminder} title={eachNote.data.title} textBody={eachNote.data.content} />
            ))
          }
        </div>
      </div>
    </>
  );
}

export default MainBody;
