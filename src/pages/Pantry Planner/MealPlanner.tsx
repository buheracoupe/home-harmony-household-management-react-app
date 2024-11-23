import axios from "axios"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { ErrorMessage } from "@hookform/error-message"
import chefIcon from "../../assets/meal-svgrepo-com.svg"
import mealSuggestionIcon from "../../assets/cereal-meal-svgrepo-com.svg"
import { useTypedSelector, useAppDispatch } from "../../Redux/ReduxHooks"
import { fetchMealData } from "../../Redux/MealPlannerSlice"

interface ResponseData{
    id:number;
    image:string;
    imageType:string;
    title:string
}

interface FormData{
recipes: string
}

interface CustomData{
    id: number;
    image: string;
    imageType: string;
    title: string;
    isSuggesting: boolean;
}


function MealPlanner() {
const [query, setQuery] = useState("")
const {reset, handleSubmit, formState: {errors}, register} = useForm<FormData>()
const apiKey = "5d42170465ed463790bc3be7f86e5f93"
const dispatch = useAppDispatch()
const customData = useTypedSelector((state) => state.mealPlanner.customData)



const url = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${apiKey}&query=${query}`

 useEffect(() => {
 async function fetchData(){
    try{
        const response = await axios.get(url);
        // Transform data and dispatch in one step
        const customData = response.data.results.map((item:ResponseData) => ({
            ...item,
            isSuggesting: false // Add new property
        }));
        console.log(customData)
        dispatch(fetchMealData(customData)); 
    }catch(error){
        console.log("This error occured:", error)
    }
 }

 fetchData()
 }, [url])

 
// first thing tomorrow learn how to type fetchedData
function onSubmit(data:FormData){
    setQuery(data.recipes)
    reset()
}


  return (
    <div className="w-full min-h-full flex flex-col items-center rounded-md p-2 bg-gradient-to-br from-primary-dark
     to-secondary-dark  text-white">
    <div className="flex items-center mb-4">
        <p className="font-atma text-2xl">Meal Planner</p>
        <img 
        className="h-20"
        src={chefIcon} alt="check with meal tray" />
    </div>
    <form
    className="flex flex-col gap-1 items-start"
     onSubmit={handleSubmit(onSubmit)}>
    <div className="formdata flex items-center">
        <input
        className="text-black h-12 px-1 font-abel"
        {...register("recipes", {required: "Please enter a recipe to search!"})}
        type="text" />
        <button className="bg-yellow-300 h-12 text-black font-atma">Search Meals</button>
    </div>
    <ErrorMessage
    name="recipes"
    errors={errors}
    render={({message}) => (<span className="text-white text-sm font-quicksand">{message}</span>)}
    />
    </form>
    <div className="display-meals mt-3 grid grid-cols-5 gap-3">
    {customData.length < 1? <p className="text-4xl font-abel">No recipes were found</p>:
    customData.map((recipe) => {

        return(
            <div className=" bg-white relative h-[250px] group hover:bg-gradient-to-br text-secondary-dark transition-all
             duration-300 hover:from-primary-dark hover:to-yellow-500 hover:text-white rounded-md flex flex-col
              gap-2 items-center p-2">
                <img
                className="object-contain h-28 rounded-md"
                 src={recipe.image} alt="picture of the recipe" />
                <p className=" hover:text-white text-lg font-atma">{recipe.title}</p>
                <button
                onClick={() => recipe.isSuggesting = true}
                 className="rounded-md text-black font-quicksand text-sm p-2 bg-yellow-500 group-hover:bg-secondary-dark group-hover:text-white
                 transition-all absolute bottom-2 left-1/2 -translate-x-1/2 duration-300">Suggest Meal</button>
             {recipe.isSuggesting && <SuggestionModal recipe={recipe} />}
             {recipe.isSuggesting && <div className="overlay fixed bg-black opacity-30 inset-0 z-5"></div>}
            </div>
        )
    })}
    </div>
    </div>
  )
}

export default MealPlanner


export function SuggestionModal({recipe}:{recipe:CustomData}){

    return(
        <form className="modal fixed top-1/2 z-50 text-black rounded-md flex flex-col items-center -translate-y-1/2 left-1/2 
        -translate-x-1/2 w-[400px] h-[300px] bg-white">
        <div className="flex items-center gap-2">
        <img 
        className="h-12"
        src={mealSuggestionIcon} alt="meal suggestion icon" />
        <p className="font-atma text-2xl text-primary-dark">Meal Suggestion Form</p>
        </div>
        <div className="flex flex-col">
            <p>Chosen Meal</p>
            <p className="text-gray-500">{recipe.title}</p>
        </div>
        <button 
        className="text-sm p-2 text-black bg-yellow-500 hover:bg-yellow-800 hover:text-white rounded-md">Submit Suggestion</button>
        </form>
    )

}