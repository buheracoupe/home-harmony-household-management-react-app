import groceryIcon from "../../assets/cereal-meal-svgrepo-com (1).svg"
import { useAppDispatch, useTypedSelector } from "../../Redux/ReduxHooks"
import { useEffect, useState } from "react"
import { removeSuggestedMeal } from "../../Redux/MealPlannerSlice"
import { motion, AnimatePresence, easeInOut } from "framer-motion";


interface Meal{
    datePicker: string;
    id: string;
    suggestedBy: string;
    timeSelector: string;
    mealTitle: string;
}

function SuggestedMealsDisplay() {
    const suggestedMeals = useTypedSelector((state) => state.mealPlanner.suggestedMeals)
    const suggestedMealsDisplayState = useTypedSelector((state) => state.mealPlanner.isSuggestedMealsDisplayOpen)
    const [modifiedSuggestedMeals, setModifiedSuggestedMeals] = useState<Meal[]>([])
    const dispatch = useAppDispatch()

    useEffect(() => {
        const sortedMeals = [...suggestedMeals].sort((a,b) => a.datePicker.getTime() - b.datePicker.getTime())
        const updatedMeals = sortedMeals.map((meal) => {
         const options: Intl.DateTimeFormatOptions = {weekday: "long", day: "numeric", month:"long", year: "numeric"}
             const mealDate = meal.datePicker.toLocaleDateString("en-US", options)
             return (
                     {...meal, datePicker: mealDate}
             )
        })
        setModifiedSuggestedMeals(updatedMeals)
    }, [suggestedMeals])


  return (
    <AnimatePresence>
    {suggestedMealsDisplayState &&
   <motion.div
   key="suggesteddMealsDisplay"
   initial={{opacity: 0}}
   animate={{opacity: 1}}
   exit={{opacity: 0}}
   transition={{duration: .3, ease: easeInOut}}
    onClick={(event) => event.stopPropagation()}
     className='bg-white w-[500px] font-quicksand p-2 h-[500px] top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 transform fixed
     rounded-md z-50 text-secondary flex items-center flex-col gap-3'>
    <div className="top flex items-center gap-3">
        <img className="h-16" src={groceryIcon} alt="grocery Icon" />
        <p className="font-atma text-2xl">Suggested Meals</p>
    </div>
    <div className="flex flex-col overflow-y-auto">
        {modifiedSuggestedMeals.map((meal) => {
            return (
                <div className="flex gap-1 last:border-none border-b relative border-b-secondary pb-3 flex-col items-start">
                    <p
                    onClick={() => dispatch(removeSuggestedMeal(meal.id))}
                     className="absolute hover:transform hover:scale-105 top-1 hover:text-yellow-700
                      transition-all duration-300 cursor-pointer right-2 font-atma ">Remove</p>
                    <p className="font-atma text-xl">{meal.mealTitle}</p>
                    <div>
                        <p>Scheduled for  
                            <span className="font-semibold"> {meal.datePicker}</span> as 
                            <span className="font-semibold"> {meal.timeSelector}</span>
                        </p>
                    </div>
                    <p className="text-primary-dark">Suggested By: <span className="font-semibold">{meal.suggestedBy}</span></p>

                </div>
            )
        })}
    </div>
    </motion.div>
}
    </AnimatePresence>
  )
}

export default SuggestedMealsDisplay