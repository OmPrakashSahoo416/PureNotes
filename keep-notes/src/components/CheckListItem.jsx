// import { useEffect } from "react";
import { db } from "../Firebase";
import firebase from 'firebase/compat/app';

function CheckedListItem({setListContent, setListChecked, listContentVal, checkListItems, isInput, listCheckedVal, listContent, listChecked, setCheckListItems, docId, index, tasks, userDetails}) {

  function setCheckListItemsHandler(e) {
    e.preventDefault();
    setCheckListItems([...checkListItems, {checked:listChecked, text:listContent}])
    
  }

  function handleOnChangeChecked(e) {
    
    setListChecked(e.target.checked);
    tasks[index] = {text:listContentVal, checked:e.target.checked};


    (userDetails && 

    db.collection(userDetails.uid)
      .doc(docId)
      .update({
        tasks : tasks,
      })
      .catch(console.log("Error updating the value")));
    
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
    <div className="flex items-center font-['Inter'] justify-between overflow-auto p-2 rounded-sm drop-shadow-lg mb-3 w-fit bg-slate-200">

      {isInput && 
        <input type="checkbox" defaultChecked={(listCheckedVal)}  onChange={handleOnChangeChecked} className="mr-3 w-fit peer text-slate-500" />}



        <p onInput={handleOnChangeLabel} contentEditable suppressContentEditableWarning className={(isInput?"peer-checked:line-through  ":((listCheckedVal) ? " line-through  ": " ")) +  " rounded-sm whitespace-pre-wrap outline-none w-fit  text-slate-600"}>{listContentVal}</p>


        {isInput && <button onClick={setCheckListItemsHandler} type="button" className="tickSubmit bg-slate-100 ml-5 outline-none rounded-sm w-[30px] h-[30px] text-center text-green-600 ">➡️</button>}
    </div>
    </>
  );
}

export default CheckedListItem;
