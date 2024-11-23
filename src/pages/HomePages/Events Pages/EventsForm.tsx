import EventsIcon from "../../../assets/event-calender-date-note-svgrepo-com.svg"
import { useForm, Controller } from "react-hook-form"
import Select from "react-select"
import { ErrorMessage } from "@hookform/error-message"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css";
import { CiCalendarDate } from "react-icons/ci";
import { FileUpload } from 'primereact/fileupload';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css'; 
import { useAppDispatch } from "../../../Redux/ReduxHooks"
import { addEvent } from "../../../Redux/EventsSlice"
import { nanoid } from "nanoid"

interface FormData{
    date: Date;
    description: string;
    eventType: {value: string, label:string};
    location: string;
    title:string;
    uploadFiles:string;
}


const typeOptions = [
    {value: "Family Gathering", label: "Family Gathering"},
    {value:"Outdoor Activities", label: "Outdoor Activities"},
    {value:"Community Service", label: "Community Service"},
    {value:"Barbecue/Cookout", label: "Barbecue/Cookout"},
    {value:"School/Work related", label:"School/Work related"},
    {value:"Other", label:"Other"}
]


function EventsForm() {
    const {register, handleSubmit, control, reset, formState:{errors}} = useForm<FormData>()
    const dispatch = useAppDispatch()

    function onSubmit(data: FormData){
        console.log(data)
        reset()
        const event = {
            id: nanoid(),
            date:data.date,
            description: data.description,
            eventType: data.eventType.value,
            location: data.location,
            title: data.title
        }

        dispatch(addEvent(event))
    }

  return (
    <form 
    onSubmit={handleSubmit(onSubmit)}
    className="rounded-md flex flex-col items-center relative w-[600px] p-4 h-[75vh] font-quicksand shadow-black shadow-2xl text-black">
        <div className="top flex gap-3 mb-4 items-center ">
            <img
            className="h-16"
            src={EventsIcon} alt="" />
            <p className="font-atma text-3xl">Event Form</p>
        </div>
        <div className="FormFields grid grid-cols-2">
        <div className="flex flex-col items-start">
        <div className="title flex items-center gap-1">
            <label htmlFor="title">Title:</label>
            <input
            placeholder="Enter event title here..."
            id="title"
            {...register("title", {required: "A title for the event is required!"})}
            className="border placeholder:text-sm border-gray-500 rounded-md focus:outline-primary-dark p-1"
             type="text" />
        </div>
        <ErrorMessage
        name="title"
        errors={errors}
        render={({message}) => (<span className="text-red-700 font-quicksand">{message}</span>)}
        />
        </div>
        <div className="flex flex-col items-start">
        <div className="flex items-center gap-1">
            <label htmlFor="location">Location:</label>
            <input
            placeholder="Enter event location here..."
            className="border border-gray-500 placeholder:text-sm rounded-md p-1"
            {...register("location", {required: "Event location is required"})}
             type="text" />
        </div>
        <ErrorMessage
        name="location"
        errors={errors}
        render={({message}) => (<span className="text-red-700 font-quicksand">{message}</span>)}
        />
        </div>
        <div className="mt-4">
            <label htmlFor="eventType">Type:</label>
            <Controller
            name="eventType"
            control={control}
            rules={{required: "An Event Type is required!"}}
            render={({field}) => (
                <Select
                id="eventType"
                className="placeholder:text-sm w-60"
                options={typeOptions}
                isClearable
                placeholder="Select an Event Type"
                {...field}
                />
            )}
            />
            <ErrorMessage
        name="eventType"
        errors={errors}
        render={({message}) => (<span className="text-red-700 font-quicksand">{message}</span>)}

        />
        </div>
        <div className="mt-4">
            <div>
            <label htmlFor="date">Set a date and time for the Event:</label>
            <Controller
            name="date"
            control={control}
            rules={{required: "A date and time for the Event are required"}}
            render={({field: {value, onChange, onBlur}}) => (
                <div className="flex border justify-center w-52 cursor-pointer h-8 border-gray-500 rounded-md items-center">
                    <DatePicker
                        id="date"
                        onChange={onChange}
                        onBlur={onBlur}
                        selected={value}
                        showTimeSelect
                        minDate={new Date()}
                        placeholderText="Select Date and Time"
                        className="px-1 w-40 placeholder:text-sm"
                        dateFormat="MM/dd/yyyy h:mm aa"
                    />
                    <CiCalendarDate className="text-3xl text-gray-500 "/>
                </div>
            )}
            />
            </div>
            <ErrorMessage
            name="date"
            errors={errors}
            render={({message}) => (<span className="text-red-700 font-quicksand">{message}</span>)}
            />
        </div>
        <div className="errorContainer mt-4 flex flex-col items-start">
            <div className="description">
                <label htmlFor="description">Brief Description:</label>
                <textarea
                placeholder="Briefly describe the event...."
                className="border-secondary-dark p-2 rounded-md w-[80%] border"
                {...register("description", {required: "An Event description is required!"})}
                rows={4}
                
                id="description" />
            </div>
            <ErrorMessage
                name="description"
                errors={errors}
                render={({message}) => (<span className="text-red-700 font-quicksand">{message}</span>)}

            />
        </div>
        <div className="uploadFiles flex items-center flex-col mt-4 gap-4">
            <label htmlFor="uploader">Upload Event Files(<span className="text-red-600">Optional</span>)</label>
            <Controller
            control={control}
            name="uploadFiles"
            render={({field}) => (
                <FileUpload
                {...field}
                mode="basic"
                name="event[]"
                accept="image/*"
                className="text-primary-dark"
                />
            )}
             />
        </div>
        </div>

        <button className="font-atma p-2 bg-blue-900 transition-all duration-300 text-white rounded-md
         hover:bg-blue-500 absolute left-1/2 bottom-3 -translate-x-1/2  hover:text-black">Add Event</button>
    </form>
  )
}

export default EventsForm