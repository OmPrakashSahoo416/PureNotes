import LightbulbCircleRoundedIcon from "@mui/icons-material/LightbulbCircleRounded";
import CircleNotificationsRoundedIcon from "@mui/icons-material/CircleNotificationsRounded";
import PlayCircleFilledRoundedIcon from "@mui/icons-material/PlayCircleFilledRounded";
import IconButton from "./IconButton";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setHidden } from "../states/hidden/hiddenSlice";

function SideBar() {


  const hidden = useSelector((state) => state.hidden.hidden);
  const dispatch = useDispatch();

  return (
    <>
      <div
        onMouseEnter={() => dispatch(setHidden())}
        onMouseLeave={() => dispatch(setHidden())}
        className="sideBar p-3 md:flex-col flex items-center fixed z-[1000] w-fit h-fit bg-gradient-to-r from-amber-500 to-pink-500"
      >
        <Link to={"/notes"}>
          <IconButton
            hidden={hidden}
            setHidden={setHidden}
            Icon={LightbulbCircleRoundedIcon}
            text={"Notes"}
          ></IconButton>
        </Link>

        <Link to={"/reminder"}>
          <IconButton
            hidden={hidden}
            setHidden={setHidden}
            Icon={CircleNotificationsRoundedIcon}
            text={"Reminders"}
          ></IconButton>
        </Link>

        <Link to={"/focus"}>
          <IconButton
            hidden={hidden}
            setHidden={setHidden}
            Icon={PlayCircleFilledRoundedIcon}
            text={"Focus Mode"}
          ></IconButton>
        </Link>
      </div>
    </>
  );
}
export default SideBar;
