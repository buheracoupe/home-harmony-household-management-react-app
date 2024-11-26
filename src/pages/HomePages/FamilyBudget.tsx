import familyBudgetIcon from "../../assets/budget-cost-svgrepo-com.svg"
import { BsPlusLg } from "react-icons/bs";
import EmojiPicker, { EmojiClickData } from "emoji-picker-react";
import { useEffect, useState } from "react";
import { VscChromeClose } from "react-icons/vsc";
import { useForm, Controller } from "react-hook-form";
import Select from "react-select";
import coolEmoji from "../../assets/emoji-emoticon-happy-2-svgrepo-com.svg"
import { useTypedSelector, useAppDispatch } from "../../Redux/ReduxHooks";
import { accountForRevenue, accountForExpense, addBudgetEntry, changeBudgetFormState, changeEmojiPanState } from "../../Redux/FamilyBudgetSlice";
import { nanoid } from "nanoid";
import { motion, AnimatePresence, spring, easeInOut } from "framer-motion";
import { ErrorMessage } from "@hookform/error-message";


const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
];



function FamilyBudget() {
    const totalBudget = useTypedSelector((state) => state.FamilyBudget.totalFamilyBudget)
    const budgetEntries = useTypedSelector((state) => state.FamilyBudget.budgetEntries)
    const isBudgetFormShowing = useTypedSelector((state) => state.FamilyBudget.budgetFormShowing)
    const dispatch = useAppDispatch()
    const [currentMonth, setCurrentMonth] = useState("")

    function updateMonth(){
        const now = new Date()
        const thisMonth = now.getMonth()
        const currentMonthName = monthNames[thisMonth]
        setCurrentMonth(currentMonthName)
    }

    useEffect(()=> {
        // initial update
        updateMonth()

        const intervalId = setInterval(() => {
            const now = new Date()
            const date = now.getDate()
            if(date === 1){
                updateMonth()
            }
        }, 86400000 )

        return () => clearInterval(intervalId)
    }, [])

  return (
    <div className='familybudget max-w-[700px] w-full pt-3 relative'>
            <BsPlusLg
            onClick={()=> dispatch(changeBudgetFormState(true)) }
             className="text-yellow-200 transition duration-300 hover:text-yellow-600 absolute top-4 right-3 cursor-pointer text-3xl"/>
        <AnimatePresence>
        {isBudgetFormShowing && (<motion.div
        initial={{opacity: 0, y:-300}}
        animate={{opacity:1, y:0}}
        exit={{opacity:0, y:300}}
        transition={{type: spring, duration: 0.3, ease: easeInOut, dampness: 100 }}
        >
        <BudgetForm />
        </motion.div>)}
        </AnimatePresence>
        <div className="amount flex flex-col items-center gap-1 rounded-t-lg font-atma bg-primary-dark text-white w-full">
            <div className="flex mt-3 items-center gap-4">
            <img className='h-16' src={familyBudgetIcon} alt="Family Budget Icon" />
            <p className="text-xl">Remaining Family Budget</p>
            </div>
            <p className="text-lg">{currentMonth}</p>
            <p className='font-quicksand font-semibold text-2xl'>${totalBudget}</p>
        </div>
        <div className="calculationsData pt-2 flex flex-col min-h-[430px] gap-3 rounded-b-lg bg-secondary-dark">
            {budgetEntries.map((entry) => {
                return (
                    <div key={entry.id} className="flex font-quicksand gap-12 border-2 border-primary-light min-h-16 items-center 
                     px-10 rounded-md justify-between bg-white mx-auto w-[90%] ">
                    <div className="flex gap-12 items-center">
                    <p>{entry.emoji}</p>
                    <div>
                    <p>{entry.item}</p>
                    <p className="text-primary-light text-sm">Created by {entry.creator}</p>
                    </div>
                    </div>
                    <p className="text-lg justify-self-end font-medium">{entry.amount}</p>
                    </div>
                )
            })}
        </div>
    </div>
  )
}

export default FamilyBudget



const options = [
    {value: "Expense", label: "Expense"},
    {value: "Revenue", label: "Revenue"}
];

interface BudgetFormData{
    amount: string;
    budgetItem: string;
    creator: string;
    selectedAccountingMethod: {value: string, label:string}
}


function BudgetForm(){

const {register, handleSubmit, reset, formState: {errors}, control} = useForm<BudgetFormData>()
const [selectedEmoji, setSelectedEmoji] = useState<null | EmojiClickData>(null)
const isEmojiPanOpen = useTypedSelector((state) => state.FamilyBudget.isEmojiPanOpen)
const totalExpenses = useTypedSelector((state) => state.FamilyBudget.totalExpenses)
const totalRevenue = useTypedSelector((state) => state.FamilyBudget.totalExpenses)
// const isBudgetFormShowing = useTypedSelector((state) => state.FamilyBudget.budgetFormShowing)

const dispatch = useAppDispatch()


  function onSubmit(data:BudgetFormData){
const method = data.selectedAccountingMethod.value
// Make calculations
const amount = parseFloat(data.amount)
const netChange = calculateNetChange(amount, method)
console.log(data)
console.log(calculatePercentages(amount, method))

const budgetEntry = {
    id: nanoid(),
    item: data.budgetItem as string,
    emoji: selectedEmoji?.emoji ?? '📝',
    amount: netChange as string,
    creator: data.creator as string
}

dispatch(addBudgetEntry(budgetEntry))
dispatch(changeBudgetFormState(false))
reset()
}

function calculatePercentages(amount: number, method: string){
    let percentage;

if(method === "Expense" && totalExpenses > 0){
    percentage = Math.round((amount/totalExpenses)*100)
    return {percentage, method}
}else if(method === "Revenue" && totalRevenue > 0){
    percentage = Math.round((amount/totalRevenue)*100)
    return {percentage, method}
}

}

function calculateNetChange(amount: number, method: string){
if(method === "Expense"){
    dispatch(accountForExpense(amount))
    const changeInBalance = "-$" + amount
    return changeInBalance
}else if(method === "Revenue"){
    dispatch(accountForRevenue(amount))
    const changeInBalance = "$" + amount
    return changeInBalance
}

}




    return (
        // remember to animate the open and close of the budgetForm
        <div
        onClick={(event) => {
            event.stopPropagation()
            if(isEmojiPanOpen){dispatch(changeEmojiPanState(false))}
        }
        }
         className="form-container  pt-8 absolute top-2 bg-slate-100 z-10 w-[120%] right-2 border-2 pb-2 border-secondary-dark rounded-md">
        <p 
        onClick={()=> reset()}
        className="text-gray-400 absolute top-2 left-3 font-quicksand cursor-pointer ">reset</p>
        <VscChromeClose
        onClick={() => dispatch(changeBudgetFormState(false)) }
         className="text-gray-500 hover:text-secondary-dark absolute top-2 cursor-pointer right-2 text-2xl"/>
        <form 
        onSubmit={handleSubmit(onSubmit)}
        className="flex p-1 text-secondary-dark flex-col font-quicksand gap-4 items-center" action="">
        <p className="text-secondary-dark font-atma text-center text-xl mb-3">Add New Budget Item</p>
        {/* amount and item container */}
        <div className="flex gap-12">
        <div className="item flex flex-col items-start w-1/2">
        <label
        className="text-[.9rem]"
         htmlFor="item">
             Item:
        </label>
        <input
         type="text"
         id="item"
         {...register("budgetItem", {required: "Item is required!"})}
         className="border-2 p-2 border-primary-light rounded-md focus:outline-primary-dark"
           />
        <ErrorMessage
        name="budgetItem"
        errors={errors}
        render={({message}) => <p className="text-red-700">{message}</p>}
        />
        </div>
        <div className="amount flex flex-col items-start">
            <label
            className="text-[.9rem] "
            htmlFor="amount">Amount:</label>
            <div className="flex gap-1 items-center justify-center w-full">
            <p>$</p>
            <input
            id="amount"
            step="0.01"
            {...register("amount", {required: "Amount of the transaction required!"})}
            className="border-2 p-2 border-primary-light rounded-md focus:outline-primary-dark"
            type="number" />
        </div>
        <ErrorMessage
        name="amount"
        errors={errors}
        render={({message}) => <p className="text-red-700">{message}</p>}
        />        </div>
        </div>
        {/* select entry and created by container */}
        <div className="flex gap-10 items-center justify-center">
        <div>
        <label
        className="font-quicksand text-sm"
         htmlFor="select">
        Select the Entry Type:
         </label>
        <Controller
        control={control}
        rules={{required: "Please select an entry classification!"}}
        name="selectedAccountingMethod"
        render={({field}) => (
            <Select
            {...field}
            placeholder="Revenue/Expense?"
            className="placeholder:text-sm placeholder:font-atma"
            id="select"
              options={options}/>
        )}
        />
        <ErrorMessage
            name="selectedAccountingMethod"
            errors={errors}
            render={({message}) => <p className="text-red-700">{message}</p>}
        />
        </div>
        <div className="creator flex flex-col items-start">
        <label
        className="font-quicksand text-sm"
         htmlFor="creator">Created By:</label>
        <input
        className="border-2 p-2 border-primary-light rounded-md focus:outline-primary-dark"
         type="text"
          {...register("creator", {required: "The name of the Creator is required!"})} />
        <ErrorMessage
            name="creator"
            errors={errors}
            render={({message}) => <p className="text-red-700">{message}</p>}
        />
        </div>
        </div>
        <p
        onClick={() => dispatch(changeEmojiPanState(!isEmojiPanOpen))}
         className="bg-yellow-400 hover:bg-orange-400 hover:border-none hover:font-semibold transition-all
          duration-300 text-sm flex gap-1 items-center rounded-lg cursor-pointer p-1">Add Emoji
         <img className="h-6 w-6" src={coolEmoji} alt="cool emoji" />
         </p>
        {isEmojiPanOpen && <div
        onClick={(event) => event.stopPropagation()}
         className="absolute top-3/4">
        <EmojiPicker
        onEmojiClick={(emoji) => {
            setSelectedEmoji(emoji)
            dispatch(changeEmojiPanState(false))
        }}
         open={isEmojiPanOpen} />
        </div>}
        <button
        type="submit"
         className="bg-primary rounded-md text-white shadow-black shadow-2xl hover:bg-primary-dark p-2 w-48 h-12 font-atma">
        Add Entry
        </button>
        </form>
        </div>
    )
}