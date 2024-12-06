import React, { useEffect, useState } from 'react';
import axios from 'axios';

const SquadData = ({ season }) => {
  const [squadData, setSquadData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSquadData = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/query', {
          params: {
            data_type: 'team',
            season: season,
            column: 'Squad',
          },
        });
        setSquadData(response.data['message'] || JSON.stringify(response.data));
      } catch (error) {
        console.error('Error fetching Squad data:', error);
        setError('Failed to fetch Squad data.');
      }
    };

    fetchSquadData();
  }, [season]);

  return (
    <div className="bg-gray-100 p-4 rounded">
      <h2 className="text-lg font-bold mb-2">Squad Data</h2>
      {error && <div className="text-red-500">{error}</div>}
      {squadData ? (
        <pre>{JSON.stringify(squadData, null, 2)}</pre>
      ) : (
        <div>Loading Squad Data...</div>
      )}
    </div>
  );
};

export default SquadData;
