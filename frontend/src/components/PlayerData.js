import React, { useEffect, useState } from 'react';
import axios from 'axios';

const PointsData = ({ season }) => {
  const [pointsData, setPointsData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPointsData = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/query', {
          params: {
            data_type: 'team',
            season: season,
            column: 'Pts',
          },
        });
        setPointsData(response.data['message'] || JSON.stringify(response.data));
      } catch (error) {
        console.error('Error fetching Points data:', error);
        setError('Failed to fetch Points data.');
      }
    };

    fetchPointsData();
  }, [season]);

  return (
    <div className="bg-gray-100 p-4 rounded">
      <h2 className="text-lg font-bold mb-2">Points Data</h2>
      {error && <div className="text-red-500">{error}</div>}
      {pointsData ? (
        <pre>{JSON.stringify(pointsData, null, 2)}</pre>
      ) : (
        <div>Loading Points Data...</div>
      )}
    </div>
  );
};

export default PointsData;
