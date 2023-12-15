import React, { useState, useEffect, useRef } from 'react';
import '../assets/style/mouse-monitor.css';

export function MouseMonitor() {
    const [isOn, setIsOn] = useState(true);
    const [pos, setPos] = useState({ x: 0, y: 0 });
    const updatePosRef = useRef()

    const updatePos = (e) => {
      setPos({ x: e.clientX, y: e.clientY });
    };

    const addMouseListener = () => {
      document.addEventListener('mousemove', updatePosRef.current);
    };

    const removeMouseListener = () => {
      document.removeEventListener('mousemove', updatePosRef.current);
    };

    useEffect(() => {
      updatePosRef.current = updatePos
      addMouseListener();

      return () => {
        removeMouseListener();
      };
    }, []);

      return (
          <div className="mouse-monitor" style={{ textAlign: 'center' }}>
          <h1>Mouse Position</h1>
          {isOn && <h2>x: {pos.x}, y: {pos.y}</h2>}
          <button onClick={() => {
            {isOn ? removeMouseListener() : addMouseListener()}
            setIsOn(!isOn)
          }}>
            {isOn ? 'Pause' : 'Resume'}
          </button>
          </div>
      );
}
