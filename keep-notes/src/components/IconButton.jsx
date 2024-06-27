
function IconButton({ Icon, avatar, text, hidden, setHidden, hideHandler, color="text-amber-100" }) {

    

  return (
    <>
      <div className={"iconBtn flex p-3 rounded-full w-fit hover:bg-amber-500 text-gray-100"}>

        {/* when there is a functionality this is specifically for the left header menu show and unshow feature  */}
        {hideHandler && Icon &&  <button type="button" onClick={() => setHidden(!hidden)}><Icon className="text-amber-100" /></button>}

        {/* normal icon no functionality button below */}
        {!hideHandler && Icon && <Icon className={color} />}


        {/* profile or any other image is given  */}
        {avatar && <img src={avatar} className="max-h-[36px] hover:animate-bounce border-black drop-shadow-md border-2 max-w-[36px] rounded-full object-contain bg-white" />}
        {/* {!collapsed} */}

        {text && (!hidden && <p className="ml-5 w-[150px]">{text}</p>)}
        {/* {hidden} */}
      </div>
    </>
  );
}

export default IconButton;
