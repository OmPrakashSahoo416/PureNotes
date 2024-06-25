// import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
// import IconButton from "./IconButton"
// import Note from "./Note"
import ZoomedNote from "./ZoomedNote"
// import { db } from "../Firebase";





function PopUpScreen({isPopUp, setIsPopUp, setSelectedNote, selectedNote}) {

    


    
    return(
        <>
        <div className={(!isPopUp && "hidden ") + "popUpScreen bg-gradient-to-r from-teal-400 to-yellow-200 flex items-center justify-center fixed top-0 inset-0 z-[1100] h-[100vh]"}>

            <div className="w-[500px] drop-shadow-2xl flex items-center rounded-lg flex-col p-5 justify-between h-[500px] bg-slate-100 z-[1000]">
                {/* change this to one which is clicked on main page to show !!! TODO  */}
                <ZoomedNote title={selectedNote.title} textBody={selectedNote.text} />

                <button onClick={() =>{ setIsPopUp(!isPopUp); setSelectedNote({})}}  type="button" className='w-full rounded-md p-3 hover:bg-red-600 text-slate-800  hover:text-slate-100 border-red-600 border-2'>Close</button>
            </div>
        </div>
        </>
    )
}

export default PopUpScreen