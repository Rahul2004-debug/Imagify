import React from 'react'
import { assets } from '../assets/assets'
import { motion } from 'framer-motion'
import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";

const GenerateBtn = () => {
 const {user,setShowLogin}=useContext(AppContext);
   const navigate = useNavigate();
  const onClickHandler = () => {
    if(user){
      navigate('/result')
  }
  else{
    setShowLogin(true)
  }
}


  return (
    <motion.div className='flex justify-center items-center flex-col pb-16  '
       initial={{opacity:0.2,y:100}}
        transition={{duration:1}}
        whileInView={{opacity:1,y:0}}
        viewport={{once:true}}
    >
        <h1 className='text-3xl sm:text-4xl font-semibold py-6 md:py-16'>
            See the Magic Try now!!
        </h1>
           <button onClick={onClickHandler} className="sm:text-lg text-white bg-black
               w-auto px-12 py-3  mt-auto flex items-center  gap-2 rounded-full  hover:scale-110 transform transition-all duration-1000 ">
                Genetrate Images
                 <img  className="h-6" src={assets.star_group} alt="" />
              </button>
    </motion.div>
  )
}

export default GenerateBtn