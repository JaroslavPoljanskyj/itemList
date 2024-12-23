// src/components/ShoppingListItem.js
import React from 'react';
import { useNavigate } from 'react-router-dom'; // Přidáno pro navigaci

const ShoppingListItem = ({id, name, author, items, members }) => {
  const navigate = useNavigate(); // Hook pro navigaci

  const handleViewClick = () => {
      navigate(`/shopping-list/${id}`);// Navigace na detail seznamu
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-4 mx-10">
      <h3 className="text-lg font-bold">{name}</h3>
      <p className="text-sm text-gray-500">{author}</p>
      <hr className="my-2" />
      <div className="flex flex-col">
        <div>
          <p className="font-bold">Položky:</p>
          <div className="flex flex-wrap space-x-1">
            {items.map((item, index) => (
              <span key={index} className="bg-gray-200 rounded-md px-2 py-1 text-sm">{item}</span>
            ))}
          </div>
        </div>
        <div className="mt-2">
          <p className="font-bold">Členové:</p>
          <div className="flex flex-wrap space-x-1">
            {members.map((member, index) => (
              <span key={index} className="bg-gray-200 rounded-md px-2 py-1 text-sm">{member}</span>
            ))}
          </div>
        </div>
      </div>
      <hr className="my-2" />
      <button 
        className="text-blue-500 font-bold" 
        onClick={handleViewClick} // Přidání události kliknutí
      >
        View more
      </button>
    </div>
  );
};

export default ShoppingListItem;
