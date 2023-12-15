import React, { useState, useEffect } from 'react';
import { utilService } from "../services/util.service";
import '../assets/style/season-clock.css';

function getSeason(date) {
    const month = date.getMonth()
    if (month >= 2 && month <= 4) {
        return 'Spring';
    } else if (month >= 5 && month <= 7) {
        return 'Summer';
    } else if (month >= 8 && month <= 10) {
        return 'Autumn';
    } else {
        return 'Winter';
    }
}

export const SeasonClock = () => {
    const [isDark, setIsDark] = useState(false);
    const [date, setDate] = useState(new Date());

    useEffect(() => {
        const intervalId = setInterval(() => {
        setDate(new Date());
        }, 1000);

        return () => {
        clearInterval(intervalId);
        };
    }, []);

    const toggleBackground = () => {
        setIsDark((prevIsDark) => !prevIsDark); 
    };

    const seasonName = getSeason(date);
    const seasonImage = utilService.getImgUrl(`../assets/img/seasons/${seasonName.toLowerCase()}.png`); // Generate the image URL
    const dayName = utilService.getDayName(date);
    const monthName = utilService.getMonthName(date);
    return (
        <div className={`season-clock ${isDark ? 'dark' : ''}`} onClick={toggleBackground}>
        <h1>{monthName} ({seasonName})</h1>
        <img src={seasonImage} alt={seasonName} className="season-image" />
        <h2>{dayName}</h2>
        </div>
    );
};
