import calendarIcon from "../../../assets/calendar-svgrepo-com (1).svg"
import { useTypedSelector } from "../../../Redux/ReduxHooks"
import { PiCaretDoubleDownThin, PiCaretDoubleUpThin } from "react-icons/pi";
import { useState } from "react";
import { motion, AnimatePresence, easeInOut } from "framer-motion";


function EventsManager() {
    const eventsCollection = useTypedSelector((state) => state.events.eventsCollection)
    const modifiedEventsCollection = eventsCollection.map((eventItem) => {
        return {
            ...eventItem, showMore: false
        }
    })
    const [events, setEvents] = useState(modifiedEventsCollection)

    function handleDateDisplay(date:Date){
        const dateOptions:Intl.DateTimeFormatOptions = { weekday: "long", month: "long", day: "numeric", year: "numeric"}
        const dateString = date.toLocaleDateString("en-US", dateOptions)
        
        const timeOptions:Intl.DateTimeFormatOptions = {hour:"numeric", minute: "numeric", hour12: true, }
        const timeString = date.toLocaleTimeString("en-US", timeOptions)
    
        return {dateString, timeString}
    }

    function toggleEventShowMore(id: string){
      const updatedEvents =  events.map((eventItem) => (
        eventItem.id === id? {...eventItem, showMore: !eventItem.showMore}:
        eventItem
      ))
      setEvents(updatedEvents)
    }

  return (
    <div
    id="eventsManager"
     className="bg-gradient-to-br from-secondary-dark text-white w-[400px] 
     h-[80vh] flex flex-col items-center rounded-md p-2 via-black to-primary-light">
    <div className="top flex mb-4 items-center gap-2">
        <img
        className="h-16"
         src={calendarIcon} alt="calendar icon" />
        <p className="font-atma text-2xl">Event Manager</p>
    </div>
    <div className="w-full overflow-y-auto scrollbar-thin scrollbar-thumb-orange-600 scrollbar-track-gray-300 scrollbar-thumb-rounded-md text-secondary-dark font-quicksand flex items-center flex-col gap-3 ">
        {events.map((eventItem) => {
            return(
                <div 
                key={eventItem.id}
                className="event-container border border-primary-light p-2 flex flex-col items-start gap-1 w-full bg-white rounded-md">
                    <div className="flex flex-col items-start gap-1">
                    <p className="font-atma text-xl">{eventItem.title}</p>
                    <p>{handleDateDisplay(eventItem.date).dateString}</p>
                    </div>
                    <AnimatePresence mode="wait">
                    {eventItem.showMore && 
                        (<motion.div
                        initial={{opacity:0}}
                        animate={{opacity:1}}
                        exit={{opacity:0}}
                        transition={{duration: .5, ease:easeInOut}}
                         className="flex flex-col items-start gap-1">
                        <p className="font-atma text-lg">{eventItem.eventType}</p>
                        <p>
                            <span className="font-semibold">Time: </span>
                            <span className="font-atma">{handleDateDisplay(eventItem.date).timeString}</span>
                        </p>
                        <p>
                            <span className="font-semibold">Location: </span>
                            <span>{eventItem.location}</span> </p>
                        <p><span className="font-semibold">Event Note: </span>{eventItem.description}</p>
                        </motion.div>)
                    }
                    </AnimatePresence>
                    
                   {eventItem.showMore? 
                   <div 
                    onClick={() => toggleEventShowMore(eventItem.id)}
                   className="flex cursor-pointer items-center gap-2">
                        <PiCaretDoubleUpThin
                        className="h-16"
                        />
                        <button className="font-atma">Show Less</button>
                    </div>:
                    <div
                     onClick={() => toggleEventShowMore(eventItem.id)}
                    className="flex cursor-pointer items-center gap-2">
                        <PiCaretDoubleDownThin
                        className="h-16"
                        />
                        <button className="font-atma">Show More</button>
                    </div>
                
                } 
                    
                </div>
            )
        })}
    </div>
     </div>
  )
}

export default EventsManager