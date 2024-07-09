import { motion } from "framer-motion";

function LoadingScreen() {
  return (

    <>
    <div className="loading absolute w-screen h-screen flex justify-center items-center  z-[3000]">

      <motion.p className=""
      initial={{opacity:[0, 20, 0]}}
      animate={{opacity:[20,0, 20], transition:{
        duration:2,
        repeat:Infinity
      }}}
      
      
      >Loading ...</motion.p>


    </div>
    
    
    
    </>


  )
}

export default LoadingScreen