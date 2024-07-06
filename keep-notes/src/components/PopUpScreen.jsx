// import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
// import IconButton from "./IconButton"
// import Note from "./Note"
import IconButton from "./IconButton";
import ZoomedNote from "./ZoomedNote";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import { setSelectedNote } from "../states/selectedNote/selectedNote";
import { useDispatch, useSelector } from "react-redux";
// import { db } from "../Firebase";

// bg-gradient-to-r from-teal-400 to-yellow-200 ==> crazy color scheme ...

function PopUpScreen({ isPopUp, setIsPopUp, setListContent, setListChecked, userDetails
}) {

  const dispatch = useDispatch();
  const selectedNote = useSelector((state) => state.selectedNote.selectedNote);

  return (
    <>
      <div
        className={
          (!isPopUp && "hidden ") +
          "popUpScreen bg-opacity-80  bg-slate-800 flex items-center justify-center fixed top-0 inset-0 z-[1100] h-[100vh]"
        }
      >
        <div className="w-[600px] drop-shadow-2xl flex group items-center rounded-lg flex-col p-5 justify-between h-[600px] bg-slate-100 z-[1000]">
          {/* change this to one which is clicked on main page to show !!! TODO  */}

          <div className="w-full overflow-auto h-full">
            <ZoomedNote
              title={selectedNote.title}
              textBody={selectedNote.text}
              imgUrl={selectedNote.imgUrl}
              docId={selectedNote.docId}
              tasks={selectedNote.tasks}
              isPopUp={isPopUp}
              setListContent={setListContent}
              setListChecked={setListChecked}
              canvasUrl={selectedNote.canvasUrl}
              userDetails ={userDetails}
              
            />
          </div>

          <button
            onClick={() => {
              setIsPopUp(!isPopUp);
              dispatch(setSelectedNote({}));
              setListContent("Add your label ...");
              setListChecked(false);
              
            }}
            type="button"
            className="rounded-full group-hover:block md:hidden absolute top-[-25px] m-auto bg-red-600 text-slate-800  hover:text-slate-100 border-red-600 border-2"
          >
            <IconButton Icon={CloseRoundedIcon} />
          </button>
        </div>
      </div>
    </>
  );
}

export default PopUpScreen;
