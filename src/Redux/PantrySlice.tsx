import { createSlice } from "@reduxjs/toolkit";


interface groceryItem {
    id: string
    groceryItem:string
}

const initialState = {
isAddGroceryOpen: false,
GroceryList: [] as groceryItem[]
}

const PantrySlice = createSlice({
    name: "pantry",
    initialState,
    reducers:{
        addGroceryItem: (state, action) => {
            state.GroceryList.push(action.payload)
        },
        deleteGroceryItem: (state, action) => {
           const itemToDelete = state.GroceryList.findIndex((item:groceryItem) => item.id === action.payload)

            if(itemToDelete >= 0){
             state.GroceryList.splice(itemToDelete, 1)
            } 
        }
    }
})


export const {addGroceryItem, deleteGroceryItem} = PantrySlice.actions
export default PantrySlice.reducer
