import Note from "./Note";

function MainBody({isInputActive, setIsInputActive}) {
    return(
        <>
        <div  className="mainBody rounded-md flex justify-center flex-col  w-full mr-2 ml-2 p-5 ">
            <div className="mainBodyInp rounded-md flex justify-center flex-col items-center  w-full mb-16 ">

            
            <div className="noteCreater w-[50%] border-2 rounded-md  bg-gray-700 drop-shadow-2xl p-3 mb-16 border-slate-100">
                <form action="" className="w-[100%]">
                    {!isInputActive? <input onClick={() => setIsInputActive(!isInputActive)} type="text" className="w-[100%] outline-none bg-gray-700 text-slate-100" placeholder="Take a note ..." name="" id="" /> : 
                    <div className="max-w-full">
                        {/* enter title  */}
                        <input type="text" placeholder="Title" className="w-[100%] mb-3 outline-none text-lg font-semibold bg-gray-700 text-slate-100" name="" id="" />

                        {/* enter content  */}
                        {/* <span contentEditable role="input" className="inline-block w-[100%] mb-5 text-sm outline-none bg-gray-700 text-slate-100" /> */}

                        <input type="text" placeholder="Take a note ..." className="w-[100%] mb-5 text-sm outline-none bg-gray-700 text-slate-100" name="" id="" />

                        {/* submit note  */}
                        <div className="flex justify-center">

                        <button type="submit" className="w-[50%] mr-5 p-2 rounded-md hover:bg-blue-600 hover:text-slate-100 bg-slate-100">Submit</button>
                        <button onClick={() => setIsInputActive(!isInputActive)} type="button" className="w-[50%] p-2 rounded-md hover:bg-red-500 hover:text-slate-100 bg-slate-100">Close</button>
                        </div>

                    </div>
                    
                    }
                    
                </form>
            </div>
            </div>

            {/* may be using display grid will be a better option here to try  */}
            <div className="notesList flex flex-wrap justify-start gap-y-5">
                <Note></Note>
                <Note></Note>
                <Note></Note>
                <Note></Note>
            </div>
        </div>
        </>
    )
}

export default MainBody;