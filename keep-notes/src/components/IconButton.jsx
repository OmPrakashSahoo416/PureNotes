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
        {hideHandler && Icon &&  <button type="button" onClick={() => setHidden(!hidden)}><Icon /></button>}
        {!hideHandler && Icon && <Icon />}
        {avatar && <img src={avatar} className="h-[36px] rounded-full" />}
        {/* {!collapsed} */}

        {text && (!hidden && <p className="ml-5 w-[150px]">{text}</p>)}
        {/* {hidden} */}
      </div>
    </>
  );
}

export default IconButton;
