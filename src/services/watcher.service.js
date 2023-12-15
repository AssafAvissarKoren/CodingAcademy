import { storageService } from './async-storage.service'
import { utilService } from './util.service'

export const watcherService = {
    queryWatchers,
    addWatcher,
    removeWatcher,
    selectWatcher,
    initWatchers,
    createWatcher,
    purgeWatcherDB,
};

const STORAGE_KEY = 'WatcherDB';

function queryWatchers() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const watchers = utilService.loadFromStorage(STORAGE_KEY);
            if (watchers) {
                resolve(watchers);
            } else {
                reject('No watchers found');
            }
        }, 1000);
    });
}

async function addWatcher(watcherData) {
    // Assuming watcherData has the structure { fullname, movies, img }
    const newWatcher = createWatcher(watcherData.fullname, watcherData.movies, watcherData.img);
    const watchers = await queryWatchers();
    watchers.push(newWatcher);
    utilService.saveToStorage(STORAGE_KEY, watchers);
    return newWatcher; // Return the new watcher for state updates
}

async function removeWatcher(watcherId) {
    const watchers = await queryWatchers();
    const index = watchers.findIndex(watcher => watcher.id === watcherId);
    if (index !== -1) {
        watchers.splice(index, 1);
        utilService.saveToStorage(STORAGE_KEY, watchers);
    } else {
        console.log(`Error: Watcher with ID '${watcherId}' not found.`);
    }
}

// selectWatcher doesn't need to be async unless there's more logic to it.
function selectWatcher(watcherId) {
    // Implementation depends on how the modal is handled in your application.
    // This could involve setting state or dispatching a Redux action, for example.
}

function createWatcher(fullname, movies, img) {
    return { 
        id: utilService.makeId(4), 
        fullname: fullname, 
        movies: movies, 
        img: utilService.getImgUrl(`../assets/img/watchers/${img.toLowerCase()}.jpg`),
    };
}

function initWatchers() {
    const watcher1 = createWatcher('Puki Ba', ['Rambo', 'Rocky'], 'blue');
    const watcher2 = createWatcher('Muki Da', ['Martix', 'Memento'], 'yellow');
    const watcher3 = createWatcher('Shuki Sa', ['Collateral', 'Cube'], 'red');
    
    const watchers = [watcher1, watcher2, watcher3];

    utilService.saveToStorage(STORAGE_KEY, watchers);
}

async function purgeWatcherDB() {
    storageService.remove(STORAGE_KEY);
}

  