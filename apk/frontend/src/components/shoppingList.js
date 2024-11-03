// src/components/ShoppingList.js
import React from 'react';
import ShoppingListItem from './shoppingListItem';

const mockLists = [
    { name: "Nákupní seznam 1", author: "Uživatel 1", items: ["Jabko", "Banán"], members: ["Uživatel 1", "Uživatel 2"] },
    { name: "Nákupní seznam 2", author: "Uživatel 1", items: ["Chléb", "Máslo"], members: ["Uživatel 1"] },
    { name: "Nákupní seznam 3", author: "Uživatel 2", items: ["Mléko"], members: ["Uživatel 2"] },
  ];

const ShoppingList = () => {
  return (
    <div className="py-4">
      {/* Header */}
      <header className="bg-white sticky top-0 shadow-lg z-10">
        <div className="flex justify-between items-center p-4">
          <button className="bg-blue-500 text-white px-4 py-2 rounded">Add New</button>
          <div className="flex items-center">
            <button className="text-500">All</button>
            <span className="mx-2">|</span>
            <button className="text-500">My</button>
            <span className="mx-2">|</span>
            <button className="text-500">Archived</button>
          </div>
          <div className="flex items-center bg-white rounded shadow-md">
            <span className="mx-2">Username</span>
            <button className="bg-red-500 text-white px-2 py-1 rounded">Logout</button>
          </div>
        </div>
      </header>
      
      <hr className="my-2" />

      {/* Body */}
      <div className="mt-4 space-y-4">
        {mockLists.map((list, index) => (
          <ShoppingListItem
            key={index}
            name={list.name}
            author={list.author}
            items={list.items}
            members={list.members}
          />
        ))}
      </div>
    </div>
  );
};

export default ShoppingList;