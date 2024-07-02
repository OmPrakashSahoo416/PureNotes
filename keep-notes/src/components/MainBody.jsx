import { useEffect, useState } from "react";
import Note from "./Note";
import { db } from "../Firebase";
import firebase from "firebase/compat/app";
import { useOutletContext } from "react-router-dom";
import UploadImage from "./UploadImage";
import CheckedListItem from "./CheckListItem";
// import Canvas from "./Canvas";
// import Canvas from "./Canvas";
// import { Outlet } from "react-router-dom";

// import { DndContext } from "@dnd-kit/core";


// drag and drop requirements 
// import { DndProvider } from "react-dnd";
// import { HTML5Backend } from "react-dnd-html5-backend";
// import { useDrop } from "react-dnd";

// import { DragDropContext } from "react-beautiful-dnd"; // Gets all the component tree features like the usecontext api

function MainBody() {
  const {
    isInputActive,
    setSelectedNote,
    setIsInputActive,
    isPopUp,
    setIsPopUp,
    isListView,
    searchText,
    listContent,
    setListContent,
    listChecked,
    setListChecked,
    setIndexMaxCount,
    indexMaxCount,
    
  } = useOutletContext();

  // function onDropHandler({title, textBody, imgUrl, tasks, isPinned, canvasUrl, isReminder, timestamp}) {
  //   console.log(title)
  //   // db.collection("notes").add({
  //   //   title: title,
  //   //   content: textBody,
  //   //   imgUrl: imgUrl,
  //   //   isReminder: isReminder,
  //   //   isPinned: isPinned,
  //   //   tasks: tasks,
  //   //   canvasUrl: canvasUrl,
  //   //   timestamp: timestamp,
  //   // });

  // }
  // const [{isOver}, drop] = useDrop(() =>({
  //   accept:"note",
  //   drop: (item) => onDropHandler(item),
  //   collect:(monitor) => ({
  //     isOver:!!monitor.isOver(),
  //   }),
  // }));



  const [note, setNote] = useState([]);
  const [newTitle, setNewTitle] = useState("");
  const [inpTextNote, setInpTextNote] = useState("");
  const [ImgLink, setImgLink] = useState("");
  
  const [isImgInpTypeLink, setIsImgInpTypeLink] = useState(false);
  const [checkListItems, setCheckListItems] = useState([]);

  useEffect(() => {
    db.collection("notes").orderBy("index", "desc")
      .onSnapshot((snap) =>
        setNote(
          snap.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          }))
        )
      );
      
  }, []);


  function onSubmitNoteHandler(e) {
    // preventdefault is necessary to avoid a re render which would reset the contents of states
    e.preventDefault();

    db.collection("notes").add({
      title: newTitle,
      content: inpTextNote,
      imgUrl: ImgLink,
      isReminder: false,
      isPinned: false,
      tasks: checkListItems,
      canvasUrl: "",
      index:indexMaxCount,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });
    setIndexMaxCount(indexMaxCount + 1);
    // const updatedNote = [...note,{title:newTitle,inpText:inpTextNote}] === previous code ===
    // setNote(updatedNote);
    onCloseNoteHandler(e);
  }

  function onCloseNoteHandler(e) {
    setIsInputActive(!isInputActive);
    e.preventDefault();

    // resetting the note contents on close
    setNewTitle("");
    setInpTextNote("");
    setImgLink("");
    setIsImgInpTypeLink(false);
    setCheckListItems([]);
    setListChecked(false);
    setListContent("Add your label ...");
  }

  return (
    <>
      {/* <Canvas></Canvas> */}
      <div className="mainBody rounded-md flex justify-center flex-col  w-full mr-2 ml-2 p-5 ">
        <div className="mainBodyInp rounded-md flex justify-center flex-col items-center  w-full mb-16 ">
          <div className="noteCreater drop-shadow-lg w-[50%] z-[950] rounded-md mt-24 md:mt-0  bg-gradient-to-r from-amber-200 to-yellow-400 p-3 mb-16 ">
            {/* <form action="" className="w-[100%] z-[950]"> */}
            {!isInputActive ? (
              <input
                onClick={() => setIsInputActive(!isInputActive)}
                type="text"
                className="w-[100%] outline-none bg-gradient-to-r from-amber-200 to-yellow-400 text-amber-900 placeholder:text-amber-900 "
                placeholder="Take a note ..."
                name=""
                id=""
              />
            ) : (
              <div className="max-w-full ">
                {/* enter title  */}
                <input
                  onChange={(e) => setNewTitle(e.target.value)}
                  type="text"
                  autoFocus={true}
                  placeholder="Title"
                  value={newTitle}
                  className="w-[100%] mb-3 outline-none text-lg font-semibold bg-gradient-to-r from-amber-200 to-yellow-400 placeholder:text-amber-900 text-amber-900"
                  name=""
                  id=""
                />

                <input
                  onChange={(e) => setInpTextNote(e.target.value)}
                  type="text"
                  placeholder="Take a note ..."
                  className="w-full mb-3 text-sm outline-none bg-gradient-to-r from-amber-200 to-yellow-400 placeholder:text-amber-900 text-amber-900"
                  name=""
                  id=""
                  value={inpTextNote}
                />

                {/* <CheckList
              listContent = {listContent}
                setListContent = {setListContent}
                listChecked = {listChecked}
                setListChecked = {setListChecked} ></CheckList> */}

                <div className="checkList rounded-md font-semibold border-2 mb-3 border-amber-900 p-3">
                  LIST :
                  {checkListItems.map((eachItem, index) => (
                    <CheckedListItem
                      key={index}
                      setListContent={setListContent}
                      setCheckListItems={setCheckListItems}
                      checkListItems={checkListItems}
                      setListChecked={setListChecked}
                      listContent={listContent}
                      listChecked={listChecked}
                      listContentVal={
                        checkListItems.length > 0
                          ? checkListItems[index].text
                          : ""
                      }
                      listCheckedVal={
                        checkListItems.length > 0
                          ? checkListItems[index].checked
                          : false
                      }
                      isInput={false}
                    />
                  ))}
                  <div className="addToList p-2 text-sm border-t-2 mt-40 border-black">
                    <CheckedListItem
                      setListContent={setListContent}
                      setCheckListItems={setCheckListItems}
                      checkListItems={checkListItems}
                      setListChecked={setListChecked}
                      listContent={listContent}
                      listChecked={listChecked}
                      listContentVal={"Add your label ..."}
                      listCheckedVal={false}
                      isInput={true}
                    />
                  </div>
                </div>

                <label htmlFor="" className="text-sm block p-2 text-yellow-800">
                  <input
                    type="checkbox"
                    className="mr-3"
                    value={isImgInpTypeLink}
                    onChange={(e) => setIsImgInpTypeLink(e.target.checked)}
                  />
                  Check this if you want to upload an image via link
                </label>

                {isImgInpTypeLink ? (
                  <input
                    onChange={(e) => setImgLink(e.target.value)}
                    type="url"
                    placeholder="Image link here ..."
                    className="w-[100%] mb-5 mt-5 p-3 rounded-sm border-2 border-amber-800 text-sm outline-none bg-gradient-to-r from-amber-200 to-yellow-400 placeholder:text-amber-900 text-amber-900"
                    name=""
                    id=""
                    value={ImgLink}
                  />
                ) : (
                  <UploadImage setImgLink={setImgLink} />
                )}
                <img src={ImgLink} alt="" className="overflow-auto mb-5" />



                {/* submit note  */}
                <div className="flex justify-center">
                  <button
                    type="submit"
                    onClick={onSubmitNoteHandler}
                    className="w-[50%] mr-5 p-2 rounded-md hover:bg-green-600 hover:text-slate-100 bg-slate-100"
                  >
                    Submit
                  </button>
                  <button
                    onClick={onCloseNoteHandler}
                    type="button"
                    className="w-[50%] p-2 rounded-md hover:bg-red-600 hover:text-slate-100 bg-slate-100"
                  >
                    Close
                  </button>
                </div>
              </div>
            )}
            {/* </form> */}
          </div>
        </div>

        <div className="m-auto lg:mb-4 lg:ml-12 font-['Calibri] font-semibold text-slate-100 mb-4">
          Pinned
        </div>
        <hr className="w-full mb-2" />

        {/* The Pinned tagged notes here!  */}
        {/* <DndProvider backend={HTML5Backend}> */}
        <div className="notesPinnedList flex mb-[20px] lg:ml-12 flex-wrap lg:justify-start justify-center gap-y-5">
          {note.map(
            (eachNote) =>
              eachNote.data.isPinned &&
              (eachNote.data.title
                .toLowerCase()
                .indexOf(searchText.toLowerCase()) !== -1 ||
                eachNote.data.content
                  .toLowerCase()
                  .indexOf(searchText.toLowerCase()) !== -1) && (
                <Note
                  isListView={isListView}
                  setSelectedNote={setSelectedNote}
                  isPopUp={isPopUp}
                  setIsPopUp={setIsPopUp}
                  key={eachNote.id}
                  imgUrl={eachNote.data.imgUrl}
                  docId={eachNote.id}
                  isPinned={eachNote.data.isPinned}
                  isReminder={eachNote.data.isReminder}
                  title={eachNote.data.title}
                  tasks={eachNote.data.tasks}
                  textBody={eachNote.data.content}
                  canvasUrl={eachNote.data.canvasUrl}
                  index={eachNote.data.index}
                 
                />
              )
          )}
        </div>
        {/* </DndProvider> */}

        <div className="m-auto lg:mb-4 lg:ml-12 font-['Calibri] font-semibold text-slate-100 mb-4">
          General
        </div>
        <hr className="w-full mb-2" />





        
        {/* may be using display grid will be a better option here to try  */}
        {/* General all notes display here  */}
        {/* <DragDropContext> */}
        {/* <DndProvider backend={HTML5Backend}> */}
        <div className={"notesGeneralList flex mb-[200px] lg:ml-12 flex-wrap lg:justify-start justify-center gap-y-5 "}>
          {note.map(
            (eachNote) =>
              !eachNote.data.isPinned &&
              (eachNote.data.title
                .toLowerCase()
                .indexOf(searchText.toLowerCase()) !== -1 ||
                eachNote.data.content
                  .toLowerCase()
                  .indexOf(searchText.toLowerCase()) !== -1) && (
                <Note
                  isListView={isListView}
                  setSelectedNote={setSelectedNote}
                  isPopUp={isPopUp}
                  setIsPopUp={setIsPopUp}
                  key={eachNote.id}
                  imgUrl={eachNote.data.imgUrl}
                  isPinned={eachNote.data.isPinned}
                  docId={eachNote.id}
                  isReminder={eachNote.data.isReminder}
                  title={eachNote.data.title}
                  tasks={eachNote.data.tasks}
                  textBody={eachNote.data.content}
                  canvasUrl={eachNote.data.canvasUrl}
                  index={eachNote.data.index}
                  
                />
              )
          )}
        </div>
        {/* </DndProvider> */}
        {/* </DragDropContext> */}
      </div>
    </>
  );
}

export default MainBody;
