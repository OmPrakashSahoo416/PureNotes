// import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
// import IconButton from "./IconButton"
// import Note from "./Note"
import ZoomedNote from "./ZoomedNote";
import { setSelectedNote } from "../states/selectedNote/selectedNote";
import { useDispatch, useSelector } from "react-redux";
import { setIsPopUp } from "../store/isPopUp/isPopUp";

// import { motion } from "framer-motion";
// import { db } from "../Firebase";

// bg-gradient-to-r from-teal-400 to-yellow-200 ==> crazy color scheme ...

function PopUpScreen({ setListContent, setListChecked, userDetails }) {
  const dispatch = useDispatch();
  const selectedNote = useSelector((state) => state.selectedNote.selectedNote);
  const isPopUp = useSelector((state) => state.isPopUp.isPopUp);

  return (
    <>
      <div
        className={
          (isPopUp === false && "hidden ") +
          "popUpScreen bg-opacity-80  bg-slate-700 flex items-center justify-center fixed top-0 inset-0 z-[1100] h-[100vh]"
        }

        
      >
        <div className="w-[600px] drop-shadow-2xl flex group items-center rounded-lg flex-col p-5 justify-between h-[600px] bg-slate-200 z-[1000]"
        
        
        
        
        >
          {/* change this to one which is clicked on main page to show !!! TODO  */}

          <div className="w-full overflow-auto h-full">
            <ZoomedNote
              title={selectedNote.title}
              textBody={selectedNote.text}
              imgUrl={selectedNote.imgUrl}
              docId={selectedNote.docId}
              tasks={selectedNote.tasks}
              setListContent={setListContent}
              setListChecked={setListChecked}
              canvasUrl={selectedNote.canvasUrl}
              userDetails={userDetails}
            />
          </div>

          <button
            onClick={() => {
              dispatch(setIsPopUp());
              dispatch(setSelectedNote({}));
              setListContent("Add your label ...");
              setListChecked(false);
            }}
            type="button"
            className=" block sm:hidden group-hover:block  absolute bottom-0 p-4 w-full bg-red-600 text-slate-100 rounded-b-lg"
          >
            Close
          </button>
      </div>
        </div>
    </>
  );
}

export default PopUpScreen;
