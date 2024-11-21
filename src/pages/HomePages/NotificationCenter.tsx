import { useTypedSelector } from '../../Redux/ReduxHooks';
import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import alertSVG from "../../assets/alert-svgrepo-com.svg"
import { formatTimestamp } from '../CommunicationHub';


function NotificationCenter() {
    const notifications = useTypedSelector((state) => state.communicationHub.notifications)
    const [displayNotification1, setDisplayNotification1] = useState<{id:string, element: JSX.Element}>({id: "loading", element: <p>Loading Notifications</p>})

    useEffect(() => {
      const intervalID = setInterval(()=> {
        setDisplayNotification1(displayNotification());
      }, 5000)

      return () => clearInterval(intervalID)
    
    }, [notifications] )

const priorityDisplay = {
    High: "text-white bg-red-700 p-1 rounded-md w-16 text-center font-atma",
    Medium: "text-white bg-yellow-500 p-1 rounded-md w-16 text-center font-atma",
    Low: "text-white bg-green-500 p-1 rounded-md w-16 text-center font-atma",
}
    function displayNotification():{id: string, element: JSX.Element}{
      if(notifications.length < 1){
        return (
            {
            id: "default",
            element: (
              <div>No Noitifications Just Yet...</div>
            )}
        )
      }
      const randomIndex = Math.floor(Math.random()*notifications.length)
      const randomNotification = notifications[randomIndex];
      return(
        {id: randomNotification.id,
        element:(<div
        className="notification-item p-2 flex gap-2 items-center">
            <div className="priority flex flex-col gap-1 items-center">
            <p className='font-semibold'>Priority</p>
            <p className={priorityDisplay[randomNotification.priority]}>{randomNotification.priority}</p>
            </div>
          <p>{randomNotification.message}</p>
            <p className='font-abel text-xl opacity-50'>{formatTimestamp(randomNotification.timestamp)}</p>
        </div>)
        }
      )
    }



    return (
      <div className="home-container col-start-1">
        <div
         className="notification-center after:bg-white after:absolute after:h-full after:w-full after:top-0 after:left-0 after:z-0
          after:opacity-70 relative text-secondary-dark min-h-[200px] p-2 rounded-md m-4 w-[400px] bg-gradient-to-br
           from-primary-dark to-secondary-light">
            <div className='z-10 relative'>
            <div className="header flex gap-2 items-center">
            <img className='object-contain h-12 p-1 bg-secondary-light rounded-full' src={alertSVG} alt="alert and clock icon" />
          <h2 className='text-2xl font-bold font-quicksand'>Notifications</h2>
            </div>
          {/* Styled Notification Display */}
        <AnimatePresence mode='wait'>
        <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1}}
        transition={{ duration: .8 }}
        exit={{opacity: 0}}
        key={displayNotification1.id}
        >
            {displayNotification1.element}
        </motion.div>
        </AnimatePresence>
        </div>
        <NavLink to="/communicationhub">
        <button className='p-2 absolute z-10 bottom-4 left-1/2 -translate-x-1/2 text-white rounded-md font-atma bg-primary-dark hover:bg-primary-light'>View All</button>
        </NavLink>
        </div>
      </div>
    )
}

export default NotificationCenter