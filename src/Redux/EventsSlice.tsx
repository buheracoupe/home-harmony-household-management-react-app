import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Event{
    date: Date;
    description: string;
    eventType: string;
    location: string;
    title:string;
}

const eventsSample:Event[] = [
    {
        date: new Date('2024-12-01T15:00:00'),
        description: 'Annual family reunion with games and food.',
        eventType: 'Family Gathering',
        location: 'Dalicia Ristorante and Bakery, Mechanicsburg, PA',
        title: 'Family Reunion 2024'
    },
    {
        date: new Date('2024-11-30T09:00:00'),
        description: 'A day of hiking and outdoor fun at the national park.',
        eventType: 'Outdoor Activities',
        location: 'Ricketts Glen State Park, Benton, PA',
        title: 'Hiking Adventure'
    },
    {
        date: new Date('2024-12-05T10:00:00'),
        description: 'Volunteering at the local shelter to help those in need.',
        eventType: 'Community Service',
        location: 'City Shelter',
        title: 'Volunteer Day'
    },
    {
        date: new Date('2024-12-10T18:00:00'),
        description: 'Holiday party with friends and family.',
        eventType: 'Social Gathering',
        location: 'Community Center, Springfield',
        title: 'Holiday Celebration'
    },
    {
        date: new Date('2024-12-15T14:00:00'),
        description: 'Workshop on sustainable gardening practices.',
        eventType: 'Educational Workshop',
        location: 'Local Library',
        title: 'Gardening Workshop'
    },
    {
        date: new Date('2024-12-20T09:00:00'),
        description: 'Annual charity run to support local charities.',
        eventType: 'Charity Event',
        location: 'City Park, Philadelphia',
        title: 'Charity Run 2024'
    },
    {
        date: new Date('2024-12-25T12:00:00'),
        description: 'Christmas dinner with family and friends.',
        eventType: 'Family Gathering',
        location: 'Home',
        title: 'Christmas Dinner'
    }
];

const initialState = {
eventsCollection: eventsSample as Event[]
}

const eventsSlice = createSlice({
    name: "events",
    initialState,
    reducers: {
        addEvent:(state, action: PayloadAction<Event>) => {
            state.eventsCollection.push(action.payload)
        }
    }

})

export const {addEvent} = eventsSlice.actions
export default eventsSlice.reducer