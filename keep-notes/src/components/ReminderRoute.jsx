import { useEffect, useState } from "react";
import Note from "./Note";
import { db } from "../Firebase";

import { useOutletContext } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setIsFocus } from "../states/isFocus/isFocus";
import { motion } from "framer-motion";

import LoadingScreen from "./LoadingScreen";

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
      {(userDetails === null && <LoadingScreen />)}

      <motion.div
        className="absolute z-[2003] w-full flex justify-center items-center bg-black"
        initial={{ height: "100vh", top: 0 }}
        animate={{
          height: 0,
          bottom: 0,
          transition: {
            duration: 1.5,
            ease: [0.8, 0, 0.2, 1],
          },
        }}
      >
        <motion.p
          className="text-slate-100 font-thin font-['Inter'] text-2xl p-2   z-[2001]"
          initial={{ opacity: 1 }}
          animate={{
            opacity: 0,

            transition: {
              duration: 1.5,
            },
          }}
        >
          {" "}
          Reminders
        </motion.p>
      </motion.div>

      <div
        className={
          (isListView ? "w-full " : " ") +
          "reminderRoute flex w-full m-auto mt-[200px] sm:ml-[100px] mb-[200px]"
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
