import TableRowsRoundedIcon from '@mui/icons-material/TableRowsRounded';import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import ViewStreamRoundedIcon from '@mui/icons-material/ViewStreamRounded';
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded';
import RefreshRoundedIcon from '@mui/icons-material/RefreshRounded';
import IconButton from "./IconButton";

function Header({hidden, setHidden, forcedSideBarDisplay, setForcedSideBarDisplay, setIsListView, isListView}) {
    
  return (
    <>
      <div  className="header sticky mb-2 top-0 z-[900] bg-gradient-to-l from-amber-500 to-pink-500 flex items-center justify-between border-b border-amber-100 p-3">
        {/* header left section  */}
        <div className="headerLeft flex items-center">
          {/* sidebar visibility button  */}
          <div onClick={() => setForcedSideBarDisplay(!forcedSideBarDisplay)}>

            <IconButton hidden={hidden} setHidden={setHidden} hideHandler={true} Icon={TableRowsRoundedIcon}></IconButton>
          </div>


          {/* logo of app  */}
          <div className='flex items-end'>

          
          <img
            src="https://shorturl.at/sXRcm"
            className="!h-[36px] mr-2 ml-3 hover:cursor-pointer object-contain"
            alt=""
          />
          <p className="text-2xl hover:cursor-pointer text-pink-200 hidden md:block font-bold font-['Calibri']">Note.om</p>
          </div>
        </div>

        {/* header center section  */}
        <div className="headerCenter !w-[50%]">
          {/* search bar */}
          <div className="searchBar drop-shadow-lg items-center p-2 md:flex hidden rounded-md bg-gradient-to-r from-amber-200 to-yellow-400 !w-[100%]">
            {/* search icon  */}
            <SearchRoundedIcon className="text-amber-700 mr-3" />

            {/* creating a form so that it could submit on enter  */}
            <form action="" className="w-[100%]">
              <input
                type="text"
                className="p-1 bg-gradient-to-r from-amber-200 to-yellow-400 placeholder:text-amber-700 text-amber-700 w-[100%] outline-none"
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
                <button type="button" className='rounded-full' onClick={() => setIsListView(!isListView)}><IconButton Icon={ViewStreamRoundedIcon} /></button>
                
                <IconButton Icon={SettingsRoundedIcon} />
                <IconButton avatar={"https://shorturl.at/V20Ev"} />
            </div>
        </div>
      </div>
    </>
  );
}

export default Header;
