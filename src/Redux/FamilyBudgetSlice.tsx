import { createSlice, PayloadAction } from "@reduxjs/toolkit";



interface BudgetEntry{
    id: string,
    item:string,
    emoji: string,
    amount: string;
    creator: string;
    }


const initialState = {
    totalFamilyBudget: 1000,
    budgetEntries: [] as BudgetEntry[],
    totalExpenses: 0,
    totalRevenue: 0,
    budgetFormShowing:false,
    isEmojiPanOpen: false
}

const FamilyBudgetSlice = createSlice({
    name: "FamilyBudget",
    initialState,
    reducers: {
    accountForExpense: (state, action) => {
        state.totalFamilyBudget -= action.payload
        state.totalExpenses += action.payload
    },
    accountForRevenue: (state, action) => {
        state.totalFamilyBudget += action.payload
        state.totalRevenue += action.payload
    },
    addBudgetEntry: (state, action: PayloadAction<BudgetEntry>) => {
        state.budgetEntries.push(action.payload)
    },
    changeBudgetFormState: (state, action) => {
        state.budgetFormShowing = action.payload
    },
    changeEmojiPanState: (state, action) => {
        state.isEmojiPanOpen = action.payload
    },

    }
})

export const {accountForExpense, accountForRevenue, changeEmojiPanState, addBudgetEntry, changeBudgetFormState} = FamilyBudgetSlice.actions
export default FamilyBudgetSlice.reducer
