import { nanoid } from "nanoid"
import { useState } from "react"


 export const imageArray = [
  { id: nanoid(), src: 'https://images.pexels.com/photos/1128316/pexels-photo-1128316.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', alt: 'Image 1' },
  { id: nanoid(), src: 'https://images.pexels.com/photos/1128318/pexels-photo-1128318.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', alt: 'Image 2' },
  { id: nanoid(), src: 'https://images.pexels.com/photos/4546025/pexels-photo-4546025.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', alt: 'Image 3' },
  { id:nanoid(), src: "https://images.pexels.com/photos/28847012/pexels-photo-28847012/free-photo-of-stunning-view-of-brussels-town-hall-in-belgium.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1", alt: "Image 4"},
  {id:nanoid(), src:"https://images.pexels.com/photos/20136034/pexels-photo-20136034/free-photo-of-black-mercedes-brabus-g-wagon.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1", alt: "Image 4"}

]




const baseImageStyle:string = "rounded-md transition-all duration-300 h-64 w-full object-cover hover:opacity-55 hover:border-primary-light hover:border-2"
// const showingImageStyle: 

function Gallery() {

  const [thisImageisShowing, setTheShowingImage] = useState<string | null>(null)
  return (
    <div className="gallery-container">
      <div className="grid auto-rows-32 gap-x-4 gap-y-20 md:grid-cols-4">
      {imageArray.map((image) => {
        return(
            <img 
            onClick={()=> setTheShowingImage(image.id)}
            className={thisImageisShowing === image.id? "fixed object-cover top-1/2 left-1/2 transform -translate-x-1/2 h-[60%] z-10 -translate-y-1/2": baseImageStyle}
            src={image.src} alt={image.alt}/>
        )
      })}
      </div>
      <p className="rounded-md bg-primary-dark hover:bg-primary-light p-2 font-atma text-white h-12 w-32 text-center">Load More...</p>
    </div>
  )
}

export default Gallery