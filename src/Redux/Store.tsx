import { configureStore, combineReducers } from "@reduxjs/toolkit";
import NavReducer from "./NavSlice"
import communicationHubReducer from "./CommunicationHubSlice"
import gallerySliceReducer from "./GallerySlice"
import familyBudgetReducer from "./FamilyBudgetSlice"
import pantryReducer from "./PantrySlice"
import mealPlannerReducer from "./MealPlannerSlice"
import eventsReducer from "./EventsSlice"
import { persistStore, persistReducer  } from "redux-persist";
import storage from 'redux-persist/lib/storage'

const rootReducer = combineReducers({
    navigation: NavReducer,
    communicationHub: communicationHubReducer,
    gallery: gallerySliceReducer,
    FamilyBudget: familyBudgetReducer,
    pantry: pantryReducer,
    mealPlanner: mealPlannerReducer,
    events: eventsReducer
})

const persistConfig = {
    key: "root",
    storage,
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = configureStore({
    reducer: persistedReducer,
})

const persistor = persistStore(store)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export {store, persistor}