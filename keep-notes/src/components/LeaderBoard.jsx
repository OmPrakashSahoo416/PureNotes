import { useDispatch, useSelector } from "react-redux";
import { db } from "../Firebase";
import { useEffect, useState } from "react";
import { displayLeaderboard } from "../states/leaderboard/leaderboardSlice";

function LeaderBoard() {
  const [leaderboard, setLeaderboard] = useState([]);

  //====================================
  const showLeaderboard = useSelector(
    (state) => state.leaderboard.showLeaderBoard
  );
  const dispatch = useDispatch();
  //====================================

  useEffect(() => {
    db.collection("focus")
      .orderBy("focusTime", "desc")
      .onSnapshot((snap) =>
        setLeaderboard(
          snap.docs.map((doc) => ({
            photo: doc.data().profilePic,
            name: doc.data().name,
            focusTime: doc.data().focusTime,
          }))
        )
      );
  }, []);
  console.log(leaderboard);

  return (
    <>
      {showLeaderboard && (
        <div className="leaderboard bg-opacity-80  bg-slate-700 font-['Inter'] flex items-center justify-center fixed top-0 inset-0 z-[1100] h-[100vh]">
          <div className="w-[600px] drop-shadow-2xl flex group items-center rounded-lg flex-col p-5 h-[600px] bg-slate-100 z-[1000]">
            <p className="text-2xl text-slate-600 font-thin  font-['Inter'] mb-10">
              {" "}
              Focus Time Ranking{" "}
            </p>

            {leaderboard.map((eachUser, index) => (
              <div
                className="border-2 mb-5 flex items-center justify-between hover:drop-shadow-md rounded-md bg-slate-200 p-2 w-full"
                key={index}
              >
                <div className="flex items-center">
                  <img
                    src={eachUser.photo}
                    className="max-h-[36px] mr-5 ml-5   hover:animate-bounce drop-shadow-xl max-w-[30px] rounded-full object-contain "
                    alt=""
                  />
                </div>
                <p className="font-['Inter'] text-slate-700">{eachUser.name}</p>
                <p className="text-slate-600 ml-5 mr-5 font-['Inter'] font-medium">
                  {Math.floor(eachUser.focusTime / 120)}{" "}
                </p>
              </div>
            ))}
            <button
              className="border-t border-red-600 absolute bottom-0 p-4 w-full text-slate-600 hover:bg-red-600 hover:text-slate-100 rounded-b-lg"
              type="button"
              onClick={() => dispatch(displayLeaderboard())}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default LeaderBoard;
