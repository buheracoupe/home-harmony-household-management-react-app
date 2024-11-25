import { useEffect, useState } from "react"
import chickenMealIcon from "../../assets/fried-chicken-meal-svgrepo-com.svg"
import { useTypedSelector } from "../../Redux/ReduxHooks"
import { motion, AnimatePresence, easeInOut } from "framer-motion"

interface SuggestedMealToDisplay{
    id: string
    datePicker: string;
    suggestedBy: string;
    timeSelector: string;
    mealTitle: string;
}
const dateOptions: Intl.DateTimeFormatOptions = {weekday: "long", month: "long", day: "numeric", year:"numeric"}
function SuggestedMealsSlide() {
    const suggestedMeals = useTypedSelector((state) => state.mealPlanner.suggestedMeals)
    const [displayMeal, setDisplayMeal] = useState<SuggestedMealToDisplay>({})


    useEffect(() => {
        const intervalId = setInterval(() => {
            const mealToDisplayIndex = Math.floor(Math.random()*suggestedMeals.length)
            const mealToDisplay = suggestedMeals[mealToDisplayIndex]
            const modifiedMealToDisplay = {...mealToDisplay, datePicker: mealToDisplay.datePicker.toLocaleDateString("en-US", dateOptions) }
            setDisplayMeal(modifiedMealToDisplay)

    }, 5000)

    return () => clearInterval(intervalId)
    }, [suggestedMeals])

  return (
    <div className="rounded-md p-1 flex flex-col items-center text-white font-quicksand bg-gradient-to-bl from-orange-500
     via-secondary-dark to-primary-dark h-28">
        <div className="top flex items-center gap-2">
            <img className="h-12" src={chickenMealIcon} alt="Chicken and Potatoes Meal" />
            <p className="font-atma text-lg">Suggested Meals</p>
        </div>
        <AnimatePresence mode="wait">
        {Object.keys(displayMeal).length > 0 ?
        <motion.div
        key={displayMeal.id}
        initial={{opacity: 0, y:-300}}
        animate ={{opacity:1, y: 0}}
        exit={{opacity: 0, y: 300}}
        transition={{duration: .3, ease: easeInOut}}
        className="overflow-y-auto"
        >
            <p className="font-medium text-lg">{displayMeal.mealTitle} for <span className="font-atma">{displayMeal.timeSelector}</span></p>
        <div className="flex items-center gap-2">
            <p>{displayMeal.datePicker}</p>
            <p>Suggested By: {displayMeal.suggestedBy}</p>
        </div>
        </motion.div>:
        <p className="font-semibold font-abel">No Suggested Meals Just Yet...</p>
        }
        </AnimatePresence>
    </div>
  )
}

export default SuggestedMealsSlide