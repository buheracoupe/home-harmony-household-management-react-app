import { CiTrash } from "react-icons/ci";
import { IoMdClose } from "react-icons/io";
import { useTypedSelector, useAppDispatch } from '../Redux/ReduxHooks';
import { closeNotificationModal, openNotificationModal, addNotification, removeNotification } from '../Redux/CommunicationHubSlice';
import { useState } from 'react';
import { nanoid } from "nanoid";





export function formatTimestamp(timestamp: Date): string{
  const now = new Date();
  const notificationDate = new Date(timestamp)

  const startofToday = new Date(now.getFullYear(), now.getMonth(), now.getDate())
  const startofYesterday = new Date(now.getFullYear(), now.getMonth(),now.getDate() -1)

  if(notificationDate >= startofToday){
    return "Today"
  }else if(notificationDate >= startofYesterday){
    return "Yesterday"
  }else{
    return `${notificationDate.getDate()}/${notificationDate.getMonth() +1}`
  }

}



function CommunicationHub() {
  const dispatch = useAppDispatch();
  const notificationModalState = useTypedSelector((state) => state.communicationHub.notificationModalState)
  const notifications = useTypedSelector((state) => state.communicationHub.notifications)
  return (
    <div className="comms">
      <div className="notification-console min-h-[300px] w-[500px] border-2 flex flex-col justify-between p-4 items-center rounded-md border-secondary-light h-auto shadow-lg text-secondary-dark font-quicksand">
      <h2 className='font-atma mb-4 text-3xl'>Notification Hub</h2>
      {notifications.length === 0 ?
       <p className='text-lg text-gray-600'>No Notifications Available Just Yet...</p>
       :<div className="notifications">
      {notifications.map((notification) => {

        const priorityStyles = {
          High: 'text-red-700 font-bold text-sm p-1',
          Medium: 'text-yellow-500 font-bold text-sm p-1',
          Low: 'text-green-700 font-bold text-sm p-1',
        };

        return(
          <div key={notification.id} className="notification-item mb-4 group flex justify-between items-center gap-4">
            <div className="priority flex items-start flex-col gap-1">
              <p className='text-sm font-semibold'>Priority</p>
              <p className={priorityStyles[notification.priority]}>{notification.priority}</p>
            </div>
            <p className=''>{notification.message}</p>
            <div className="right flex gap-2 items-center">
            <p className='text-slate-400 font-abel'>{formatTimestamp(notification.timestamp)}</p>
              <CiTrash
              onClick={() => dispatch(removeNotification(notification.id))}
               className=' cursor-pointer text-secondary-dark text-2xl hover:text-primary-dark hover:transform hover:scale-110 transition-all duration-300' />
              </div>
          </div>
        )
      })}
      </div>}
      <div className="input-notification flex">
        <button
        onClick={() => dispatch(openNotificationModal())}
         className='text-white p-2 bg-primary-dark w-40 rounded-md hover:font-semibold hover:bg-primary-light'>Add Notification</button>
      </div>
      </div>
      {notificationModalState && <NotificationModal/>}
    </div>
  )
}





export function NotificationModal(){
const [priority, setPriority] = useState<string>("");
const dispatch = useAppDispatch();
  const [message, setMessage] = useState("");

function submitNotification(priority: string){
  dispatch(addNotification(
    {
      id: nanoid(),
      priority: priority,
      message: message,
      timestamp: new Date(),
    }
  ))
}

  return(
    <div
    onClick={(event) => event.stopPropagation()}
     className="modal fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-md p-3 bg-white ring-black w-[500px] h-[300px]">
      <div
      className='flex flex-col gap-5'>
        <IoMdClose
         onClick={() => dispatch(closeNotificationModal())}
         className='absolute top-4 right-4 hover:text-primary-light text-2xl cursor-pointer' />
         <h2 className='text-secondary-dark font-atma text-2xl font-semibold'>Add Notification</h2>
        <input
         required
         onChange={(event) => setMessage(event.target.value)}
         value={message}
          className='border-2 rounded-md border-slate-300 p-2 focus:outline-primary'
          type="text"
          placeholder="Enter Your Notification Here..."/>
        <div className="priority flex flex-col gap-2">
          <p className='font-semibold font-atma'>Priority</p>
          <div className="priority-selectors flex gap-2 items-center">
            <button
            onClick={(event) => {
              setPriority("High")
              event.preventDefault();
            }}
            className={`p-1 rounded-md border-2 w-20 ${priority === "High" ?
             'bg-red-700 text-white border-red-700' : 'bg-white text-red-700 border-red-700'}`}>High</button>
            <button
            onClick={(event) => {
              setPriority("Medium")
              event.preventDefault();
            }}
            className={`p-1 rounded-md border-2 w-20 ${priority === "Medium" ?
             'bg-yellow-500 text-white border-yellow-500' : 'bg-white text-yellow-500 border-yellow-500'}`}>Medium</button>
            <button
            onClick={(event) => {
              setPriority("Low")
              event.preventDefault();
            }}
            className={`p-1 rounded-md border-2 w-20 ${priority === "Low" ?
             'bg-green-500 text-white border-green-500' : 'bg-white text-green-500 border-green-500'}`}>Low</button>
          </div>
        </div>
        <button
         onClick={() => {
          submitNotification(priority)
         dispatch(closeNotificationModal())}
        }
         className='p-2 absolute bottom-5 right-4 rounded-md text-white bg-secondary hover:bg-primary-light' type="submit">Add Notification</button>
      </div>
    </div>
  )
}



export default CommunicationHub
