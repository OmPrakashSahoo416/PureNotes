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
        className="sideBar p-3 md:flex-col  md:items-start flex items-center font-['Inter'] rounded-b-md md:rounded-none fixed z-[1000] max-w-screen h-fit bg-slate-100"
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
