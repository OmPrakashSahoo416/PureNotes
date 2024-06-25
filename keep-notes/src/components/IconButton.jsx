
function IconButton({ Icon, avatar, text, hidden, setHidden, hideHandler }) {

    

  return (
    <>
      <div className="iconBtn flex p-3 rounded-full w-fit hover:bg-amber-500 text-gray-100">
        {hideHandler && Icon &&  <button type="button" onClick={() => setHidden(!hidden)}><Icon className="text-amber-100" /></button>}
        {!hideHandler && Icon && <Icon className="text-amber-100" />}
        {avatar && <img src={avatar} className="max-h-[36px] border-amber-100 border-2 max-w-[36px] rounded-full object-contain bg-white" />}
        {/* {!collapsed} */}

        {text && (!hidden && <p className="ml-5 w-[150px]">{text}</p>)}
        {/* {hidden} */}
      </div>
    </>
  );
}

export default IconButton;
