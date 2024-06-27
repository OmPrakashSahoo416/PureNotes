import LightbulbCircleRoundedIcon from '@mui/icons-material/LightbulbCircleRounded';
import CircleNotificationsRoundedIcon from '@mui/icons-material/CircleNotificationsRounded';
import IconButton from './IconButton';
import { Link } from 'react-router-dom';


function SideBar({hidden, setHidden, forcedSideBarDisplay}) {
    

    return(
        <>
        <div onMouseEnter={() => !forcedSideBarDisplay && setHidden(!hidden)} onMouseLeave={() => !forcedSideBarDisplay && setHidden(!hidden)} className="sideBar p-3 md:flex-col flex items-center fixed z-[1000] w-fit h-fit rounded-md bg-gradient-to-r from-amber-500 to-pink-500">
            <Link to={"/notes"}>
            <IconButton hidden={hidden} setHidden={setHidden} Icon={LightbulbCircleRoundedIcon} text={"Notes"}></IconButton>
            </Link>

            <Link to={"/reminder"}>
            <IconButton hidden={hidden} setHidden={setHidden} Icon={CircleNotificationsRoundedIcon} text={"Reminders"}></IconButton>
            </Link>            


        </div>
        </>
    )
}
export default SideBar