import logoWhite from "../assets/applogo-white-text.png"
import { NavLink } from 'react-router-dom'
import { IoMdClose } from "react-icons/io";
import { CiMenuBurger } from "react-icons/ci";
import { AnimatePresence, easeInOut, motion } from 'framer-motion';
import { closeMobileNav, openMobileNav } from "../Redux/NavSlice";
import { useAppDispatch, useTypedSelector } from "../Redux/ReduxHooks";


const variants = {
  open: {
    opacity: 1,
    x: 0,
    transition: {
      duration: .4,
      ease: easeInOut,
    },
  },
  closed: {
    opacity: 0,
    x: '-100%',
    transition: {
      duration: .5,
      ease: easeInOut,
    },
  },
};

function MobileMenu() {
  const mobileMenuState = useTypedSelector((state) => state.navigation.mobileNavState)
  const dispatch = useAppDispatch();


 return(
  <>
  {!mobileMenuState &&
    <>
      <header className="w-screen h-16 md:hidden bg-white fixed top-0 z-40">
      <CiMenuBurger
      onClick={() => dispatch(openMobileNav()) }
       className='text-3xl text-secondary-dark fixed md:hidden right-8 top-4 cursor-pointer '/>
      </header>
    </>
  } 
    <>
      <AnimatePresence>
    {mobileMenuState &&
        <motion.div
        variants={variants}
        initial="closed"
        animate="open"
        exit="closed"
        key="animated-div"
        onClick={event => event.stopPropagation()}
         className="burgermenu md:hidden font-atma text-white fixed z-[100] bg-secondary-dark flex flex-col items-center left-0 w-[300px] h-full">
          <IoMdClose
          onClick={() => dispatch(closeMobileNav())}
           className="text-white absolute top-4 right-4 hover:text-primary-light text-2xl cursor-pointer" />
          <img className='h-20 object-contain m-4 mt-8' src={logoWhite} alt="Logo" />
          <div
          onClick={() => dispatch(closeMobileNav())}
           className="nav flex flex-col items-center text-xl gap-4 w-full">
            <NavLink className="w-full flex justify-center p-3 hover:text-primary-light border-b-2 hover:border-b-primary-light border-b-white" to="/">Home</NavLink>
            <NavLink className="w-full flex justify-center p-3 hover:text-primary-light border-b-2 hover:border-b-primary-light border-b-white" to="/pantry-planner">Pantry Planner</NavLink>
            <NavLink className="w-full flex justify-center p-3 hover:text-primary-light border-b-2 hover:border-b-primary-light border-b-white" to="/events">Events</NavLink>
            <NavLink className="w-full flex justify-center p-3 hover:text-primary-light border-b-2 hover:border-b-primary-light border-b-white" to="/communicationhub">Communication Hub</NavLink>
            <NavLink className="w-full flex justify-center p-3 hover:text-primary-light border-b-2 hover:border-b-primary-light border-b-white" to="/gallery">Gallery</NavLink>
          </div>
          <div className="bottom flex gap-6 absolute bottom-8">
            <div className="settings hover:text-primary-light text-lg cursor-pointer">
              <p>Settings</p>
            </div>
            <div className="support hover:text-primary-light text-lg cursor-pointer">
              <p>Support Center</p>
            </div>
          </div>
        </motion.div>
  }
        </AnimatePresence>
    </>
  </>
  );
}

export default MobileMenu