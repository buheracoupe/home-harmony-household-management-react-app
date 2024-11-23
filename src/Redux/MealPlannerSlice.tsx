import { createSlice } from "@reduxjs/toolkit";

interface CustomData{
    id: number;
    image: string;
    imageType: string;
    title: string;
    isSuggesting: boolean;
}


const initialState = {
    customData: [] as CustomData[]
}

const mealPlannerSlice = createSlice({
    name: "mealPlanner",
    initialState,
    reducers:{
        fetchMealData:(state, action) => {
            state.customData = action.payload
        },
        isSuggestingTrue:(state, action) => {
            const mealToSuggest = state.customData.find((meal) => meal.id === action.payload)
            if(mealToSuggest){
                mealToSuggest.isSuggesting = true
            }
        },
        isSuggestingFalse:(state, action) => {
            const mealToStopSuggesting = state.customData.find((meal) => meal.id === action.payload)
            if(mealToStopSuggesting){
                mealToStopSuggesting.isSuggesting = false
            }
        }
    }

})


export const { fetchMealData } = mealPlannerSlice.actions
export default mealPlannerSlice.reducer
