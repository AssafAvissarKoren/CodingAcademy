import React, { useState, useEffect, useRef } from 'react';
import '../assets/style/countdown.css';

export const CountDown = ({ startFrom, toTime, onDone }) => {

    const calculateSeconds = () => {
        if (toTime) {
            return Math.max(Math.floor((toTime - Date.now()) / 1000), 0);
        }
        return startFrom || 0;
    };

    const [seconds, setSeconds] = useState(calculateSeconds());
    const timerRef = useRef(null);

    useEffect(() => {
        timerRef.current = setInterval(() => {
            setSeconds((prevSeconds) => {
                if (prevSeconds === 0) {
                    onDone();
                    clearInterval(timerRef.current);
                    return 0;
                } else {
                    return prevSeconds -1;
                }})
        }, 1000)
        return () => {clearInterval(timerRef.current)}
    }, [])

    function formatTime(timeInSeconds) {
        const hours = Math.floor(timeInSeconds / 3600);
        const minutes = Math.floor((timeInSeconds % 3600) / 60);
        const secs = timeInSeconds % 60;

        const formattedHours = padNumber(hours, 2);
        const formattedMinutes = padNumber(minutes, 2);
        const formattedSeconds = padNumber(secs, 2);

        return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
    }

    function padNumber(number, length) {
        return number.toString().padStart(length, '0');
    }

    return (
        <div className="countdown">
            <span className="display">
                {formatTime(seconds).slice(0, 6)}
                <span style={{ color: seconds <= 6 ? 'red' : 'yellow' }}>
                    {formatTime(seconds).slice(6, 8)}
                </span>
            </span>
        </div>
    );
};
