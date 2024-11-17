import { nanoid } from "nanoid"
import { useState } from "react"
import { IoCloseOutline } from "react-icons/io5";
import { RxCaretLeft } from "react-icons/rx";
import { RxCaretRight } from "react-icons/rx";


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
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0)
  return (
    <div className="gallery-container">
      <div className="grid auto-rows-32 gap-x-4 gap-y-20 md:grid-cols-4">
      {imageArray.map((image, index) => {
        return(
          <div className={thisImageisShowing === image.id? "fixed top-10 left-1/2 transform -translate-x-1/2 z-10 " : ""}>
            <img 
            onClick={()=> {
              setTheShowingImage(image.id)
              setCurrentImageIndex(index)
            }}
            className={thisImageisShowing === image.id? " object-cover ": baseImageStyle}
            src={image.src} alt={image.alt}/>
            {thisImageisShowing === image.id &&
            <div>
             <IoCloseOutline
             onClick={() => setTheShowingImage(null)}
              className="absolute cursor-pointer right-3 h-12 w-12 top-3 text-white hover:text-primary-dark"/>
              <RxCaretLeft
    onClick={() => {
        const prevIndex = (currentImageIndex - 1 + imageArray.length) % imageArray.length;
        setCurrentImageIndex(prevIndex);
        setTheShowingImage(imageArray[prevIndex].id);
    }}
    className="absolute cursor-pointer left-3 top-1/2 -translate-y-1/2 text-white hover:text-primary-dark h-12 w-12"
/>

<RxCaretRight
    onClick={() => {
        const nextIndex = (currentImageIndex + 1) % imageArray.length;
        setCurrentImageIndex(nextIndex);
        setTheShowingImage(imageArray[nextIndex].id);
    }}
    className="absolute cursor-pointer right-3 top-1/2 -translate-y-1/2 text-white hover:text-primary-dark h-12 w-12"
/>
                </div>}
          </div>
        )
      })}
      </div>
      <p className="rounded-md bg-primary-dark hover:bg-primary-light p-2 font-atma text-white h-12 w-32 text-center">Load More...</p>
    </div>
  )
}

export default Gallery