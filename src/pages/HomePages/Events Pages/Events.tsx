import EventsForm from "./EventsForm"
import EventsManager from "./EventsManager"

function Events() {
  return (
    <div className="p-2">
      <EventsForm/>
      <EventsManager/>
    </div>
  )
}

export default Events