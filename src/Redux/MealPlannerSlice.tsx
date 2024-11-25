import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CustomData{
    id: number;
    image: string;
    imageType: string;
    title: string;
    isSuggesting: boolean;
}

interface SuggestedMeal{
    id: string
    datePicker: Date;
    suggestedBy: string;
    timeSelector: string;
    mealTitle: string;
}

const mealsSample: SuggestedMeal[] = [
    {
        id: '1',
        datePicker: new Date('2024-11-25'),
        suggestedBy: 'Alice',
        timeSelector: 'Dinner',
        mealTitle: 'Spaghetti Bolognese'
    },
    {
        id: '2',
        datePicker: new Date('2024-11-26'),
        suggestedBy: 'Bob',
        timeSelector: 'Lunch',
        mealTitle: 'Chicken Caesar Salad'
    },
    {
        id: '3',
        datePicker: new Date('2024-11-27'),
        suggestedBy: 'Charlie',
        timeSelector: 'Breakfast',
        mealTitle: 'Pancakes with Maple Syrup'
    },
    {
        id: '4',
        datePicker: new Date('2024-11-28'),
        suggestedBy: 'Diana',
        timeSelector: 'Random Snack',
        mealTitle: 'Fruit Salad'
    },
    {
        id: '5',
        datePicker: new Date('2024-11-29'),
        suggestedBy: 'Eve',
        timeSelector: 'Dinner',
        mealTitle: 'Grilled Salmon with Asparagus'
    },
    {
        id: '6',
        datePicker: new Date('2024-11-30'),
        suggestedBy: 'Frank',
        timeSelector: 'Lunch',
        mealTitle: 'Vegetable Stir Fry'
    },
    {
        id: '7',
        datePicker: new Date('2024-12-01'),
        suggestedBy: 'Grace',
        timeSelector: 'Breakfast',
        mealTitle: 'Omelette with Cheese and Herbs'
    }
];

const initialState = {
    customData: [] as CustomData[],
    suggestedMeals: mealsSample as SuggestedMeal[],
    isSuggestedMealsDisplayOpen: false
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
        },
        addSuggestedMeal: (state, action: PayloadAction<SuggestedMeal> ) => {
            state.suggestedMeals.push(action.payload)
        },
        removeSuggestedMeal: (state, action) => {
           const mealToRemoveIndex = state.suggestedMeals.findIndex((meal) => {
              return  meal.id === action.payload
            })
            if(mealToRemoveIndex !== -1){
                state.suggestedMeals.splice(mealToRemoveIndex, 1)
            }
        },
        openSuggestedMeals: (state) => {
            state.isSuggestedMealsDisplayOpen = true;
        }, 
        closeSuggestedMeals: (state) => {
            state.isSuggestedMealsDisplayOpen = false;
        }
    }

})


export const { fetchMealData, isSuggestingFalse, removeSuggestedMeal, openSuggestedMeals, closeSuggestedMeals,
     isSuggestingTrue, addSuggestedMeal } = mealPlannerSlice.actions
export default mealPlannerSlice.reducer
