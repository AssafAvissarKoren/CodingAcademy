import '../assets/style/modal.css';

export const WatcherDetailModal = ({ watcher, onClose }) => {
    return (
        <div className="modal">
            <h2 style={{ textAlign: 'center' }}>{watcher.fullname}</h2>
            <ul>
                {watcher.movies.map((movie, index) => (
                    <li key={index}>{movie}</li>
                ))}
            </ul>
            <div style={{ textAlign: 'center' }}>
                <button onClick={onClose}>Close</button>
            </div>
        </div>
    );
};
