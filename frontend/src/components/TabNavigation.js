import React, { useState } from 'react';
import SquadData from './SquadData';
import PlayerData from './PlayerData';

const TabNavigation = () => {
  const [activeTab, setActiveTab] = useState('Squad'); // Default to Squad tab
  const season = 2020; // Example season

  return (
    <div>
      {/* Tab Buttons */}
      <div className="flex space-x-4 mb-4">
        <button
          className={`px-4 py-2 rounded ${activeTab === 'Squad' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-black'}`}
          onClick={() => setActiveTab('Squad')}
        >
          Squad Data
        </button>
        <button
          className={`px-4 py-2 rounded ${activeTab === 'Player' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-black'}`}
          onClick={() => setActiveTab('Player')}
        >
          Player Data
        </button>
      </div>

      {/* Render Tab Content */}
      {activeTab === 'Squad' && <SquadData season={season} />}
      {activeTab === 'Player' && <PlayerData season={season} />}
    </div>
  );
};

export default TabNavigation;
