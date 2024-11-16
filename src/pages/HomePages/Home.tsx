import React from 'react'
import NotificationCenter from './NotificationCenter'
import ImagesSlide from './ImagesSlide'

function Home() {
  return (
    <div className='home-container'>
      <NotificationCenter />
      <ImagesSlide/>
    </div>
  )
}

export default Home