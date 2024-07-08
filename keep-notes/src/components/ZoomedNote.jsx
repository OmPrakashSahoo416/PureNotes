import { db } from "../Firebase";
import Canvas from "./Canvas";
import CheckedListItem from "./CheckListItem";
import { useSelector } from "react-redux";
// import CheckList from "./CheckList";
// import UploadImage from "./UploadImage";

function ZoomedNote({
  title,
  textBody,
  imgUrl,
  docId,
  tasks,
  setListContent,
  setListChecked,
  canvasUrl,
  userDetails,
}) {
  const isPopUp = useSelector((state) => state.isPopUp.isPopUp);

  function handleOnChangeText(e) {
    // target inner text gives only the text and not html tags and whitespace no wrap dont add spaces if
    // we change lines it just preserves those
    userDetails &&
      db
        .collection(userDetails.uid)
        .doc(docId)
        .update({
          content: e.target.innerText,
        })
        .catch(console.log("Error updating the value"));
  }

  function handleOnChangeTitle(e) {
    // target inner text gives only the text and not html tags and whitespace no wrap dont add spaces if
    // we change lines it just preserves those
    userDetails &&
      db
        .collection(userDetails.uid)
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
          className="mb-3 border-[1px] bg-slate-300 font-['Inter']  rounded-md  p-2 whitespace-pre-wrap outline-none text-lg font-semibold text-slate-700"
        >
          {title}
        </p>
        <p
          onInput={handleOnChangeText}
          contentEditable
          suppressContentEditableWarning
          className="leading-relaxed border-[1px] rounded-md whitespace-pre-wrap focus:border-[1px] p-2 font-['Inter'] overflow-x-hidden text-md mb-3 outline-none bg-slate-300  text-slate-700"
        >
          {textBody}
        </p>
        {/* TASKS LIST */}
        <div className="rounded-md font-semibold border-2 mb-3 bg-slate-300 p-3">
          CHECKLIST :
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
                userDetails={userDetails}
              />
            ))}
        </div>

        <img src={imgUrl} alt="" className="overflow-auto mb-5" />
        <img src={canvasUrl} alt="" className="overflow-auto mb-5" />
        <Canvas isPopUp={isPopUp} docId={docId} userDetails={userDetails} />
        {/* <UploadImage /> */}
      </div>
    </>
  );
}
export default ZoomedNote;
