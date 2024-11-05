import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    mobileNavState: false,
}

const NavSlice = createSlice({
    name: "navigation",
    initialState,
    reducers: {
        openMobileNav: (state) => {
            state.mobileNavState = true},
        closeMobileNav: (state) => {
            state.mobileNavState = false},
    }

})

export const { openMobileNav, closeMobileNav } = NavSlice.actions;
export default NavSlice.reducer;