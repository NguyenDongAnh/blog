import React, { useEffect, useState } from "react";

const useSizeDetect = () => {
    const [sizeDetect, setSizeDetect] = useState({
        isSm: false,
        isMd: false,
        isLg: false,
        isXl: false
    })

    const handleWindowResize = () => {
        const width = window.innerWidth
        
        let isSm;
        let isMd;
        let isLg;
        let isXl;

        if (width <= 640) isSm = true
        else isSm = false
        if (640 < width && width <= 768) isMd = true
        else isMd = false
        if (768 < width && width <= 1024) isLg = true
        else isLg = false
        if (1024 < width && width <= 1280) isXl = true
        else isXl = false

        setSizeDetect(() => ({
            isSm: isSm,
            isMd: isMd,
            isLg: isLg,
            isXl: isXl
        }))
    }

    useEffect(() => {
        if (typeof window !== "undefined") {
            // Client-side-only code
            handleWindowResize()
            window.addEventListener('resize', handleWindowResize);
            return () => {
                window.removeEventListener('resize', handleWindowResize);
            }
        }
    }, []);

    return sizeDetect;
}

export default useSizeDetect