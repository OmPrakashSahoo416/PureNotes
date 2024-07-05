import { db } from "../Firebase";
import { useEffect, useState } from "react";

function LeaderBoard({showLeaderboard, setShowLeaderboard}) {
  const [leaderboard, setLeaderboard] = useState([]);

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
    
    
    {showLeaderboard && 
  <div className="leaderboard bg-opacity-80  bg-slate-800 flex items-center justify-center fixed top-0 inset-0 z-[1100] h-[100vh]">
    
    <div className="w-[600px] drop-shadow-2xl flex group items-center rounded-lg flex-col p-5 h-[600px] bg-slate-100 z-[1000]">
      <p className="text-4xl font-thin font-['Calibri'] mb-10"> Focus Time Ranking </p>

      {
        leaderboard.map((eachUser, index) => (
          <div className="border-2 mb-2 flex items-center justify-between hover:bg-slate-300 rounded-md border-slate-800 p-2 w-full" key={index}>
            <div className="flex items-center">

            <p className="font-bold mr-2 text-yellow-600">{index + 1}.</p>
            <img src={eachUser.photo} className="max-h-[36px] mr-5  hover:animate-bounce drop-shadow-xl border-2 max-w-[36px] rounded-full object-contain bg-white" alt="" />
            </div>
            <p>{eachUser.name}</p>
            <p className="text-yellow-600 ml-5  font-bold">{Math.floor(eachUser.focusTime / 120)} </p>
          </div>
        ))
      }
      <button className="border-t-2 border-red-600 absolute bottom-0 p-4 w-full hover:bg-red-600 hover:text-slate-100 rounded-b-lg" type="button" onClick={() => setShowLeaderboard(false)}>Close</button>
    </div>

  </div>}

    </>
  )

  


  

}

export default LeaderBoard;
