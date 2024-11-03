import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const ShoppingListDetail = () => {
    const { listName } = useParams(); // Get the list name from URL
    const navigate = useNavigate(); // Hook for navigation

    // Dummy data for members and items
    const [members] = useState([
        { name: 'test', isOwner: true },
        { name: 'Member One', isOwner: false },
        { name: 'Member Two', isOwner: false },
        { name: 'Member Three', isOwner: false },
    ]);

    const [items, setItems] = useState([
        { name: 'Item One', author: 'Test User', description: 'Description for item one', isDone: false },
        { name: 'Item Two', author: 'Member One', description: 'Description for item two', isDone: true },
        { name: 'Item Three', author: 'Test User', description: 'Description for item three', isDone: false },
        { name: 'Item Four', author: 'Member One', description: 'Description for item four', isDone: true },
        { name: 'Item Five', author: 'Test User', description: 'Description for item five', isDone: false },
    ]);

    const [listTitle, setListTitle] = useState(listName);
    const [showAddModal, setShowAddModal] = useState(false);
    const [showRemoveModal, setShowRemoveModal] = useState(false);
    const [itemToRemove, setItemToRemove] = useState(null);
    const [filter, setFilter] = useState('all');
    const [newItem, setNewItem] = useState({ name: '', description: '', author: 'Test User', isDone: false });
    const [showEditModal, setShowEditModal] = useState(false); // New state for edit modal
    const [editedTitle, setEditedTitle] = useState(listTitle); // State for new title

    const handleCheckboxChange = (index) => {
        const updatedItems = items.map((item, i) => {
            if (i === index) {
                return { ...item, isDone: !item.isDone };
            }
            return item;
        });
        setItems(updatedItems);
    };

    const handleRemoveItem = () => {
        setItems(items.filter((_, index) => index !== itemToRemove));
        setShowRemoveModal(false);
        setItemToRemove(null);
    };

    const handleAddItem = () => {
        setItems([...items, { ...newItem, isDone: false }]);
        setShowAddModal(false);
        setNewItem({ name: '', description: '', author: 'Test User', isDone: false });
    };

    const handleUpdateTitle = () => {
        setListTitle(editedTitle); // Update list title with new title
        setShowEditModal(false); // Close modal after update
    };

    const filteredItems = items.filter((item) => {
        if (filter === 'done') return item.isDone;
        if (filter === 'not_done') return !item.isDone;
        return true; // for 'all'
    });

    const owner = members.find((member) => member.isOwner)?.name || 'Unknown Author';

    return (
        <div className="flex flex-col py-4 space-y-4 h-screen">
            {/* Responsive Header */}
            <header className="bg-white sticky top-0 shadow-lg z-10 p-4">
                <div className="flex items-center justify-between">
                    {/* Back button */}
                    <button 
                        className="text-blue-500 flex items-center" 
                        onClick={() => navigate('/shopping-list')}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6 mr-1"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12H3m0 0l6-6m-6 6l6 6" />
                        </svg>
                    </button>

                    {/* User information and Logout button */}
                    <div className="flex items-center space-x-2">
                        <span className="text-gray-700">Username</span>
                        <button className="bg-red-500 text-white px-2 py-1 rounded">Logout</button>
                    </div>
                </div>
            </header>

            <div className="mt-4 space-y-4 mx-4 flex-1">
                {/* Title - displayed on smaller screens */}
                <div className="flex justify-between items-center px-4 py-4 bg-blue-100 rounded-lg shadow-lg">
                    <div className="flex flex-col">
                        <h1 className="text-xl font-bold">
                            {listTitle} ({items.length} items)
                            <button onClick={() => setShowEditModal(true)} className="ml-2 inline-flex items-center text-gray-500 hover:text-blue-500">
                            <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
>
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 21v-3a1 1 0 011-1h3m10-10l3 3m-3-3L9 18l-3 3H5a1 1 0 01-1-1v-3a1 1 0 011-1h3l6-6z" />
</svg>
                            </button>
                        </h1>
                        <p className="text-sm text-gray-600">Author: {owner}</p>
                    </div>
                    <button className="bg-red-500 text-white px-4 py-2 rounded-md" onClick={() => setShowRemoveModal(true)}>
                        Delete
                    </button>
                </div>

                {/* Members */}
                <div className="bg-gray-100 rounded-lg shadow-lg p-4">
                    <h2 className="text-lg font-semibold"> 
                        Members ({members.length})
                    </h2>
                    <div className="flex flex-wrap mt-2 gap-2">
                        {members.map((member, index) => (
                            <span 
                                key={index} 
                                className={`${
                                    member.isOwner ? 'bg-blue-600' : 'bg-blue-400'
                                } text-white rounded-md px-3 py-1 shadow`}
                            >
                                {member.name}
                            </span>
                        ))}
                        {/* Circle button for adding users */}
                        <button 
                            className="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center" 
                            onClick={() => setShowAddModal(true)}
                        >
                            +
                        </button>
                    </div>
                </div>

                {/* Filter and item list */}
                <div className="bg-white rounded-lg shadow-2xl p-4 flex flex-col">
                    <div className="flex flex-col sm:flex-row justify-between items-center mb-2">
                        {/* Filter dropdown */}
                        <div className="flex items-center space-x-2">
                            <h3 className="text-lg">Filter by:</h3>
                            <select 
                                className="border rounded-md p-1"
                                value={filter}
                                onChange={(e) => setFilter(e.target.value)}
                            >
                                <option value="all">All</option>
                                <option value="done">Done</option>
                                <option value="not_done">Not done</option>
                            </select>
                        </div>

                        <button className="bg-blue-500 text-white px-8 py-2 rounded-md" onClick={() => setShowAddModal(true)}>Add new</button>
                    </div>

                    <hr className="my-2" />
                    <div className="overflow-y-auto max-h-[250px]">
                        <div className="space-y-2">
                            {filteredItems.map((item, index) => (
                                <div key={index} className="flex justify-between items-center bg-gray-100 rounded-lg p-2">
                                    <div className="flex items-center space-x-2">
                                        <input 
                                            type="checkbox" 
                                            checked={item.isDone} 
                                            onChange={() => handleCheckboxChange(index)} 
                                            className="form-checkbox h-5 w-5 text-blue-600" 
                                        />
                                        <div>
                                            <p className="font-bold">{item.name}</p>
                                            <p className="text-sm text-gray-500">{item.author} | {item.description}</p>
                                        </div>
                                    </div>
                                    <button className="bg-red-500 text-white px-4 py-2 rounded-md" onClick={() => { setShowRemoveModal(true); setItemToRemove(index); }}>
                                        Remove
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Button Add New only on smaller screens below the list */}
                <button className="bg-blue-500 text-white px-8 py-2 rounded-md sm:hidden" onClick={() => setShowAddModal(true)}>Add new</button>
            </div>

            {/* Modals */}
            {showAddModal && (
                <div className="fixed inset-0 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg shadow-lg p-4">
                        <h2 className="text-lg font-bold mb-2">Add New Item</h2>
                        <input 
                            type="text" 
                            placeholder="Item Name" 
                            value={newItem.name} 
                            onChange={(e) => setNewItem({ ...newItem, name: e.target.value })} 
                            className="border rounded-md p-1 w-full mb-2" 
                        />
                        <textarea 
                            placeholder="Description" 
                            value={newItem.description} 
                            onChange={(e) => setNewItem({ ...newItem, description: e.target.value })} 
                            className="border rounded-md p-1 w-full mb-2" 
                        />
                        <div className="flex justify-end space-x-2">
                            <button className="bg-gray-300 px-4 py-2 rounded-md" onClick={() => setShowAddModal(false)}>Cancel</button>
                            <button className="bg-blue-500 text-white px-4 py-2 rounded-md" onClick={handleAddItem}>Add</button>
                        </div>
                    </div>
                </div>
            )}

            {showRemoveModal && (
                <div className="fixed inset-0 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg shadow-lg p-4">
                        <h2 className="text-lg font-bold mb-2">Remove Item</h2>
                        <p>Are you sure you want to remove this item?</p>
                        <div className="flex justify-end space-x-2 mt-4">
                            <button className="bg-gray-300 px-4 py-2 rounded-md" onClick={() => setShowRemoveModal(false)}>Cancel</button>
                            <button className="bg-red-500 text-white px-4 py-2 rounded-md" onClick={handleRemoveItem}>Remove</button>
                        </div>
                    </div>
                </div>
            )}

            {showEditModal && (
                <div className="fixed inset-0 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg shadow-lg p-4">
                        <h2 className="text-lg font-bold mb-2">Edit List Title</h2>
                        <input 
                            type="text" 
                            placeholder="New Title" 
                            value={editedTitle} 
                            onChange={(e) => setEditedTitle(e.target.value)} 
                            className="border rounded-md p-1 w-full mb-2" 
                        />
                        <div className="flex justify-end space-x-2">
                            <button className="bg-gray-300 px-4 py-2 rounded-md" onClick={() => setShowEditModal(false)}>Cancel</button>
                            <button className="bg-blue-500 text-white px-4 py-2 rounded-md" onClick={handleUpdateTitle}>Update</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ShoppingListDetail;
