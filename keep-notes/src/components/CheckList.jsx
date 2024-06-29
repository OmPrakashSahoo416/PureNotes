import CheckedListItem from "./CheckListItem"
function CheckList() {
    return(
        <>
        <div className="checkList rounded-md border-2 mb-3 border-amber-900 p-3">
        Check List:
        <CheckedListItem listContent={"listContent"} />



        <div className="addToList font-bold text-2xl bg-blue-600 hover:bg-blue-900 text-slate-100 p-2 text-center rounded-sm"><button type="button">+</button></div>
        </div>
        </>
    )

}
export default CheckList