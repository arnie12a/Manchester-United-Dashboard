import React, { useEffect, useState } from 'react';
import axios from 'axios';

const App = () => {
  const [squadData, setSquadData] = useState(null);
  const [pointsData, setPointsData] = useState(null);
  const [error, setError] = useState(null);

  // Fetch data based on column and season parameters
  const fetchData = async (column, season) => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/query', {
        params: {
          data_type: 'team',
          season: season,
          column: column,
        },
      });
      if (column === 'Squad') {
        setSquadData(response.data['message'] || JSON.stringify(response.data));
      } else if (column === 'Pts') {
        setPointsData(response.data['message'] || JSON.stringify(response.data));
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      setError('Failed to fetch data.');
    }
  };

  useEffect(() => {
    fetchData('Squad', 2019); // Fetch Squad data for season 2019
    fetchData('Pts', 2019);   // Fetch Points data for season 2019
  }, []); // Run only once when the component mounts

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Team Data for 2019</h1>

      {error && <div className="text-red-500">{error}</div>}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Squad Data */}
        <div className="bg-gray-100 p-4 rounded">
          <h2 className="text-lg font-bold mb-2">Squad Data</h2>
          {squadData ? (
            <pre>{JSON.stringify(squadData, null, 2)}</pre>
          ) : (
            <div>Loading Squad Data...</div>
          )}
        </div>

        {/* Points Data */}
        <div className="bg-gray-100 p-4 rounded">
          <h2 className="text-lg font-bold mb-2">Points Data</h2>
          {pointsData ? (
            <pre>{JSON.stringify(pointsData, null, 2)}</pre>
          ) : (
            <div>Loading Points Data...</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
