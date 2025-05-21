import React, { useState } from 'react';


const Equipe: React.FC = () => {

      // State to manage the visibility of each section
  const [isStatusVisible, setIsStatusVisible] = useState(true);
  const [isResponsibilityVisible, setIsResponsibilityVisible] = useState(true);
  const [isOtherOrganizationsVisible, setIsOtherOrganizationsVisible] = useState(true);

      const statusData = [
    { title: 'Administrative Staff', count: 2 },
    { title: 'Associate Professor', count: 9 },
    { title: 'Associate Professor HDR', count: 3 },
    { title: 'Associated Member', count: 10 },
    { title: 'Contractual Teacher Researcher', count: 2 },
    { title: 'Emeritus Professor', count: 1 },
  ];

  const responsibilityData = [
    { title: 'No data', count: 127 },
    { title: 'Deputy Director', count: 1 },
    { title: 'Director', count: 1 },
    { title: 'Responsible of a technological platform', count: 3 },
    { title: 'Responsible of the business unit', count: 2 },
    { title: 'Responsible of the conferences and seminars', count: 1 },
  ];

  const otherOrganizationsData = [
    { title: 'No data', count: 4 },
    { title: 'AU (Canada)', count: 1 },
    { title: 'CAM (United Kingdom), uB', count: 1 },
    { title: 'RMIT (Australia)', count: 1 },
    { title: 'uB', count: 35 },
    { title: 'UB (United States)', count: 1 },
  ];

  const directionData = [
    { name: 'Bertaux Aurélie, Prof.Dr.', title: 'Full Professor', responsibility: 'Deputy Director', organization: 'uB' },
    { name: 'Galland Stéphane, Prof.Dr.', title: 'Full Professor', responsibility: 'Director', organization: 'UTBM' },
  ];

  const researchersData = [
    { name: 'Abbas-Turki Abdeljalil, Prof.Dr.', title: 'Full Professor', responsibility: 'Responsible of a technological platform', organization: 'UTBM' },
    { name: 'Benkirane Fatima Ezzahra, Dr.', title: 'Contractual Teacher Researcher', responsibility: '', organization: 'UTBM' },
    { name: 'Chahi Abderrazak, Dr.', title: 'Associate Professor', responsibility: '', organization: 'UTBM' },
    { name: 'Crombez Nathan, Dr.', title: 'Associate Professor', responsibility: '', organization: 'UTBM' },
    { name: 'Créput Jean-Charles, Dr.', title: 'Associate Professor HDR', responsibility: '', organization: 'UTBM' },
    { name: 'Dridi Mahjoub, Dr.', title: 'Associate Professor HDR', responsibility: '', organization: 'UTBM' },
  ];
    return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <span>Filters Active - 0</span>
        <div className="space-x-2">
          <button className="px-4 py-2 bg-gray-200 rounded">Collapse All</button>
          <button className="px-4 py-2 bg-gray-200 rounded">Show All</button>
          <button className="px-4 py-2 bg-gray-200 rounded">Clear All</button>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-4">
        <div className="p-2">
          <div className="flex justify-between items-center">
            <h3 className="font-bold mb-2">Status in the organization</h3>
            <button onClick={() => setIsStatusVisible(!isStatusVisible)} className="px-2 py-1 bg-gray-200 rounded">
              {isStatusVisible ? 'Collapse' : 'Expand'}
            </button>
          </div>
          {isStatusVisible && (
            <div>
              {statusData.map((item, index) => (
                <div key={index} className="flex justify-between p-2 border-b">
                  <span>{item.title}</span>
                  <span>{item.count}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="p-2">
          <div className="flex justify-between items-center">
            <h3 className="font-bold mb-2">Responsibility</h3>
            <button onClick={() => setIsResponsibilityVisible(!isResponsibilityVisible)} className="px-2 py-1 bg-gray-200 rounded">
              {isResponsibilityVisible ? 'Collapse' : 'Expand'}
            </button>
          </div>
          {isResponsibilityVisible && (
            <div>
              {responsibilityData.map((item, index) => (
                <div key={index} className="flex justify-between p-2 border-b">
                  <span>{item.title}</span>
                  <span>{item.count}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="p-2">
          <div className="flex justify-between items-center">
            <h3 className="font-bold mb-2">Other organizations</h3>
            <button onClick={() => setIsOtherOrganizationsVisible(!isOtherOrganizationsVisible)} className="px-2 py-1 bg-gray-200 rounded">
              {isOtherOrganizationsVisible ? 'Collapse' : 'Expand'}
            </button>
          </div>
          {isOtherOrganizationsVisible && (
            <div>
              {otherOrganizationsData.map((item, index) => (
                <div key={index} className="flex justify-between p-2 border-b">
                  <span>{item.title}</span>
                  <span>{item.count}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="mb-4">
        <h3 className="font-bold mb-2">Direction</h3>
        {directionData.map((person, index) => (
          <div key={index} className="flex justify-between p-2 border-b">
            <span>{person.name}</span>
            <span>{person.title}</span>
            <span>{person.responsibility}</span>
            <span>{person.organization}</span>
          </div>
        ))}
      </div>

      <div>
        <h3 className="font-bold mb-2">Researchers</h3>
        {researchersData.map((person, index) => (
          <div key={index} className="flex justify-between p-2 border-b">
            <span>{person.name}</span>
            <span>{person.title}</span>
            <span>{person.responsibility}</span>
            <span>{person.organization}</span>
          </div>
        ))}
      </div>
    </div>
    );
};

export default Equipe;