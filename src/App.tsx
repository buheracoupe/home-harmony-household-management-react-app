import { BrowserRouter } from "react-router-dom"
import AnimatedRoutes from "./Routes"
import NavBar from "./components/NavBar"
import { useAppDispatch, useTypedSelector } from "./Redux/ReduxHooks"
import { closeMobileNav } from "./Redux/NavSlice"
import { closeNotificationModal } from "./Redux/CommunicationHubSlice"
import { enlargeModalClosed } from "./Redux/GallerySlice"
import { changeBudgetFormState } from "./Redux/FamilyBudgetSlice"




function App() {
const dispatch = useAppDispatch();
const mobileNavState = useTypedSelector((state) => state.navigation.mobileNavState)
const notificationModalState = useTypedSelector((state) => state.communicationHub.notificationModalState)
const enlargeModalState = useTypedSelector((state) => state.gallery.enlargeModalState)
const budgetFormState = useTypedSelector((state) => state.FamilyBudget.budgetFormShowing)

  return (
    <BrowserRouter>
    <div
  // outside click modal handlers and togglers
    onClick={
      () =>{
       if(mobileNavState){dispatch(closeMobileNav())}
       if(notificationModalState){dispatch(closeNotificationModal())}
       if(enlargeModalState){dispatch(enlargeModalClosed())}
       if(budgetFormState){dispatch(changeBudgetFormState(false))}
      }
      }
     className="app flex relative flex-col min-h-screen">
      {notificationModalState && <div className="absolute h-full w-full top-0 left-0 bg-black opacity-60"></div>}
      <NavBar />
      <AnimatedRoutes />
    </div>
    </BrowserRouter>
  )
}

export default App
