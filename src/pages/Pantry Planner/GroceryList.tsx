import { BiPlus } from "react-icons/bi"
import useComponentVisible from "../../hooks/useComponentVisible"
import shoppingIcon from "../../assets/cart-shopping-list-svgrepo-com.svg"
import { nanoid } from "nanoid"
import { useTypedSelector, useAppDispatch } from "../../Redux/ReduxHooks"
import { MdDeleteSweep } from "react-icons/md";
import { CiEdit } from "react-icons/ci";
import { useForm } from "react-hook-form"
import { addGroceryItem, deleteGroceryItem } from "../../Redux/PantrySlice"
import { FaCheck } from "react-icons/fa6";




function GroceryList(){

const {register, handleSubmit, reset, watch} = useForm()
const [ref, isComponentVisible, toggleVisiblity] = useComponentVisible(false)
const groceryList = useTypedSelector((state) => state.pantry.GroceryList)
const dispatch = useAppDispatch()



function onSubmit(data){
const groceryItem = {
    id: nanoid(),
    groceryItem: data.groceryItem
}

dispatch(addGroceryItem(groceryItem))
reset()
}

  
    return(
     <div className="groceryList font-quicksand p-2 w-[400px] flex flex-col gap-4 items-center min-h-80 rounded-md bg-primary text-white">
        <div className="title flex gap-2 items-center">
            <p className="font-atma text-3xl text-center">Grocery List</p>
            <img className="h-12" src={shoppingIcon} alt="shopping cart icon" />
        </div>
        <form
        onSubmit={handleSubmit(onSubmit)}
         className="flex">
            <input
            {...register("groceryItem", {required: "Please add item to submit!"})}
            className="text-black p-2 hover:cursor-pointer focus:outline-primary-light"
             type="text" />
             <button className="bg-secondary rounded-r-lg p-2 hover:bg-secondary-light" type="submit">Add Item</button>
        </form>
        <div className="w-full flex flex-col gap-2 items-center">
        {groceryList.map((item) => {
            // watch checkboxes individually and update accordingly
            const isChecked = watch(item.id, false)

            return(
                <div
                className="bg-white rounded-md w-full flex items-center justify-between px-4 p-2 pl-12 text-secondary-dark"
                 key={item.id}>
                    <label htmlFor={item.id} className="flex items-center gap-12">
                        <div
                        className={isChecked? "border w-5 h-5 rounded-md bg-primary-dark border-primary-dark flex items-center justify-center":
                                              "border w-5 h-5 rounded-md border-primary-dark flex items-center justify-center "
                         }
                         >
                        <input
                        id={item.id}
                        {...register(item.id)}
                        className="appearance-none"
                         type="checkbox" />
                        {isChecked && <FaCheck className="text-white h-3 w-3 "/>}
                        </div>
                        <p className={isChecked? " line-through text-gray-400 " : "font-medium"}>{item.groceryItem}</p>
                    </label>
                    <div className="flex items-center gap-2 text-2xl">
                        <CiEdit
                         className="text-primary-dark cursor-pointer hover:text-primary-light"/>
                        <MdDeleteSweep
                        onClick={() => dispatch(deleteGroceryItem(item.id)) }
                         className="text-secondary-light hover:text-secondary-dark cursor-pointer"/>
                    </div>
                </div>
            )
        })}
        </div>
        <BiPlus 
        onClick={()=>{}}
        className="rounded-full bg-secondary justify-self-end hover:bg-secondary-light text-3xl cursor-pointer transition-all duration-300 "/>
     </div>
    )
  }

  export default GroceryList

