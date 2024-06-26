import LightbulbCircleRoundedIcon from '@mui/icons-material/LightbulbCircleRounded';
import CircleNotificationsRoundedIcon from '@mui/icons-material/CircleNotificationsRounded';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import IconButton from './IconButton';
import { Link } from 'react-router-dom';


function SideBar({hidden, setHidden, forcedSideBarDisplay}) {
    

    return(
        <>
        <div onMouseEnter={() => !forcedSideBarDisplay && setHidden(!hidden)} onMouseLeave={() => !forcedSideBarDisplay && setHidden(!hidden)} className="sideBar p-3 md:flex-col flex items-center fixed z-[1000] w-fit h-fit ml-2 rounded-md bg-gradient-to-r from-amber-500 to-pink-500">
            <IconButton hidden={hidden} setHidden={setHidden} Icon={LightbulbCircleRoundedIcon} text={"Notes"}></IconButton>
            <Link to={"/reminder"}>
            <IconButton hidden={hidden} setHidden={setHidden} Icon={CircleNotificationsRoundedIcon} text={"Reminders"}></IconButton>
            </Link>
            <IconButton hidden={hidden} setHidden={setHidden} Icon={DeleteRoundedIcon} text={"Trash"}></IconButton>
            


        </div>
        </>
    )
}
export default SideBar