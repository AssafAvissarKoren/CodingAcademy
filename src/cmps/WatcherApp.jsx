import React, { useState, useEffect } from 'react';
import { watcherController } from '../controllers/watcher.controller';
import { WatcherDetailModal } from './Modal'
import '../assets/style/watcher.css';

export const WatcherApp = () => {
    const [watchers, setWatchers] = useState([]);
    const [selectedWatcher, setSelectedWatcher] = useState(null);

    useEffect(() => {
        const initWatchers = async () => {
            try {
                await watcherController.onInit();
                loadWatchers()
            } catch (error) {
                console.error(error);
            }
        };

        initWatchers();
    }, []);


    async function loadWatchers() {
        try {
            const fetchedWatchers = await watcherController.queryWatchers();
            setWatchers(fetchedWatchers);
        } catch (error) {
            console.error(error);
        }
    }

    const handlers = {
        AddWatcher: async () => {
            try {
                await watcherController.addWatcher();
                loadWatchers()
            } catch (error) {
                console.error(error);
            }
        },
        RemoveWatcher: async (watcherId) => {
            try {
                await watcherController.removeWatcher(watcherId);
                loadWatchers()
            } catch (error) {
                console.error(error);
            }
        },
        SelectWatcher: (watcherId) => {
            const watcher = watchers.find(w => w.id === watcherId);
            setSelectedWatcher(watcher);
        }
    };

    return (
        <div>
            <div style={{ textAlign: 'center' }}>
                <h1>Watcher App</h1>
                <button onClick={handlers.AddWatcher}>Add Watcher</button>
            </div>
            <div className="watchers-container">
                {watchers.map(watcher => (
                    <div className="watcher-card" key={watcher.id}>
                        <img src={watcher.img} alt="Profile Picture" className="watcher-img" />
                        <div className="watcher-info">
                            <span className="watcher-name">{watcher.fullname}</span>
                            <div className="watcher-actions">
                                <button onClick={() => handlers.RemoveWatcher(watcher.id)} className="btn remove">X</button>
                                <button onClick={() => handlers.SelectWatcher(watcher.id)} className="btn select">Select</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            {selectedWatcher && (
                <WatcherDetailModal watcher={selectedWatcher} onClose={() => setSelectedWatcher(null)} />
            )}
        </div>
    );
};
