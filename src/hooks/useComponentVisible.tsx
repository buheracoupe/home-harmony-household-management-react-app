
import React, { useState, useEffect, useRef } from "react";

type useComponentVisibleReturnType = [
     React.RefObject<HTMLElement>,
     boolean,
     () => void
]


function useComponentVisible(initialState = false): useComponentVisibleReturnType{
    const [isComponentVisible, setIsComponentVisible] = useState(initialState)
    const ref = useRef<HTMLElement | null>(null)

    function handleClick(event: MouseEvent){
        if(ref.current && !ref.current.contains(event.target as Node)){
            setIsComponentVisible(false)
        }
    }


    useEffect(() => {
        window.addEventListener("click", handleClick)

        return () => window.removeEventListener("click", handleClick)
    }, [])


    const toggleVisiblity = () => setIsComponentVisible(prevState => !prevState)

    return [ref, isComponentVisible, toggleVisiblity]

}

export default useComponentVisible