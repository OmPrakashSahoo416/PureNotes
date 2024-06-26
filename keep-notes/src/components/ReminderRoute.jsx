import { useEffect, useState } from "react";
import Note from "./Note";
import { db } from "../Firebase";

import { useOutletContext } from 'react-router-dom';

function ReminderRoute() {
    const { setSelectedNote, isPopUp, setIsPopUp, isListView} = useOutletContext();

    const [note, setNote] = useState([]);

    useEffect(() => {
        db.collection("reminders").orderBy("timestamp","desc").onSnapshot((snap) => (
            setNote(snap.docs.map((doc) => (
                {
                    id: doc.id,
                    data: doc.data()
    
                }
            )))
        ))
      },[]);


      

    return(
        <>
        <div className="reminderRoute flex  m-auto mt-[200px] mb-[200px]">
           <div className=" flex flex-wrap justify-center gap-y-5">
          {
            note.map((eachNote) => (
                <Note isListView={isListView} setSelectedNote={setSelectedNote} isPopUp={isPopUp} setIsPopUp={setIsPopUp} key={eachNote.id} docId={eachNote.id} title={eachNote.data.title} textBody={eachNote.data.content} />
            ))
          }
        </div>
        </div>
        </>
    )
}
export default ReminderRoute