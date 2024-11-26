import axios from "axios"
import { useEffect, useState } from "react"
import { useForm, Controller } from "react-hook-form"
import { ErrorMessage } from "@hookform/error-message"
import chefIcon from "../../assets/meal-svgrepo-com.svg"
import mealSuggestionIcon from "../../assets/cereal-meal-svgrepo-com.svg"
import { useTypedSelector, useAppDispatch } from "../../Redux/ReduxHooks"
import { fetchMealData, isSuggestingFalse, isSuggestingTrue, addSuggestedMeal, openSuggestedMeals } from "../../Redux/MealPlannerSlice"
import { DatePickerInput } from '@mantine/dates'
import '@mantine/core/styles.css';
import { CiCalendarDate } from "react-icons/ci";
import { Select } from '@mantine/core';
import { IoMdClose } from "react-icons/io";
import { nanoid } from "nanoid"
import SuggestedMealsDisplay from "./SuggestedMealsForm"

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
const suggestedMealsDisplayState = useTypedSelector((state) => state.mealPlanner.isSuggestedMealsDisplayOpen)



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
    <div className="w-full relative min-h-full flex flex-col items-center rounded-md p-2 bg-gradient-to-br from-primary-dark
     to-secondary-dark  text-white">
    <p 
    onClick={() => dispatch(openSuggestedMeals())}
    className="absolute top-4 right-4 font-atma text-xl hover:transform hover:scale-110 cursor-pointer hover:text-yellow-500
     transition-all duration-300">See Suggested Meals</p>
     <div>
     {suggestedMealsDisplayState &&<div className="overlay fixed transition-all duration-300 inset-0 bg-black opacity-80 z-40"></div>}
     <SuggestedMealsDisplay/>
     </div>
    <div className="flex pt-10 items-center mb-4">
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
        <button className="bg-yellow-300 h-12 px-2 hover:bg-secondary hover:text-white
         transition-all duration-300 text-black font-atma">Search Meals</button>
    </div>
    <ErrorMessage
    name="recipes"
    errors={errors}
    render={({message}) => (<span className="text-white text-sm font-quicksand">{message}</span>)}
    />
    </form>
    {customData.length < 1 && <p className="text-4xl mt-8 font-abel">No recipes were found</p>}
    <div className="display-meals mt-3 grid grid-cols-2  lg:grid-cols-3 2xl:grid-cols-5 gap-3">
    {customData.length > 0 && customData.map((recipe) => {

        return(
            <>
            <div
            key={recipe.id}
             className=" bg-white relative h-[250px] group hover:bg-gradient-to-br text-secondary-dark transition-all
             duration-300 hover:from-primary-dark hover:to-yellow-500 hover:text-white rounded-md flex flex-col
              gap-2 items-center p-2">
                <img
                className="object-contain h-28 rounded-md"
                 src={recipe.image} alt="picture of the recipe" />
                <p className=" hover:text-white text-lg font-atma">{recipe.title}</p>
                <button
                onClick={() => {
                    dispatch(isSuggestingTrue(recipe.id))
                    console.log(recipe.isSuggesting)
                }}
                 className="rounded-md text-black font-quicksand text-sm p-2 bg-yellow-500 group-hover:bg-secondary-dark group-hover:text-white
                 transition-all absolute bottom-2 left-1/2 -translate-x-1/2 duration-300">Suggest Meal</button>
             {recipe.isSuggesting && <SuggestionModal recipe={recipe} />}
            </div>
             {recipe.isSuggesting && <div className="overlay fixed bg-black opacity-80 inset-0 z-50"></div>}
             </>
        )
    })}
    </div>
    </div>
  )
}

export default MealPlanner

interface SuggestionFormData{
    id: string
    datePicker: Date;
    suggestedBy: string;
    timeSelector: string
    mealTitle: string;
}


export function SuggestionModal({recipe}:{recipe:CustomData}){

    const { control, handleSubmit, register, reset } =useForm<SuggestionFormData>()
    const dispatch = useAppDispatch()

    function onSubmit(data: SuggestionFormData){
        console.log(data)
        dispatch(isSuggestingFalse(recipe.id))
        reset()
        data.id = nanoid()
        data.mealTitle = recipe.title
       dispatch(addSuggestedMeal(data))
    }

    return(
        <form
        onSubmit={handleSubmit(onSubmit)}
        onClick={(event) => event.stopPropagation()}
         className="modal p-2 fixed top-1/2 z-[100] font-quicksand text-black rounded-md flex
          flex-col items-center gap-4 -translate-y-1/2 left-1/2 
        -translate-x-1/2 w-[500px] h-[400px] bg-white">
            <IoMdClose 
            onClick={() => dispatch(isSuggestingFalse(recipe.id))}
            className="absolute top-2 right-3 text-3xl cursor-pointer text-gray-500 hover:text-primary-dark transition-all duration-300 "/>
            <div className="flex mb-4 items-center gap-2">
            <img 
            className="h-12"
            src={mealSuggestionIcon} alt="meal suggestion icon" />
            <p className="font-atma text-2xl text-primary-dark">Meal Suggestion Form</p>
            </div>
            <div className="flex flex-col">
                <p className="font-atma">Chosen Meal</p>
                <p className="text-gray-500">{recipe.title}</p>
            </div>
            <div>
            <div className="flex items-center w-full justify-between gap-5 mb-4">
            <div className="flex flex-col items-start">
                <Controller
                control={control}
                name="datePicker"
                rules={{required: "A date for the meal is required!"}}
                render={({field}) => (
                    <DatePickerInput
                    value={field.value}
                    onChange={field.onChange}
                    className=""
                    minDate={new Date()}
                    allowDeselect
                    placeholder="Pick a date"
                    label="Suggested Meal Date:"
                    rightSection={<CiCalendarDate size={20} />}
                    />
                )}
                />
            </div>
            <div className="selectTime">
                <Controller
                name="timeSelector"
                control={control}
                render={({field}) => (
                    <Select
                    value={field.value}
                    onChange={field.onChange}
                    label="Select a time for the meal"
                    placeholder="Select time"
                    data={['Breakfast', 'Lunch', 'Dinner', 'Random Snack']}
                    />
                )}
                />
            </div>
            </div>
            <div>
                <label htmlFor="suggestedBy">Suggested By:</label>
                <input
                id="suggestedBy"
                {...register("suggestedBy")}
                className="border border-gray-500 rounded-md p-1"
                type="text" />
            </div>
            </div>
            <button 
            className="text-sm p-2 text-black absolute bottom-3 left-1/2 -translate-x-1/2 bg-yellow-500 hover:bg-secondary
            hover:text-white rounded-md">Submit Suggestion</button>
        </form>
    )

}