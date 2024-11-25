import NotificationCenter from './NotificationCenter'
import ImagesSlide from './ImagesSlide'
import FamilyBudget from './FamilyBudget'
import GroceryDisplay from './GroceryDisplay'
import EventsDisplay from './EventsDisplay'
import SuggestedMealsSlide from './SuggestedMealsSlide'

function Home() {
  return (
    <div className='home-container grid grid-cols-3 overflow-y-hidden p-2 gap-2'>
      <div>
      <NotificationCenter />
      <ImagesSlide/>
      </div>
      <FamilyBudget />
      <div className='flex flex-col gap-3 justify-start mt-4 w-full'>
      <GroceryDisplay/>
      <EventsDisplay />
      <SuggestedMealsSlide/>
      </div>
    </div>
  )
}

export default Home