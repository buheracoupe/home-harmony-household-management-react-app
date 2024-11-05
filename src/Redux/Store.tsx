import { configureStore } from "@reduxjs/toolkit";
import NavReducer from "./NavSlice"

const store = configureStore({
    reducer: {
        navigation: NavReducer,
    }
})


export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store;