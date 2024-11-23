import { configureStore } from "@reduxjs/toolkit";
import NavReducer from "./NavSlice"
import communicationHubReducer from "./CommunicationHubSlice"
import gallerySliceReducer from "./GallerySlice"
import familyBudgetReducer from "./FamilyBudgetSlice"
import pantryReducer from "./PantrySlice"
import mealPlannerReducer from "./MealPlannerSlice"
import eventsReducer from "./EventsSlice"

const store = configureStore({
    reducer: {
        navigation: NavReducer,
        communicationHub: communicationHubReducer,
        gallery: gallerySliceReducer,
        FamilyBudget: familyBudgetReducer,
        pantry: pantryReducer,
        mealPlanner: mealPlannerReducer,
        events: eventsReducer
    }
})


export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store;