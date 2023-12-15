import React from 'react';
import '../assets/style/animal-list.css';

const animalInfos = [
  { type: 'Malayan Tiger', count: 787 },
  { type: 'Mountain Gorilla', count: 212 },
  { type: 'Fin Whale', count: 28 },
];

const openGoogleSearch = (animalType) => {
  const searchQuery = encodeURIComponent(animalType);
  window.open(`https://www.google.com/search?q=${searchQuery}`, '_blank');
};

export const AnimalList = () => {
  return (
    <table className="animal-list-table"> {/* Use CSS classes instead of inline styles */}
      <thead>
        <tr>
          <th className="animal-list-header" colSpan="3">Rare Animals</th>
        </tr>
      </thead>
      <tbody>
        {animalInfos.map((animal, index) => (
          <tr key={index}>
            <td className="animal-list-cell">{animal.type}</td>
            <td className="animal-list-cell">{animal.count}</td>
            <td className="animal-list-cell">
              <a
                href="#"
                onClick={() => openGoogleSearch(animal.type)}
                className="animal-list-search-link"
              >
                Search
              </a>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
