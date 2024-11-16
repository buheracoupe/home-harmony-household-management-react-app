import React from 'react'
import PantryPlanner from "./pages/PantryPlanner"
import Home from "./pages/HomePages/Home"
import Events from "./pages/Events"
import Gallery from './pages/Gallery'
import CommunicationHub from "./pages/CommunicationHub"
import { AnimatePresence, motion } from 'framer-motion'
import { Routes, Route, useLocation } from'react-router-dom'

const variants = {
    initial: { opacity: 0, y:-20 },
    animate: { opacity: 1, y:0 },
    exit: { opacity: 0, y: 20 },
  }
  
  export function PageWrapper({children}: {children: React.ReactNode}) {
    return(
      <motion.div
        initial="initial"
        animate="animate"
        exit="exit"
        transition={{duration: .5}}
        variants={variants}
      >
        {children}
      </motion.div>
    )
  
  }
  
  
export default function AnimatedRoutes(){

    const location = useLocation();

    return(
      <AnimatePresence mode='wait' >
      <Routes location={location} key={location.pathname}>
      <Route
       path="/"
       element={<PageWrapper><Home/></PageWrapper>}
      />
      <Route
       path="/pantry-planner"
       element={<PageWrapper><PantryPlanner/></PageWrapper>}
       />
       <Route
       path="/events"
       element={<PageWrapper><Events/></PageWrapper>}
       />
       <Route
       path="/gallery"
       element={<PageWrapper><Gallery/></PageWrapper>}
       />
       <Route
       path="/communicationhub"
       element={<PageWrapper><CommunicationHub/></PageWrapper>}
       />
      </Routes>
      </AnimatePresence>
    )
  }
  
  



