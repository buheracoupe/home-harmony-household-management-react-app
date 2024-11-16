import { configureStore } from "@reduxjs/toolkit";
import NavReducer from "./NavSlice"
import communicationHubReducer from "./CommunicationHubSlice"

const store = configureStore({
    reducer: {
        navigation: NavReducer,
        communicationHub: communicationHubReducer,
    }
})


export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store;