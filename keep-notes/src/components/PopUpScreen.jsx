import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import IconButton from "./IconButton"
import Note from "./Note"




function PopUpScreen({isPopUp, setIsPopUp}) {

    


    
    return(
        <>
        <div className={(!isPopUp && "hidden ") + "popUpScreen bg-yellow-500 flex items-center justify-center fixed top-0 inset-0 z-[999] h-[100vh]"}>

            <div className="w-[500px] flex items-center rounded-lg flex-col justify-between h-[500px] bg-black z-[1000]">
                {/* change this to one which is clicked on main page to show !!! TODO  */}
                <Note title={"Hi"} textBody={"Long"} />

                <button onClick={() => setIsPopUp(!isPopUp)}  type="button" className='w-full p-3 hover:bg-red-600 text-white'>Close</button>
            </div>
        </div>
        </>
    )
}

export default PopUpScreen