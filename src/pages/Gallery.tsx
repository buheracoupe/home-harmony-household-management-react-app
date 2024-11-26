import { nanoid } from "nanoid"
import { useEffect, useState } from "react"
import { IoCloseOutline } from "react-icons/io5";
import { RxCaretLeft } from "react-icons/rx";
import { RxCaretRight } from "react-icons/rx";
import { MdOutlineAddAPhoto } from "react-icons/md";
import { useTypedSelector, useAppDispatch } from "../Redux/ReduxHooks";
import { enlargeModalOpen } from "../Redux/GallerySlice";


 export const imageArray = [
  { id: nanoid(), src: 'https://images.pexels.com/photos/1128316/pexels-photo-1128316.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', alt: 'Image 1' },
  { id: nanoid(), src: 'https://images.pexels.com/photos/1128318/pexels-photo-1128318.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', alt: 'Image 2' },
  { id: nanoid(), src: 'https://images.pexels.com/photos/4546025/pexels-photo-4546025.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', alt: 'Image 3' },
  { id:nanoid(), src: "https://images.pexels.com/photos/28847012/pexels-photo-28847012/free-photo-of-stunning-view-of-brussels-town-hall-in-belgium.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1", alt: "Image 4"},
  { id:nanoid(), src:"https://images.pexels.com/photos/20136034/pexels-photo-20136034/free-photo-of-black-mercedes-brabus-g-wagon.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1", alt: "Image 4"},
  { id:nanoid(), src:"https://images.pexels.com/photos/4262414/pexels-photo-4262414.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1", alt:"image 5"},
  { id:nanoid(), src:"https://images.pexels.com/photos/936048/pexels-photo-936048.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1", alt:"image 6"}
]




const baseImageStyle:string = "rounded-md transition-all duration-300 h-64 w-full object-cover hover:opacity-55 hover:border-primary-light hover:border-2"
// const showingImageStyle: 

function Gallery() {

  const [thisImageisShowing, setTheShowingImage] = useState<string | null>(null)
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0)
  const dispatch = useAppDispatch()
  const imageModalState = useTypedSelector((state) => state.gallery.enlargeModalState)

  // allow users to use left and right keys to change images
  function handleKeyDown(event: KeyboardEvent){
    if(thisImageisShowing){
      if(event.key === "ArrowLeft"){
        const prevIndex = (currentImageIndex - 1 + imageArray.length) % imageArray.length;
        setCurrentImageIndex(prevIndex);
        setTheShowingImage(imageArray[prevIndex].id);
      }
      if(event.key === "ArrowRight"){
        const nextIndex = (currentImageIndex + 1) % imageArray.length;
        setCurrentImageIndex(nextIndex);
        setTheShowingImage(imageArray[nextIndex].id);
      }
    }
  }

  useEffect(() =>{
    if(!imageModalState){
      setTheShowingImage(null);
      setCurrentImageIndex(0)
    }

      document.addEventListener("keydown", handleKeyDown)
    return () => {
      document.removeEventListener("keydown", handleKeyDown)
    }
  }, [thisImageisShowing, currentImageIndex, imageModalState])

  return (
    <div className="gallery-container max-md:mt-20 md:mt-0 mb-5">
      
      <div className="addMore mb-3 mx-auto transition-all duration-300 cursor-pointer hover:transform hover:scale-110
       mt-2 rounded-full p-2 w-fit bg-secondary-dark hover:bg-secondary-light">
    <MdOutlineAddAPhoto className="h-12 w-12 text-slate-200 cursor-pointer"/>
      </div>
      <div className="grid auto-rows-32 gap-x-4 gap-y-20 grid-cols-3 md:grid-cols-4">
      {imageArray.map((image, index) => {
        return(
          <div className={thisImageisShowing === image.id? "fixed max-md:top-20 top-10 left-1/2 transform mb-4 -translate-x-1/2 z-10 " : ""}>
            <img 
            onClick={(event)=> {
              event.stopPropagation();
             dispatch(enlargeModalOpen())
             setTheShowingImage(image.id)
             setCurrentImageIndex(index)
             
            }}
            className={thisImageisShowing === image.id? "object-cover": baseImageStyle}
            src={image.src} alt={image.alt}/>
            {thisImageisShowing === image.id &&
            <div>
        <IoCloseOutline
          onClick={() => setTheShowingImage(null)}
          className="absolute cursor-pointer right-3 h-12 w-12 top-10 text-white hover:text-primary-dark"/>
        <RxCaretLeft
          onClick={(event) => {
          const prevIndex = (currentImageIndex - 1 + imageArray.length) % imageArray.length;
          setCurrentImageIndex(prevIndex);
          setTheShowingImage(imageArray[prevIndex].id);
          event.stopPropagation();
          }}
          className="absolute cursor-pointer left-3 top-1/2 -translate-y-1/2 text-white hover:text-primary-dark h-12 w-12"
        />
        <RxCaretRight
          onClick={(event) => {
          const nextIndex = (currentImageIndex + 1) % imageArray.length;
          setCurrentImageIndex(nextIndex);
          setTheShowingImage(imageArray[nextIndex].id);
          event.stopPropagation();
          }}
          className="absolute cursor-pointer right-3 top-1/2 -translate-y-1/2 text-white hover:text-primary-dark h-12 w-12"
        />
        </div>}
        </div>
        )
      })}
      </div>
      {imageModalState && (
                <div className="fixed inset-0 z-[9] opacity-60 bg-black"></div>
            )}
    </div>
  )
}

export default Gallery
