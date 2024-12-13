import React, { useEffect, useState } from 'react'
import "./Progressbar.css";
import { progress } from 'framer-motion';

const Progressbar = ({ index, activeIndex, duration }) => {
    const [progress, setProgress] = useState(0);

    useEffect(() => {

        const interval = setInterval(() => {
            setProgress((preProgress) => {
                if (preProgress < 100) {
                    return preProgress + 1;
                }
                clearInterval(interval)
                return preProgress;
            })
        }, duration / 100);

        return () => {
            clearInterval(interval);
        }
    }, [duration, activeIndex])


    useEffect(() => {

        setProgress(0);
    }, [activeIndex])

    const isActive = index === activeIndex
    return (
        <div className={`progress-bar-container ${isActive?"active":""}`}>
            <div className={`${isActive ? "progress-bar" : ""}`} style={{ width: `${progress}%` }} >

            </div>
        </div>
    )
}

export default Progressbar