import React, { useEffect, useState } from "react";

const useDeviceDetect = () => {
    const [width, setWidth] = useState();
    const handleWindowResize = () => {
        setWidth(window.innerWidth);
    }

    useEffect(() => {
        if (typeof window !== "undefined") {
            // Client-side-only code
            setWidth(() => window.innerWidth)
            window.addEventListener('resize', handleWindowResize);
            return () => {
                window.removeEventListener('resize', handleWindowResize);
            }
        }
    }, []);

    return (width <= 640);
}

export default useDeviceDetect