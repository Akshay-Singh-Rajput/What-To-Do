import React, { useState } from 'react';

const TripOptions = ({ onSelectBudget, onSelectCompanion }) => {
  const [selectedBudget, setSelectedBudget] = useState(null);
  const [selectedCompanion, setSelectedCompanion] = useState(null);

  const budgetOptions = [
    { label: 'Cheap', description: 'Stay conscious of costs', icon: '💵' },
    { label: 'Moderate', description: 'Keep cost on the average side', icon: '💰' },
    { label: 'Luxury', description: "Don't worry about cost", icon: '💸' },
  ];

  const companionOptions = [
    { label: 'Just Me', description: 'A sole traveler in exploration', icon: '✈️' },
    { label: 'A Couple', description: 'Two travelers in tandem', icon: '🥂' },
    { label: 'Family', description: 'A group of fun-loving adventurers', icon: '🏠' },
    { label: 'Friends', description: 'A bunch of thrill-seekers', icon: '⛵' },
  ];

  const handleBudgetSelect = (option) => {
    setSelectedBudget(option);
    onSelectBudget(option);
  };

  const handleCompanionSelect = (option) => {
    setSelectedCompanion(option);
    onSelectCompanion(option);
  };

  return (
    <div className="p-6">
      <h2 className="text-lg leading-5  mb-4">What is Your Budget?</h2>
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {budgetOptions.map((item, index) => (
          <div
            key={index}
            className={`bg-white shadow-md rounded-lg p-4 flex flex-col items-center justify-center text-center cursor-pointer ${selectedBudget?.label === item.label ? 'bg-blue-100' : ''}`}
            onClick={() => handleBudgetSelect(item)}
          >
            <div className="text-xl mb-2">{item.icon}</div>
            <h3 className="text-md font-medium">{item.label}</h3>
            <p className="text-gray-500">{item.description}</p>
          </div>
        ))}
      </div>

      <h2 className="text-lg leading-5  mt-8 mb-4">Tell us your travel partner?</h2>
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {companionOptions.map((item, index) => (
          <div
            key={index}
            className={`bg-white shadow-md rounded-lg p-4 flex flex-col items-center justify-center text-center cursor-pointer ${selectedCompanion?.label === item.label ? 'bg-blue-100' : ''}`}
            onClick={() => handleCompanionSelect(item)}
          >
            <div className="text-xl mb-2">{item.icon}</div>
            <h3 className="text-md font-medium">{item.label}</h3>
            <p className="text-gray-500">{item.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TripOptions;
