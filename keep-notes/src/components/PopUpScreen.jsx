// import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
// import IconButton from "./IconButton"
// import Note from "./Note"
import IconButton from "./IconButton";
import ZoomedNote from "./ZoomedNote"
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
// import { db } from "../Firebase";





function PopUpScreen({isPopUp, setIsPopUp, setSelectedNote, selectedNote}) {

    


    
    return(
        <>
        <div className={(!isPopUp && "hidden ") + "popUpScreen  bg-gradient-to-r from-teal-400 to-yellow-200 flex items-center justify-center fixed top-0 inset-0 z-[1100] h-[100vh]"}>

            <div className="w-[500px] drop-shadow-2xl flex group items-center rounded-lg flex-col p-5 justify-between h-[500px] bg-slate-100 z-[1000]">
                {/* change this to one which is clicked on main page to show !!! TODO  */}
                <div className="w-full overflow-auto h-full">

                <ZoomedNote title={selectedNote.title} textBody={selectedNote.text} />
                </div>

                <button onClick={() =>{ setIsPopUp(!isPopUp); setSelectedNote({})}}  type="button" className='rounded-full group-hover:block hidden absolute top-[-25px] m-auto bg-red-600 text-slate-800  hover:text-slate-100 border-red-600 border-2'><IconButton Icon={CloseRoundedIcon} /></button>
            </div>
        </div>
        </>
    )
}

export default PopUpScreen