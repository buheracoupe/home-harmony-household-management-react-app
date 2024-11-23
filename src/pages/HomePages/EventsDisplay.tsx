import { useEffect, useState } from "react"
import calendarIcon from "../../assets/calendar-svgrepo-com.svg"
import { useTypedSelector } from "../../Redux/ReduxHooks"
import { NavLink } from "react-router-dom"
import { motion, AnimatePresence, easeInOut } from "framer-motion"

interface DisplayEvent{
    title?:string;
    date?: {dateString: string, timeString: string};
    eventType?: string;
}


function EventsDisplay() {
const eventsCollection = useTypedSelector((state) => state.events.eventsCollection)
const [displayEvent, setDisplayEvent] = useState<DisplayEvent>({
    title: "loading events....",
    date: undefined,
    eventType: undefined
})

function handleDateDisplay(date:Date){
    const dateOptions:Intl.DateTimeFormatOptions = { weekday: "long", month: "long", day: "numeric", year: "numeric"}
    const dateString = date.toLocaleDateString("en-US", dateOptions)
    
    const timeOptions:Intl.DateTimeFormatOptions = {hour:"numeric", minute: "numeric", hour12: true, }
    const timeString = date.toLocaleTimeString("en-US", timeOptions)

    return {dateString, timeString}
}

useEffect(() => {

    if(eventsCollection.length < 1) return

    const intervalId = setInterval(() => {
        const randomEventIndex = (Math.floor(Math.random()*eventsCollection.length))
        const randomEvent = eventsCollection[randomEventIndex]
        const dateAndTime = handleDateDisplay(randomEvent.date)
        const eventToDisplay = {
            title:randomEvent.title,
            date: dateAndTime,
            eventType: randomEvent.eventType
        }
        setDisplayEvent(eventToDisplay)
    }, 5000)


    return () => clearInterval(intervalId)
}, [eventsCollection])

  return (
    <div className="w-full overflow-y-hidden flex flex-col items-center after:absolute h-[220px] text-white relative after:z-0 after:inset-0
     after:bg-black after:opacity-50 rounded-md p-2 bg-gradient-to-bl from-secondary-dark via-primary-light to-yellow-400">
        <div className=" rounded-md flex items-center flex-col z-10">
        <div className="flex gap-3 items-center">
            <p className="font-atma text-2xl">Upcoming Events</p>
            <img
            className="h-12"
             src={calendarIcon} alt="calendar icon" />
        </div>
        <AnimatePresence mode="wait">
            <motion.div
            // animation was not working due to the absence of a key prop, essential for re-rendering hence animations
            key={displayEvent.title}
            initial={{opacity:0, y:-200}}
            animate={{opacity:1, y:0}}
            exit={{opacity: 0, y:200}}
            transition={{duration: .5, ease: easeInOut}}
            className="flex flex-col items-start gap-2">
            <p className="font-abel font-semibold text-lg">{displayEvent.title}</p> 
            {displayEvent.title !==  "loading events...." &&
                (<div className="flex flex-col gap-2 items-start font-quicksand">
                    <p>{displayEvent.date?.dateString} at {displayEvent.date?.timeString}</p>
                    <p className="font-atma text-lg">{displayEvent.eventType}</p>
            </div>)}
            </motion.div>
        </AnimatePresence>
        <NavLink to="/events#eventsManager" 
        className="p-2 font-atma rounded-md m-3 text-black bg-yellow-300  hover:text-white hover:bg-secondary-dark
        absolute bottom-0 left-1/2 -translate-x-1/2 transition-all duration-300">See All</NavLink>
        </div>
    </div>
  )
}

export default EventsDisplay

// for event manager have the option to set reminder and delete event and challenge yourself with an edit event option