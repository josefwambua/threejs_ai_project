import React from 'react'
import {motion, AnimatePresence} from 'framer-motion';
import {useSnapshot} from 'valtio';
import {
  headContainerAnimation,
  headContentAnimation,
  headTextAnimation,
  slideAnimation,
} from '../config/motion';
import state from '../store';
import { CustomButton } from '../assets/components';


const Home = () => {
  const snap = useSnapshot(state);
  return (
    <div>
    <AnimatePresence>
      {snap.intro && (
        <motion.section className="home" {
          ...slideAnimation('left')}>
            <motion.header {...slideAnimation('down')}>
              <img src="./threejs.png" alt="logo" className='w-8 h-8 object-contain' />
            </motion.header>

            <motion.div className="home-content" {
              ...headContainerAnimation
            }>
              <h2 className="head-text">
                LET'S <br /> DO IT.
              </h2>
            </motion.div>
            <motion.div {...headContentAnimation} className="flex flex-col gap-5">
              <p className="max-w-md font-normal text-gray-500 text-base">
                
Explore exclusive shirt designs and discover collections curated by the talented designer <strong>Josef Wambua</strong>. Unleash your imagination and witness it transform into a tangible expression of creativity and style. With a unique blend of artistic flair and innovation, each design brings your imagination to life, bridging the gap between creativity and reality
              
              </p>
              <CustomButton 
              type="filled"
              title="Customize It"
              handleClick={()=> state.intro =false}
              customStyles={`w-fit px-4 py-2.5 font-bold text-sm`}              
              />
            </motion.div>
           





        </motion.section>
      )}
    </AnimatePresence>
      
    </div>
  )
}

export default Home
