import { BrowserRouter } from "react-router-dom"
import AnimatedRoutes from "./Routes"
import NavBar from "./components/NavBar"
import { useAppDispatch, useTypedSelector } from "./Redux/ReduxHooks"
import { closeMobileNav } from "./Redux/NavSlice"
import { closeNotificationModal } from "./Redux/CommunicationHubSlice"
import { enlargeModalClosed } from "./Redux/GallerySlice"
import { changeBudgetFormState } from "./Redux/FamilyBudgetSlice"
import { closeEventsModifier } from "./Redux/EventsSlice"
import '@mantine/core/styles.css';
import '@mantine/dates/styles.css';
import { MantineProvider } from "@mantine/core"
import { fetchMealData } from "./Redux/MealPlannerSlice"
import { closeSuggestedMeals } from "./Redux/MealPlannerSlice"




function App() {
const dispatch = useAppDispatch();
const mobileNavState = useTypedSelector((state) => state.navigation.mobileNavState)
const notificationModalState = useTypedSelector((state) => state.communicationHub.notificationModalState)
const enlargeModalState = useTypedSelector((state) => state.gallery.enlargeModalState)
const budgetFormState = useTypedSelector((state) => state.FamilyBudget.budgetFormShowing)
const eventsModifierState = useTypedSelector((state) => state.events.eventsModifier)
const customData = useTypedSelector((state) => state.mealPlanner.customData)
const suggestedMealsDisplayState = useTypedSelector((state) => state.mealPlanner.isSuggestedMealsDisplayOpen)

  return (
    <BrowserRouter>
    <MantineProvider>
    <div
  // outside click modal handlers and togglers
    onClick={
      () =>{
       if(mobileNavState){dispatch(closeMobileNav())}
       if(notificationModalState){dispatch(closeNotificationModal())}
       if(enlargeModalState){dispatch(enlargeModalClosed())}
       if(budgetFormState){dispatch(changeBudgetFormState(false))}
       if(eventsModifierState){dispatch(closeEventsModifier())}
       if(suggestedMealsDisplayState){dispatch(closeSuggestedMeals())}

       if(customData.find((meal) => meal.isSuggesting === true)){

         const suggestionsClosedData = customData.map((meal) =>{
          return({...meal, isSuggesting: false})
         })
         dispatch(fetchMealData(suggestionsClosedData))
       }
      }
      }
     className="app flex relative flex-col min-h-screen">
      {notificationModalState && <div className="absolute h-full w-full top-0 left-0 bg-black opacity-60"></div>}
      <NavBar />
      <AnimatedRoutes />
    </div>
    </MantineProvider>
    </BrowserRouter>
  )
}

export default App
