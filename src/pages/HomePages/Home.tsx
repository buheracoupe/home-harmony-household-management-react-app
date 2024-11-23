import NotificationCenter from './NotificationCenter'
import ImagesSlide from './ImagesSlide'
import FamilyBudget from './FamilyBudget'
import GroceryDisplay from './GroceryDisplay'

function Home() {
  return (
    <div className='home-container grid grid-cols-3 overflow-y-hidden p-2 gap-2'>
      <div>
      <NotificationCenter />
      <ImagesSlide/>
      </div>
      <FamilyBudget />
      <div className='col3 mt-4 w-full'>
      <GroceryDisplay/>
      </div>
    </div>
  )
}

export default Home