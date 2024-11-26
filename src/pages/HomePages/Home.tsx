import NotificationCenter from './NotificationCenter'
import ImagesSlide from './ImagesSlide'
import FamilyBudget from './FamilyBudget'
import GroceryDisplay from './GroceryDisplay'
import EventsDisplay from './EventsDisplay'
import SuggestedMealsSlide from './SuggestedMealsSlide'

function Home() {
  return (
    <div className='home-container pt-14 md:pt-0 overflow-y-hidden flex flex-col items-center  lg:grid lg:grid-cols-2 2xl:grid-cols-3 p-2 gap-2'>
      <div className='max-md:flex max-md:flex-col max-md:items-center'>
      <NotificationCenter />
      <ImagesSlide/>
      </div>
      <FamilyBudget />
      <div className='flex lg:col-span-2 2xl:col-span-1 max-w-[600px] place-self-center flex-col gap-3 justify-start mt-4 w-full'>
      <GroceryDisplay/>
      <EventsDisplay />
      <SuggestedMealsSlide/>
      </div>
    </div>
  )
}

export default Home