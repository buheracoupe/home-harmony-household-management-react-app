import NotificationCenter from './NotificationCenter'
import ImagesSlide from './ImagesSlide'
import FamilyBudget from './FamilyBudget'

function Home() {
  return (
    <div className='home-container overflow-y-hidden p-2 flex gap-3'>
      <div>
      <NotificationCenter />
      <ImagesSlide/>
      </div>
      <FamilyBudget />
    </div>
  )
}

export default Home