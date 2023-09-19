import { useState, useEffect} from "react"
import useDebounce from "./useDebounce"
const useResponsive = () => {
    const [state, setState] = useState({
        isMobile: false,
        isTablet: false,
        isDesktop: false,
    })

    useEffect(() => {
        onResizeHandler()

        Setup()

        return () => {
            Cleanup()
        }
    },[])


    const onResizeHandler = () => {
        const isMobile = window.innerWidth <= 768
        const isTablet = window.innerWidth >= 768 && window.innerWidth <= 990
        const isDesktop = window.innerWidth > 990

        setState({ isMobile, isTablet, isDesktop})
    }

    const debouncedCall = useDebounce(onResizeHandler, 500)

    const Setup = () => {
        window.addEventListener("resize", debouncedCall, false)
    }

    const Cleanup = () => {
        window.removeEventListener("resize", debouncedCall, false)
    }

    return state

}

export default useResponsive