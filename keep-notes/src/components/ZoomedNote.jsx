import { db } from "../Firebase";
import Canvas from "./Canvas";
import CheckedListItem from "./CheckListItem";
// import CheckList from "./CheckList";
// import UploadImage from "./UploadImage";

function ZoomedNote({ title, textBody, imgUrl, docId, isPopUp, tasks,setListContent, setListChecked, canvasUrl }) {
  function handleOnChangeText(e) {
    // target inner text gives only the text and not html tags and whitespace no wrap dont add spaces if
    // we change lines it just preserves those
    db.collection("notes")
      .doc(docId)
      .update({
        content: e.target.innerText,
      })
      .catch(console.log("Error updating the value"));
  }

  function handleOnChangeTitle(e) {
    // target inner text gives only the text and not html tags and whitespace no wrap dont add spaces if
    // we change lines it just preserves those
    db.collection("notes")
      .doc(docId)
      .update({
        title: e.target.innerText,
      })
      .catch(console.log("Error updating the value"));
  }

  return (
    <>
      <div className="zoomedNote overflow-y-scroll w-full h-full">
        <p
          onInput={handleOnChangeTitle}
          contentEditable
          suppressContentEditableWarning
          className="mb-3 font-['Calibri'] border-[1px] border-amber-800 rounded-md focus:border-[1px] focus:border-slate-900 p-1 whitespace-pre-wrap outline-none text-lg font-semibold text-amber-700"
        >
          {title}
        </p>
        <p
          onInput={handleOnChangeText}
          contentEditable
          suppressContentEditableWarning
          className="leading-relaxed border-[1px] border-amber-800 rounded-md whitespace-pre-wrap focus:border-[1px] focus:border-slate-900 p-1 font-['Calibri'] overflow-x-hidden text-md mb-3 outline-none  text-slate-800"
        >
          {textBody}
        </p>
        {/* TASKS LIST */}
        <div className="rounded-md font-semibold border-2 mb-3 border-amber-900 p-3">
          TASKS :
          {tasks &&
            tasks.map((eachItem, index) => (
              <CheckedListItem
                key={index}
                listContentVal={tasks.length > 0 ? eachItem.text : ""}
                listCheckedVal={tasks.length > 0 ? eachItem.checked : false}
                isInput={true}
                setListContent={setListContent}
                setListChecked={setListChecked}
                docId={docId}
                index={index}
                tasks={tasks}
              />
            ))}
        </div>

        <img src={imgUrl} alt="" className="overflow-auto mb-5" />
        <img src={canvasUrl} alt="" className="overflow-auto mb-5" />
        <Canvas isPopUp={isPopUp} docId={docId} />
        {/* <UploadImage /> */}
      </div>
    </>
  );
}
export default ZoomedNote;
