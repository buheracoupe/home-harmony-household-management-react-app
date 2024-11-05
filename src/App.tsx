import { BrowserRouter } from "react-router-dom"
import AnimatedRoutes from "./Routes"
import NavBar from "./components/NavBar"
import { useAppDispatch, useTypedSelector } from "./Redux/ReduxHooks"
import { closeMobileNav } from "./Redux/NavSlice"




function App() {
const dispatch = useAppDispatch();
const mobileNavState = useTypedSelector((state) => state.navigation.mobileNavState)
  return (
    <BrowserRouter>
    <div
    onClick={
      () =>{
       if(mobileNavState){dispatch(closeMobileNav())}
      }
      }
     className="app flex flex-col min-h-screen">
      <NavBar />
      <AnimatedRoutes />
    </div>
    </BrowserRouter>
  )
}

export default App
