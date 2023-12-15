import { watcherService } from '../services/watcher.service';
import { utilService } from '../services/util.service'

export const watcherController = {
    onInit,
    removeWatcher,
    addWatcher,
    selectWatcher,
    queryWatchers,
};

window.onInit = onInit;

async function onInit() {
    await watcherService.purgeWatcherDB();
    watcherService.initWatchers();
}

function queryWatchers() {
    return new Promise((resolve, reject) => {
        const watchers = watcherService.queryWatchers();
        if (watchers) {
            resolve(watchers);
        } else {
            reject('No watchers found');
        }
    });
}

async function addWatcher() {
    const fullname = prompt('Enter watcher\'s full name:');
    const movies = prompt('Enter watcher\'s favorite movies, separated by commas:')
        .split(',')
        .map(movie => movie.trim());
    const img = prompt('Enter watcher\'s image name (without extension):');

    if (fullname && movies.length && img) {
        const watcherData = { fullname, movies, img };
        return await watcherService.addWatcher(watcherData);
    }
}

async function removeWatcher(watcherId) {
    await watcherService.removeWatcher(watcherId);
}

function selectWatcher(watcherId, setSelectedWatcher) {
    // Assuming setSelectedWatcher is the state setter function from the React component
    setSelectedWatcher(watcherId);
}
