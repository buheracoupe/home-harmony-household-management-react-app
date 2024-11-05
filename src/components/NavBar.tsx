import logo from "../assets/HomeHarmonyLogo.png"
import { NavLink } from 'react-router-dom'
import MobileMenu from './MobileMenu'
import { motion } from 'framer-motion'

const variants = {
  hover: {
    y:-5,
    scale: 1.05,
    transition: {duration: .2}
  }
}

const MotionNavLink = motion.create(NavLink, {forwardMotionProps: true})

function NavBar() {
  return (
    <div className="Nav-Bars nav">
    <div className=' gap-4 items-center hidden md:flex justify-between mx-8'>
        <img className='h-20 object-contain' src={logo} alt="Home Harmony Logo" />
        <div className="navbar flex font-atma gap-4 items-center">
        <MotionNavLink
        variants={variants}
        whileHover="hover"
         to="/">Home</MotionNavLink>
        <MotionNavLink
         variants={variants}
        whileHover="hover"
         to="/pantryplanner">Pantry Planner</MotionNavLink>
        <MotionNavLink
         variants={variants}
        whileHover="hover"
         to="/communicationhub">Communication Hub</MotionNavLink>
        <MotionNavLink
         variants={variants}
        whileHover="hover"
         to="/events">Events</MotionNavLink>
        <MotionNavLink
         variants={variants}
        whileHover="hover"
         to="/Chores">Chores</MotionNavLink>
        </div>
    </div>
    <MobileMenu/>
    </div>
  )
}

export default NavBar