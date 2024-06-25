import { imageListClasses } from "@mui/material";
import { useEffect, useState } from "react";

function IconButton({ Icon, avatar, text, hidden, setHidden, hideHandler }) {

    // function hideHandler() {
    //     setHidden(!hidden);
    // }
    useEffect(() => {

    },[hidden])

  return (
    <>
      <div className="iconBtn flex p-3 rounded-full w-fit hover:bg-gray-600 text-gray-100">
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
