import EventsManager from "./EventsManager"
import EventCalendar from "./EventCalendar"
function Events() {
  return (
    <div className="p-2 pt-20 md:pt-2 items-center flex flex-col md:flex-row gap-2">
      <EventsManager/>
      <EventCalendar/>
    </div>
  )
}

export default Events