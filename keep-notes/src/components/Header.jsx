import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import ViewStreamRoundedIcon from "@mui/icons-material/ViewStreamRounded";
import SettingsRoundedIcon from "@mui/icons-material/SettingsRounded";
import RefreshRoundedIcon from "@mui/icons-material/RefreshRounded";
import MilitaryTechIcon from "@mui/icons-material/MilitaryTech";
import IconButton from "./IconButton";
// import {  useState } from "react";
// import { useEffect } from "react";

function Header({
  setIsListView,
  isListView,
  searchText,
  setSearchText,
  isFocus,
  userDetails,
  setShowLeaderboard,
  showLeaderboard,
}) {
  // function showLeaderBoard() {

  //   db.collection("focus").orderBy("focusTime", "desc")
  //     .onSnapshot((snap) =>
  //       setLeaderboard(
  //         snap.docs.map((doc) => ({
  //           photo: doc.data().profilePic,
  //           name:doc.data().name,
  //           focusTime:doc.data().focusTime,
  //         }))
  //       )
  //     )
  //     console.log(leaderboard);

  // }

  return (
    <>
      {userDetails && (
        <div
          className={
            (isFocus && " hidden ") +
            "header sticky top-0 z-[1000] bg-gradient-to-l from-amber-500 to-pink-500 flex items-center justify-between drop-shadow-2xl p-3"
          }
        >
          {/* header left section  */}
          <div className="headerLeft flex items-center">
            {/* sidebar visibility button  */}

            {/* logo of app  */}
            <div className="flex items-end">
              <img
                src="https://shorturl.at/sXRcm"
                className="!h-[36px] mr-2 ml-3 hover:cursor-pointer object-contain"
                alt=""
              />
              <p className="text-2xl hover:cursor-pointer text-pink-200 hidden md:block font-bold font-['Calibri']">
                Zenotes
              </p>
            </div>
          </div>

          {/* header center section  */}
          <div className="headerCenter">
            {/* search bar */}
            <div className="searchBar drop-shadow-lg items-center p-2 flex rounded-md bg-gradient-to-r from-amber-200 to-yellow-400 ">
              {/* search icon  */}
              <SearchRoundedIcon className="text-amber-700 mr-3" />

              {/* creating a form so that it could submit on enter ==> removed enter so that state dont reload on enter
             and we lost the search text  */}
              {/* <form action="" className="w-[100%]"> */}
              <input
                type="text"
                className="p-1 bg-transparent placeholder:text-amber-700 text-amber-700 w-[100%] outline-none"
                name=""
                placeholder="Search..."
                id=""
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
              />
              {/* </form> */}
            </div>
          </div>

          {/* header right section  */}
          <div className="headerRight">
            <div className="headerRightLinks flex items-center">
              <button onClick={() => setShowLeaderboard(!showLeaderboard)} type="button" className="rounded-full">
                <IconButton Icon={MilitaryTechIcon} />
              </button>
              <button
                type="button"
                className="rounded-full"
                onClick={() => window.location.reload()}
              >
                <IconButton Icon={RefreshRoundedIcon} />
              </button>
              <button
                type="button"
                className="rounded-full"
                onClick={() => setIsListView(!isListView)}
              >
                <IconButton Icon={ViewStreamRoundedIcon} />
              </button>

              <IconButton Icon={SettingsRoundedIcon} />
              <IconButton avatar={userDetails.photoURL} />
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Header;
