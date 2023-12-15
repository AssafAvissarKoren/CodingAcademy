import { AnimalList } from "./cmps/AnimalList";
import { SeasonClock } from "./cmps/SeasonClock";
import { CountDown } from "./cmps/CountDown";
import { WatcherApp } from "./cmps/WatcherApp";
import { MouseMonitor } from "./cmps/MouseMonitor";
import dingSound from './assets/sounds/484344__inspectorj__bike-bell-ding-single-01-01.wav';
import { HashRouter as Router, Routes, Route, NavLink, Navigate } from 'react-router-dom';

export function App() {

    function onDoneCount() {
        console.log('Its Time!')
        const audio = new Audio(dingSound)
        audio.play()
    }

    return (
        <Router>
            <section className='main-app'>
                <header className='container'>
                    <NavLink to='/animalList'>Animal List</NavLink>
                    <NavLink to='/seasonClock'>Season Clock</NavLink>
                    <NavLink to='/countDown'>Count Down</NavLink>
                    <NavLink to='/watcherApp'>Watcher App</NavLink>
                    <NavLink to='/mouseMonitor'>Mouse Monitor</NavLink>
                </header>

                <main className='container'>
                    <section>
                        <Routes>
                            <Route path='/animalList' element={<AnimalList />} />
                            <Route path='/seasonClock' element={<SeasonClock />} />
                            <Route path='/countDown' element={
                            <CountDown toTime={Date.now() + 1000*10} onDone={onDoneCount}/>} />
                            <Route path='/watcherApp' element={<WatcherApp />} />
                            <Route path='/mouseMonitor' element={<MouseMonitor />} />
                            <Route index element={<Navigate to='/animalList' />} />
                        </Routes>
                    </section>
                </main>
            </section>
        </Router>
    );
}
