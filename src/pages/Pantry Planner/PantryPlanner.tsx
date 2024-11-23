import GroceryList from "./GroceryList"
import MealPlanner from "./MealPlanner"


function PantryPlanner() {
  return (
    <div className="p-2 flex gap-3">
      <GroceryList/>
      <MealPlanner />
    </div>
  )
}

export default PantryPlanner


 