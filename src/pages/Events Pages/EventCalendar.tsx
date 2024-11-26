import moment from 'moment';
import {Calendar, momentLocalizer} from "react-big-calendar"
import { useTypedSelector } from '../../Redux/ReduxHooks';


const localizer = momentLocalizer(moment);

function EventCalendar() {
  const events = useTypedSelector((state) => state.events.eventsCollection)
  return (
    <div className=' flex-1 max-md:h-[60vh] w-[500px] h-[500px]'>
      <Calendar
      views={['month', 'week', 'day']}
      localizer={localizer}
      events={events}
      startAccessor="date"
      endAccessor="date"
      />
    </div>
  )
}

export default EventCalendar