import groceryStoreIcon from "../../assets/grocery-store-store-svgrepo-com.svg"
import { useTypedSelector } from "../../Redux/ReduxHooks"
import { TypeAnimation } from "react-type-animation"
import { NavLink } from "react-router-dom"
import shoppingBagIcon from "../../assets/shopping-bag-svgrepo-com.svg"



function GroceryDisplay() {
const groceryList = useTypedSelector((state) => state.pantry.GroceryList)

const typedArray = groceryList.flatMap(item => [item.groceryItem, 1500] )


  return (
    <div className='bg-gradient-to-r p-2 relative font-quicksand rounded-md w-full flex flex-col items-center
     text-white h-56 from-secondary-dark to-primary-light'>
        <div className="flex gap -2 items-center">
        <p className="font-atma tracking-wide text-2xl">Grocery Run</p>
        <img
        className="h-16"
         src={groceryStoreIcon} alt="grocery store icon" />
        </div>
        <div className="flex gap-2 items-center">
        <p>if you're at the store please get us.....</p>
        <img
        className="h-8"
         src={shoppingBagIcon} alt="shopping bag icon" />
        </div>
        <div className="mt-4">
        <TypeAnimation
        sequence={typedArray}
        wrapper="span"
        speed={5}
        deletionSpeed={10}
        repeat={Infinity}
        className=" text-2xl font-medium font-abel"
        />
        </div>
        <NavLink to="/pantry-planner" 
        className="bg-yellow-300 transition-all duration-500 rounded-md bottom-4 left-1/2 -translate-x-1/2
         absolute p-2 text-black font-atma hover:bg-orange-500">See Full List</NavLink>
    </div>
  )
}

export default GroceryDisplay