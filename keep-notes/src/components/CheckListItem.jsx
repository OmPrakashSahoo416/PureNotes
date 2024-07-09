// import { useEffect } from "react";
import { db } from "../Firebase";
import firebase from 'firebase/compat/app';
import LoadingScreen from "./LoadingScreen";

function CheckedListItem({setListContent, setListChecked, listContentVal, checkListItems, isInput, listCheckedVal, listContent, listChecked, setCheckListItems, docId, index, tasks, userDetails}) {

  function setCheckListItemsHandler(e) {
    e.preventDefault();
    setCheckListItems([...checkListItems, {checked:listChecked, text:listContent}])
    
  }

  function handleOnChangeChecked(e) {
    
    const isChecked = e.target.checked;

  // Assuming tasks and index are properly set in your component state
  // Create a new array to ensure immutability
  const updatedTasks = tasks.map((task, idx) => {
    if (idx === index) {
      return { ...task, checked: isChecked };
    }
    return task;
  });

  // Update the local state with the new array
  // setTasks(updatedTasks);
  setListChecked(isChecked);

  // Update Firestore document
  db.collection(userDetails.uid)
    .doc(docId)
    .update({
      tasks: updatedTasks,
    })
    .then(() => {
      console.log("Tasks updated successfully");
    })
    .catch((error) => {
      console.error("Error updating tasks: ", error);
    });
    
  }

  function handleOnChangeLabel(e) {
    // console.log("ec");
    setListContent(e.target.innerText);
    
    (userDetails &&
    db.collection(userDetails.uid)
      .doc(docId)
      .update({
        tasks : [{text:e.target.innerText, checked:listCheckedVal}, ...tasks],
      })
      .catch(console.log("Error updating the value")));

      (userDetails && 
    db.collection(userDetails.uid)
      .doc(docId)
      .update({
        tasks : firebase.firestore.FieldValue.arrayRemove({text:listContentVal, checked:listCheckedVal}),
      })
      .catch(console.log("Error updating the value")));

  }
  



  return (
    <>
    {(userDetails === null && <LoadingScreen />)}
    <div className="flex items-center font-['Inter'] justify-between overflow-auto p-2 rounded-sm drop-shadow-lg mb-3 w-fit bg-slate-200">

      {isInput && 
        <input type="checkbox" defaultChecked={(listCheckedVal)}  onChange={handleOnChangeChecked} className="mr-3 w-fit peer text-slate-500" />}



        <p onInput={handleOnChangeLabel} contentEditable suppressContentEditableWarning className={(isInput?"peer-checked:line-through  ":((listCheckedVal)?" line-through  ": " ")) +  " rounded-sm whitespace-pre-wrap outline-none w-fit  text-slate-600"}>{listContentVal}</p>


        {isInput && <button onClick={setCheckListItemsHandler} type="button" className="tickSubmit bg-slate-100 ml-5 outline-none rounded-sm w-fit p-2">➡️</button>}
    </div>
    </>
  );
}

export default CheckedListItem;