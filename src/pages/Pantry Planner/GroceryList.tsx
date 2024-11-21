import { BiPlus } from "react-icons/bi"
import shoppingIcon from "../../assets/cart-shopping-list-svgrepo-com.svg"
import { nanoid } from "nanoid"
import { useTypedSelector, useAppDispatch } from "../../Redux/ReduxHooks"
import { MdDeleteSweep } from "react-icons/md";
import { CiEdit } from "react-icons/ci";
import { useForm, Controller } from "react-hook-form"
import { addGroceryItem, deleteGroceryItem, allowEditing, stopEditing, updateItem } from "../../Redux/PantrySlice"
import { FaCheck } from "react-icons/fa6";
import { useState } from "react";

interface groceryItem {
    id: string
    groceryItem:string
    isEditing: boolean
}





function GroceryList(){

const {register, watch} = useForm()
const groceryList = useTypedSelector((state) => state.pantry.GroceryList)
const [shownListItems, setShownListItems] = useState(3)
const dispatch = useAppDispatch()





  
    return(
     <div className="groceryList font-quicksand p-2 w-[400px] flex flex-col gap-4 items-center min-h-80 rounded-md bg-primary text-white">
        <div className="title flex gap-2 items-center">
            <p className="font-atma text-3xl text-center">Grocery List</p>
            <img className="h-12" src={shoppingIcon} alt="shopping cart icon" />
        </div>
       <GroceryForm/>
        <div className="w-full flex flex-col gap-2 items-center">
        {groceryList.slice( 0, shownListItems ).map((item) => {
            // watch checkboxes individually and update accordingly
            const isChecked = watch(item.id, false)

            return(
               !item.isEditing ? <div
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
                        onClick={() => dispatch(allowEditing(item.id))}
                         className="text-primary-dark cursor-pointer hover:text-primary-light"/>
                        <MdDeleteSweep
                        onClick={() => dispatch(deleteGroceryItem(item.id)) }
                         className="text-secondary-light hover:text-secondary-dark cursor-pointer"/>
                    </div>
                </div> :
           <GroceryItemEditor item={item} />
            )
        })}
        </div>
        <div
         onClick={()=>{
            setShownListItems((prevState) => prevState + 3)
        }}
         className={groceryList.length < shownListItems? "hidden" : "flex items-center cursor-pointer gap-2"}>
        <BiPlus 
        className="rounded-full bg-secondary justify-self-end hover:bg-secondary-light text-3xl cursor-pointer transition-all duration-300 "/>
        <p className="font-atma">See More</p>
        </div>
     </div>
    )
  }

  export default GroceryList


interface GroceryFormType{
    groceryItem: string
}

// groceryForm to add items
export function GroceryForm(){
const   {handleSubmit, reset, register} = useForm();
const dispatch = useAppDispatch()

// assert type in the function body
function onSubmit(data: unknown){
const typedData = data as GroceryFormType

const groceryItem = {
    id: nanoid(),
    groceryItem: typedData.groceryItem,
    isEditing: false
}

dispatch(addGroceryItem(groceryItem))
reset()
}


return(
    <form
    onSubmit={handleSubmit(onSubmit)}
     className="flex">
        <input
        {...register("groceryItem", {required: "Please add item to submit!"})}
        className="text-black p-2 hover:cursor-pointer focus:outline-primary-light"
         type="text" />
         <button className="bg-secondary rounded-r-lg p-2 hover:bg-secondary-light" type="submit">Add Item</button>
    </form>
)
}









// edit groceryList Item component and Logic
   interface GroceryItemEditorProps {
    item:groceryItem
   }

   interface GroceryItemEditorForm{
    groceryItem: string
   }


export function GroceryItemEditor({item}:GroceryItemEditorProps ){
// no need for value and onChange 
const {control, handleSubmit} = useForm({defaultValues: {groceryItem: item.groceryItem}})
const dispatch = useAppDispatch()


function handleUpdate(data: GroceryItemEditorForm){
    console.log(data)
    dispatch(stopEditing(item.id))
    dispatch(updateItem({id: item.id, update: data.groceryItem}))
}

return(
    <form
onSubmit={handleSubmit(handleUpdate)}
className="flex w-full items-center justify-center">
<Controller
name="groceryItem"
control={control}
render={({ field }) => (
    <input
    {...field}
    className="text-black p-2 hover:cursor-pointer focus:outline-primary-light"
     type="text" />
)}
/>
 <button className="bg-secondary rounded-r-lg p-2 hover:bg-secondary-light" type="submit">Add Item</button>
</form>
)
}