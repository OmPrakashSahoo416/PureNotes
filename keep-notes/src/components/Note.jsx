// import ZoomedNote from "./ZoomedNote";

function Note({title, textBody, isPopUp, setIsPopUp, setSelectedNote, isListView}) {


    return(
        // next implement the on click zoom of note on a pop up screen 
        <>
        <div draggable onClick={() => {setIsPopUp(!isPopUp); setSelectedNote({title:title, text:textBody})}} className={ (isListView ? "min-w-[100%] " : "min-w-[19%] ") + "note  border-[1px] mr-3 bg-gradient-to-r from-amber-200 to-yellow-400 hover:drop-shadow-xl  border-gray-800 rounded-lg p-5 max-w-[200px] max-h-[250px] overflow-hidden"}>
            <p className="mb-3 outline-none text-lg font-semibold text-amber-800">{title}</p>
            <p className="h-[90%] leading-relaxed text-sm outline-none font-sans  text-slate-800">{textBody}
            </p>
        </div>
        </>
    )
}
export default Note