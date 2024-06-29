function CheckedListItem({listContent, listChecked}) {
  return (
    <>
      <label
        
        className=" has-[:checked]:line-through flex items-center w-fit  bg-amber-500 m-2  p-2 rounded-sm drop-shadow-lg text-yellow-800"
      >
        <input type="checkbox" checked={listChecked} className="mr-3" />
        <p contentEditable suppressContentEditableWarning className=" rounded-sm whitespace-pre-wrap outline-none  text-amber-700">{listContent}</p>
      </label>
    </>
  );
}

export default CheckedListItem;
