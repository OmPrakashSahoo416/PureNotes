import { useEffect } from "react";

function CheckedListItem({setListContent, setListChecked, listContentVal, checkListItems, isInput, listCheckedVal, listContent, listChecked, setCheckListItems}) {

  function setCheckListItemsHandler(e) {
    e.preventDefault();
    setCheckListItems([...checkListItems, {checked:listChecked, text:listContent}])
    
  }
  
  useEffect(() => {

    // setListChecked(listChecked);
    // setListContent(listContent);
    
    
    console.log(checkListItems);
  },[checkListItems, listChecked, listContent, setListChecked, setListContent])


  return (
    <>
    <div className="flex items-center justify-between overflow-auto p-2 rounded-sm drop-shadow-lg mb-3 w-full bg-yellow-800">

      {isInput && 
        <input type="checkbox" defaultChecked={(listCheckedVal)}  onChange={(e) => (setListChecked(e.target.checked))} className="mr-3 w-fit peer" />}



        <p onInput={(e) => setListContent(e.target.innerText)} contentEditable suppressContentEditableWarning className={(isInput?"peer-checked:line-through  ":((listCheckedVal)?" line-through  ": " ")) +  " rounded-sm whitespace-pre-wrap outline-none w-[75%]  text-amber-200"}>{listContentVal}</p>


        {isInput && <button onClick={setCheckListItemsHandler} type="button" className="tickSubmit bg-green-100 ml-5 outline-none rounded-sm w-fit p-2">➡️</button>}
    </div>
    </>
  );
}

export default CheckedListItem;
