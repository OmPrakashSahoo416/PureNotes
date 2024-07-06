import { useEffect, useState } from "react";
import Note from "./Note";
import { db } from "../Firebase";

import { useOutletContext } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setIsFocus } from "../states/isFocus/isFocus";

function ReminderRoute() {
  const { userDetails } = useOutletContext();

  const searchText = useSelector((state) => state.searchText.searchText);
  const isListView = useSelector((state) => state.isListView.isListView);
  const dispatch = useDispatch();

  const [note, setNote] = useState([]);

  useEffect(() => {
    {
      userDetails &&
        db
          .collection(userDetails.uid)
          .orderBy("timestamp", "desc")
          .onSnapshot((snap) =>
            setNote(
              snap.docs.map((doc) => ({
                id: doc.id,
                data: doc.data(),
              }))
            )
          );
    }
  }, [userDetails]);

  function handleFocus() {
    dispatch(setIsFocus(false));
  }

  return (
    <>
      {handleFocus()}

      <div
        className={
          (isListView ? "w-full " : " ") +
          "reminderRoute flex w-full m-auto mt-[200px] mb-[200px]"
        }
      >
        <div
          className={
            (isListView ? "min-w-[100%] " : " min-w-[100%] overflow-auto  ") +
            "flex flex-wrap justify-center md:justify-start p-5 gap-y-5"
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
                  key={eachNote.id}
                  docId={eachNote.id}
                  title={eachNote.data.title}
                  textBody={eachNote.data.content}
                  isReminder={eachNote.data.isReminder}
                  imgUrl={eachNote.data.imgUrl}
                  isPinned={eachNote.data.isPinned}
                  tasks={eachNote.data.tasks}
                  canvasUrl={eachNote.data.canvasUrl}
                  userDetails={userDetails}
                />
              )
          )}
        </div>
      </div>
    </>
  );
}
export default ReminderRoute;
