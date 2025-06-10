import React from "react";
import { assets } from "../assets/assets";
import { motion } from "framer-motion";
import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";

const Header = () => {
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
    <motion.div className="flex flex-col justify-center items-center my-20"
        initial={{ opacity: 0.2, y: 50 }}
         transition={{duration:0.5}}
         whileInView={{opacity:1,y:0}}
         viewport={{once:true}}
    >
      <motion.div
        className="text-stone-500  inline-flex text-center gap-2 bg-white px-8
         py-2 rounded-full shadow-lg border border-neutral-200"
         initial={{ opacity: 0, y: -20 }}
         animate={{opacity:1,y:0}}
         transition={{delay:0.2,duration:0.8}}
         
      >
        <p>Best text to Image Gnererater</p>
        <img src={assets.star_icon} alt="" />
      </motion.div>
      <motion.h1 className="text-4xl max-w-[600px] sm:text-6xl mx-auto mt-10 text-center sm:max-[590px]">
        Turn Text to <span className="text-blue-600"
        initial={{opacity:0}}
        animate={{opacity:1}}
        transition={{delay:0.4,duration:2}}
        >Image</span>, in Fractions.
      </motion.h1>
      <motion.p className=" text-center max-w-xl mx-auto mt-5 text-gray-800"
        initial={{opacity:0,y:20}}
        animate={{opacity:1,y:0}}
        transition={{delay:0.6,duration:0.8}} 
      >
        Unleash your creativity with our AI-powered text-to-image generator.Turn your creativity into stunning visuals in seconds. No design skills required! Just Type!, and watch magic happen.
      </motion.p> 
      <motion.button onClick={onClickHandler} className="sm:text-lg text-white bg-black
       w-auto px-10 py-2.5  mt-8 flex items-center  gap-2 rounded-full  hover:scale-110 transform transition-all duration-1000"
       whileHover={{scale:1.05}}
       whileTap={{scale:0.95}}
        initial={{opacity:0}}
        animate={{opacity:1}}
        transition={{default:{duration:0.5},opacity:{delay:0.8,duration:1}}}
       >
        Genetrate Images
         <img  className="h-6" src={assets.star_group} alt="" />
      </motion.button>

      <motion.div className="flex  flex-wrap  justify-center gap-3 mt-16"
        initial={{opacity:0}}
        animate={{opacity:1}}
        transition={{delay:1,duration:1}}
      >
       {Array(6).fill('').map((item, index)=> (
        <motion.img whileHover={{scale:1.05,duration:0.1}}   className="rounded hover:scale-105 transform tarnsition-all duration-1000 max-sm:w-10" 
        src={index%2 ===0 ?assets.sample_img_2
            :assets.sample_img_1
        } 
         key={index} width={70} alt="" />
       ))}
      </motion.div>
      <motion.p  className="text-gray-500 mt-2"
        initial={{opacity:0}}
        animate={{opacity:1}}
        transition={{delay:1.1,duration:0.8}}
      >
        Generated images from Imagify
      </motion.p>
    </motion.div>
  );
}

export default Header;
