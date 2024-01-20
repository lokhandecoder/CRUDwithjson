import React, { useState } from 'react';
import Card from './Card';

function ListLayout() {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchChange = (event : any) => {
    setSearchTerm(event.target.value);
  };

  return (
    <div className="App">
      <div className="grid">
        <ul className="p-8" style={{ paddingLeft: '30%', paddingRight: '30%' }}>
        <h1>FE Assessment by Amit Lokhande</h1>
          <li className="my-2">
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="border p-4 w-full mb-5"
            />
          </li>
          <li className="my-2 ">
            <Card searchTerm={searchTerm} />
          </li>
        </ul>
      </div>
    </div>
  );
}

export default ListLayout;
