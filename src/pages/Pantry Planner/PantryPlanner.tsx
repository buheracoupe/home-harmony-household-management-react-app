import GroceryList from "./GroceryList"
import MealPlanner from "./MealPlanner"


function PantryPlanner() {
  return (
    <div className="p-2 flex max-md:flex-col max-md:items-center max-md:pt-20 gap-3">
      <GroceryList/>
      <MealPlanner />
    </div>
  )
}

export default PantryPlanner


 