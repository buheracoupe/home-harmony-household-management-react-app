import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { NavLink } from 'react-router-dom';
import { imageArray } from '../Gallery';



function displaySlideShow(): {id: string, image: JSX.Element}{
    const randomImage = imageArray[Math.floor(Math.random()*imageArray.length)]
    return (
        {
            id: randomImage.id,
            image: (<img className='object-cover w-[400px] h-[300px]' src={randomImage.src} alt={randomImage.alt}/>),
        }
    )

}

function ImagesSlide() {
const [displayImageSlide, setDisplayImageSlide] = useState<{id: string, image:JSX.Element}> ({id: imageArray[0].id, image: <img src={imageArray[0].src} alt={imageArray[0].alt}/>})
    
useEffect(() => {

        const interval = setInterval(() => {
            setDisplayImageSlide(displaySlideShow())
        }, 5000)
        return () => clearInterval(interval)
    })




  return (
      <div className="slide-container bg-secondary-dark col-start-1 p-2 border-2 flex flex-col items-center
       ml-4 gap-2 border-primary-light rounded-md w-[450px]">
        <p className='font-atma text-white text-2xl mx-auto'>Lately, in our Family...</p>
    <div className="slide-container overflow-hidden mx-auto relative w-[350px] h-[250px] rounded-md">
        <AnimatePresence mode='wait'>
        <motion.div
        initial={{ opacity: 0, x:-100 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{opacity: 0, x:100}}
        transition={{ duration: 0.3 }}
        key={displayImageSlide.id}
        >
            {displayImageSlide.image}
            </motion.div>
            </AnimatePresence>
        {/* <div className="arrows">
        <IoIosArrowBack />
        <IoIosArrowForward />
        </div> */}
    </div>
    <NavLink to="/gallery">
    <button className='p-2 rounded-md bg-yellow-500 hover:bg-primary-light font-atma text-white'>See More</button>
    </NavLink>
    </div>
  )
}

export default ImagesSlide