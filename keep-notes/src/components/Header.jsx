import TableRowsRoundedIcon from '@mui/icons-material/TableRowsRounded';import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import ViewStreamRoundedIcon from '@mui/icons-material/ViewStreamRounded';
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded';
import RefreshRoundedIcon from '@mui/icons-material/RefreshRounded';
import IconButton from "./IconButton";

function Header({hidden, setHidden, forcedSideBarDisplay, setForcedSideBarDisplay}) {
    
  return (
    <>
      <div  className="header sticky mb-2 top-0 z-[900] bg-gray-800 flex items-center justify-between border-b border-amber-100 p-3">
        {/* header left section  */}
        <div className="headerLeft flex items-center">
          {/* sidebar visibility button  */}
          <div onClick={() => setForcedSideBarDisplay(!forcedSideBarDisplay)}>

            <IconButton hidden={hidden} setHidden={setHidden} hideHandler={true} Icon={TableRowsRoundedIcon}></IconButton>
          </div>


          {/* logo of app  */}
          <img
            src="https://shorturl.at/sXRcm"
            className="!h-[36px] mr-2 ml-3 hover:cursor-pointer object-contain"
            alt=""
          />
          <p className="text-2xl font-medium text-amber-100 hidden md:block font-['Chiller']">NOTES</p>
        </div>

        {/* header center section  */}
        <div className="headerCenter !w-[50%]">
          {/* search bar */}
          <div className="searchBar flex items-center p-3 rounded-md bg-gray-200 !w-[100%]">
            {/* search icon  */}
            <SearchRoundedIcon className="text-gray-500 mr-3" />

            {/* creating a form so that it could submit on enter  */}
            <form action="" className="w-[100%]">
              <input
                type="text"
                className="p-1 bg-gray-200 w-[100%] outline-none"
                name=""
                placeholder='Search...'
                id=""
              />
            </form>
          </div>
        </div>

        {/* header right section  */}
        <div className="headerRight">
            <div className="headerRightLinks flex items-center">
                <button type="button" className='rounded-full' onClick={() => window.location.reload()}><IconButton Icon={RefreshRoundedIcon} /></button>
                <IconButton Icon={ViewStreamRoundedIcon} />
                <IconButton Icon={SettingsRoundedIcon} />
                <IconButton avatar={"https://shorturl.at/V20Ev"} />
            </div>
        </div>
      </div>
    </>
  );
}

export default Header;
