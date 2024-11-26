import { useTypedSelector, useAppDispatch } from "../../Redux/ReduxHooks"
import { PiCaretDoubleDownThin, PiCaretDoubleUpThin } from "react-icons/pi";
import { useEffect, useState } from "react";
import { motion, AnimatePresence, easeInOut } from "framer-motion";
import settingIcon from "../../assets/settings-svgrepo-com.svg"
import { IoIosRemoveCircle } from "react-icons/io";
import { deleteEvent, openEventsModifer, closeEventsModifier, openEventsForm } from "../../Redux/EventsSlice";
import { IoAddOutline } from "react-icons/io5";
import EventsForm from "./EventsForm";
import calendarIcon from "../../assets/calendar-svgrepo-com (1).svg"

interface ModifiedEvent{
    showMore: boolean;
    id: string;
    date: number;
    description: string;
    eventType: string;
    location: string;
    title: string;
}
function EventsManager() {
    const eventsCollection = useTypedSelector((state) => state.events.eventsCollection)
    const eventsModifierState = useTypedSelector((state) => state.events.eventsModifier)
    const eventsFormState = useTypedSelector((state) => state.events.isEventFormOpen)
    const dispatch = useAppDispatch()
    const [events, setEvents] = useState<ModifiedEvent[]>([])


    useEffect(() => {
        console.log(eventsCollection)
        const modifiedEventsCollection = eventsCollection.map((eventItem) => {
            return {
                ...eventItem, showMore: false
            }
        }).sort((a,b) => a.date - b.date)
        setEvents(modifiedEventsCollection)
    }, [eventsCollection])


    function handleDateDisplay(date:number){
        const dateOptions:Intl.DateTimeFormatOptions = { weekday: "long", month: "long", day: "numeric", year: "numeric"}
        const dateString = new Date(date).toLocaleDateString("en-US", dateOptions)
        
        const timeOptions:Intl.DateTimeFormatOptions = {hour:"numeric", minute: "numeric", hour12: true, }
        const timeString = new Date(date).toLocaleTimeString("en-US", timeOptions)
    
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
     className="bg-gradient-to-br relative from-secondary-dark text-white w-[450px] 
     h-[80vh] flex flex-col items-center rounded-md p-2 via-black to-primary-light">
        <div 
        onClick={() => dispatch(openEventsForm())}
        className="text-orange-700 absolute left-4 flex gap-1 cursor-pointer top-2 hover:text-yellow-600">
            <IoAddOutline className="text-2xl"/>
            <p className="font-atma">Add Event</p>
        </div>
        {eventsFormState &&<div className="eventFormOverlay fixed inset-0 bg-black opacity-90 z-30"></div>}
        <EventsForm/>
        <p
        onClick={() => dispatch(openEventsModifer()) }
         className="font-atma hover:text-yellow-600 absolute top-2 right-4 cursor-pointer text-orange-700">Manage Events</p>

             <div>
            <AnimatePresence mode="wait">
             {eventsModifierState &&
            <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6, backdropFilter: "blur(39px)" }}
            exit={{ opacity: 0, backdropFilter: "none" }}
            transition={{duration: .5, ease: easeInOut}}
            className="overlay fixed inset-0 z-30 bg-black backdrop-blur-sm">
            </motion.div>}
            </AnimatePresence>
            <EventsModifier eventsModifierState={eventsModifierState}/>
             </div>
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

 interface EventsModifierProps{
    eventsModifierState: boolean
 }

export default EventsManager

 export function EventsModifier({eventsModifierState}: EventsModifierProps){
    const eventsCollection = useTypedSelector((state) => state.events.eventsCollection)
    const dispatch = useAppDispatch()
    return (
        <AnimatePresence mode="wait">
        {eventsModifierState &&
        <motion.div
        key={"thisistheuniquekey"}
        initial={{opacity:0}}
        animate={{opacity:1}}
        exit={{opacity: 0}}
        transition={{duration: .5, ease: easeInOut}}
        onClick={(event) => event.stopPropagation()}
         className="bg-white text-secondary-dark font-quicksand  z-40 p-3 fixed flex flex-col items-center
          rounded-md w-[400px] h-[70vh] left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" >
            <div className="flex items-center gap-2">
                <p className="font-atma text-2xl">Manage Events</p>
                <img
                className="h-12" 
                src={settingIcon} alt="setting icon" />
            </div>
            <div className="w-full px-12 overflow-y-auto flex flex-col gap-3">
                {eventsCollection.map((eventItem) => {
                    return (
                        <div className="flex group items-center border-b border-b-secondary-light pb-4 justify-between">
                            <p className=" group-hover:font-semibold">{eventItem.title}</p>
                            <IoIosRemoveCircle
                            onClick={() => dispatch(deleteEvent(eventItem.id)) }
                            className="text-red-600 text-lg cursor-pointer transition-all duration-300 hover:scale-125 hover:text-red-700"
                            />
                        </div>
                    )
                })}
            </div>
            <button 
            onClick={() => dispatch(closeEventsModifier())}
            className="p-2 font-atma bg-yellow-300 text-black hover:text-white hover:bg-secondary
            rounded-md absolute left-1/2 -translate-x-1/2 bottom-3 transition-all duration-300">Close Manager</button>
        </motion.div>}
        </AnimatePresence>
    )
}