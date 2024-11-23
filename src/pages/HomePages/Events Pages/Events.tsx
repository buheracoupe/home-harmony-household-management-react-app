import EventsForm from "./EventsForm"
import EventsManager from "./EventsManager"

function Events() {
  return (
    <div className="p-2 flex gap-2">
      <EventsManager/>
      <EventsForm/>
    </div>
  )
}

export default Events