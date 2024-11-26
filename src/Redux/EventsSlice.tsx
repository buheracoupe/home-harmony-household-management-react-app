import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Event{
    id:string;
    date: number;
    description: string;
    eventType: string;
    location: string;
    title:string;
}



const initialState = {
eventsCollection: [] as Event[],
eventsModifier: false,
isEventFormOpen: false
}

const eventsSlice = createSlice({
    name: "events",
    initialState,
    reducers: {
        addEvent:(state, action: PayloadAction<Event>) => {
            state.eventsCollection.push(action.payload)
        },
        deleteEvent:(state, action) => {
         const eventToDeleteIndex = state.eventsCollection.findIndex((eventItem) => {
             return eventItem.id === action.payload
            })
        state.eventsCollection.splice(eventToDeleteIndex, 1)
        },
        openEventsModifer:(state) => {
            state.eventsModifier = true
        },
        closeEventsModifier: (state) => {
            state.eventsModifier = false
        },
        openEventsForm: (state) => {
            state.isEventFormOpen = true
        },
        closeEventsForm: (state) => {
            state.isEventFormOpen = false
        }
    }

})

export const {addEvent, deleteEvent, openEventsModifer, openEventsForm, closeEventsForm, closeEventsModifier} = eventsSlice.actions
export default eventsSlice.reducer