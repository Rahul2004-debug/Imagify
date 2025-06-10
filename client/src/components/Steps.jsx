import React from 'react'
import { stepsData } from '../assets/assets'
import { motion } from 'framer-motion'

const Steps=()=>{
  return (
    <motion.div className='flex flex-col items-center justify-center my-32'
        initial={{opacity:0.2,y:100}}
        transition={{duration:1}}
        whileInView={{opacity:1,y:0}}
        viewport={{once:true}}
    >
        <h1 className='text-3xl sm:text-4xl font-semibold mb-2'>
            How it works
        </h1>
        <p className='text-gray-600 text-lg mb-8 '>
            Transform words into astonishing images
        </p>
        <div className='space-y-4 max-w-3xl text-sm'>
            {stepsData.map((item,index)=>(
                <div key={index}
                 className='flex items-center gap-4 p-5 px-8 bg-white/50 shadow-md  cursor-pointer hover:scale-[1.02] transition-all duration-400 rounded-lg'
                >
                    <img width={40} src={item.icon} alt="" />
                    <div>
                        <h2 className='text-xl font-medium'>
                            {item.title}
                        </h2>
                        <p className='text-gray-500'>
                            {item.description}
                        </p>
                    </div>
                </div>
            ))}
        </div>
    </motion.div>
  )
} 

export default Steps