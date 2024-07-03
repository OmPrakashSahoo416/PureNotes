import { useEffect } from "react";

function Timer({isTimerRunning, hour, setHour, minute,setMinute,second,setSecond, defaultTime, setDefaultTime}) {

    function getTime() {
        const time = defaultTime - Date.now();
        // console.log(Math.floor((time / 1000 / 60 / 60) % 24));
        setSecond(Math.floor((time / 1000) % 60))
        setMinute(Math.floor((time / 1000 / 60) % 60))
        setHour(Math.floor((time / 1000 / 60 / 60) % 12))

        
    }

    useEffect(() => {
        const interval = setInterval(() => getTime(), 1000);
        console.log("1");

        if(!isTimerRunning) {
            clearInterval(interval);
            setDefaultTime(hour * 60 * 60 * 1000 + minute * 60 * 1000 + second * 1000 + Date.now());
            
        } else {
            console.log("2");
            setDefaultTime(hour * 60 * 60 * 1000 + minute * 60 * 1000 + second * 1000 + Date.now());

        }
        

        return () => clearInterval(interval);
    }, [isTimerRunning])

    return(
        <>
        <div>

        </div>

        </>
    )
}

export default Timer