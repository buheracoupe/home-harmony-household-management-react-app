import { createSlice, PayloadAction } from "@reduxjs/toolkit";


const initialGroceryList = [
    {
        id: '1',
        groceryItem: 'Organic Avocados',
        isEditing: false,
    },
    {
        id: '2',
        groceryItem: 'Whole Grain Bread',
        isEditing: false,
    },
    {
        id: '3',
        groceryItem: 'Almond Milk (Unsweetened)',
        isEditing: false,
    },
    {
        id: '4',
        groceryItem: 'Dark Chocolate (70% Cocoa)',
        isEditing: false,
    },
];

interface groceryItem {
    id: string
    groceryItem:string
    isEditing: boolean
}

const initialState = {
isAddGroceryOpen: false,
GroceryList: initialGroceryList as groceryItem[],
customData: []
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
        },
        allowEditing: (state, action) => {
          const itemToEdit =  state.GroceryList.find((item) => item.id === action.payload)
           if(itemToEdit){
            itemToEdit.isEditing = true
           }
        },
        stopEditing: (state, action) => {
            const itemToStopEditing = state.GroceryList.find((item) => item.id === action.payload)
            if(itemToStopEditing){
                itemToStopEditing.isEditing = false
            }
        },
        updateItem: (state, action: PayloadAction<{id: string, update: string}>) => {
            // payload will be an object with item id and input value
        const itemToUpdate = state.GroceryList.find((item) => item.id === action.payload.id)
        if(itemToUpdate){
            itemToUpdate.groceryItem = action.payload.update
        }
        }
    }
})


export const {addGroceryItem, deleteGroceryItem, updateItem, allowEditing, stopEditing} = PantrySlice.actions
export default PantrySlice.reducer
