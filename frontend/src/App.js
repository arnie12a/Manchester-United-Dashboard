import React, { useEffect, useState } from 'react';
import axios from 'axios';

const App = () => {
  const [dataType, setDataType] = useState('team'); // Default to 'team'
  const [season, setSeason] = useState(2019); // Default to 2019
  const [column, setColumn] = useState('Pts'); // Default to 'Pts'
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/query', {
        params: {
          data_type: dataType,
          season,
          column,
        },
      });
      console.log(response.data);
      setData(response.data.message || JSON.stringify(response.data)); // Show response data
    } catch (error) {
      console.error('Error fetching data:', error);
      setError('Failed to fetch data.');
    }
  };

  // Update column automatically based on data type
  useEffect(() => {
    setColumn(dataType === 'team' ? 'Pts' : 'G+A');
  }, [dataType]);

  useEffect(() => {
    fetchData();
  }, [dataType, season, column]);

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Team Points Data</h1>
      
      <div className="mb-4">
        <label className="block font-medium mb-1">Data Type:</label>
        <select
          className="border rounded p-2"
          value={dataType}
          onChange={(e) => setDataType(e.target.value)}
        >
          <option value="team">Team</option>
          <option value="player">Player</option>
        </select>
      </div>

      <div className="mb-4">
        <label className="block font-medium mb-1">Season:</label>
        <select
          className="border rounded p-2"
          value={season}
          onChange={(e) => setSeason(parseInt(e.target.value, 10))}
        >
          {Array.from({ length: 2023 - 2010 + 1 }, (_, i) => 2010 + i).map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-4">
        <label className="block font-medium mb-1">Column:</label>
        <select
          className="border rounded p-2"
          value={column}
          onChange={(e) => setColumn(e.target.value)}
        >
          {dataType === 'team' ? (
            <option value="Pts">Pts</option>
          ) : (
            <option value="G+A">G+A</option>
          )}
        </select>
      </div>

      <button
        className="bg-blue-500 text-white py-2 px-4 rounded mt-2"
        onClick={fetchData}
      >
        Fetch Data
      </button>

      <div className="mt-4">
        <h2 className="text-lg font-bold">Results:</h2>
        {error ? <p className="text-red-500">{error}</p> : <pre>{data}</pre>}
      </div>
    </div>
  );
};

export default App;
