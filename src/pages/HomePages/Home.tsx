import NotificationCenter from './NotificationCenter'
import ImagesSlide from './ImagesSlide'
import FamilyBudget from './FamilyBudget'

function Home() {
  return (
    <div className='home-container grid grid-cols-3 grid-rows-2'>
      <NotificationCenter />
      <ImagesSlide/>
      <FamilyBudget />
    </div>
  )
}

export default Home