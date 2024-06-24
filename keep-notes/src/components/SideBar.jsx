import LightbulbCircleRoundedIcon from '@mui/icons-material/LightbulbCircleRounded';
import CircleNotificationsRoundedIcon from '@mui/icons-material/CircleNotificationsRounded';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import IconButton from './IconButton';


function SideBar({hidden, setHidden}) {
    

    return(
        <>
        <div onMouseEnter={() => setHidden(!hidden)} onMouseLeave={() => setHidden(!hidden)} className="sideBar p-3 flex-col w-fit ml-2 rounded-md bg-slate-800">
            <IconButton hidden={hidden} setHidden={setHidden} Icon={LightbulbCircleRoundedIcon} text={"Notes"}></IconButton>
            <IconButton hidden={hidden} setHidden={setHidden} Icon={CircleNotificationsRoundedIcon} text={"Reminders"}></IconButton>
            <IconButton hidden={hidden} setHidden={setHidden} Icon={DeleteRoundedIcon} text={"Trash"}></IconButton>
            


        </div>
        </>
    )
}
export default SideBar