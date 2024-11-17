import { createSlice } from "@reduxjs/toolkit";



const initialState = {
    enlargeModalState: false,
}


const gallerySlice = createSlice({
    name: "gallery",
    initialState,
    reducers: {
       enlargeModalClosed: (state) => {
        state.enlargeModalState = false
       },
       enlargeModalOpen: (state) => {
        state.enlargeModalState = true
       }
    },
})

export default gallerySlice.reducer
export const {enlargeModalClosed, enlargeModalOpen} = gallerySlice.actions