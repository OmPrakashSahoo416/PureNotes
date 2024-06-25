function Note({title, textBody, isPopUp, setIsPopUp}) {
    return(
        // next implement the on click zoom of note on a pop up screen 
        <>
        <div onClick={() => setIsPopUp(!isPopUp)} className="note min-w-[19%] border-2 mr-3 bg-gray-800  hover:drop-shadow-2xl  border-amber-100 rounded-lg p-5 max-w-[200px] max-h-[250px] overflow-hidden">
            <p className="mb-3 outline-none text-lg font-semibold text-amber-100">{title}</p>
            <p className="h-[90%] leading-relaxed text-sm outline-none font-sans  text-slate-200">{textBody}
            </p>
        </div>
        </>
    )
}
export default Note