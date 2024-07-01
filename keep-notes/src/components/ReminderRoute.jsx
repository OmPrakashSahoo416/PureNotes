import { useEffect, useState } from "react";
import Note from "./Note";
import { db } from "../Firebase";

import { useOutletContext } from "react-router-dom";

function ReminderRoute() {
  const { setSelectedNote, isPopUp, setIsPopUp, isListView, searchText } =
    useOutletContext();

  const [note, setNote] = useState([]);

  useEffect(() => {
    db.collection("notes")
      .orderBy("timestamp", "desc")
      .onSnapshot((snap) =>
        setNote(
          snap.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          }))
        )
      );
  }, []);

  return (
    <>
      <div
        className={
          (isListView ? "w-full " : " ") +
          "reminderRoute flex  m-auto mt-[200px] mb-[200px]"
        }
      >
        <div
          className={
            (isListView ? "min-w-[100%] " : "min-w-[25%] overflow-auto  ") +
            "flex flex-wrap justify-center p-5 gap-y-5"
          }
        >
          {note.map(
            (eachNote) =>
              eachNote.data.isReminder &&
              (eachNote.data.title
                .toLowerCase()
                .indexOf(searchText.toLowerCase()) !== -1 ||
                eachNote.data.content
                  .toLowerCase()
                  .indexOf(searchText.toLowerCase()) !== -1) && (
                <Note
                  isListView={isListView}
                  setSelectedNote={setSelectedNote}
                  isPopUp={isPopUp}
                  setIsPopUp={setIsPopUp}
                  key={eachNote.id}
                  docId={eachNote.id}
                  title={eachNote.data.title}
                  textBody={eachNote.data.content}
                  isReminder={eachNote.data.isReminder}
                  imgUrl={eachNote.data.imgUrl}
                  isPinned={eachNote.data.isPinned}
                  tasks={eachNote.data.tasks}
                />
              )
          )}
        </div>
      </div>
    </>
  );
}
export default ReminderRoute;
