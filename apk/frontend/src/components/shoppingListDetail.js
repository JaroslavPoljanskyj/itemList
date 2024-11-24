import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const ShoppingListDetail = () => {
    const { listName } = useParams(); // Get the list name from URL
    const navigate = useNavigate(); // Hook for navigation

    // Dummy data for members and items
    const [members, setMembers] = useState([
        { name: 'Test User', isOwner: true },
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
    const [showAddItemModal, setShowAddItemModal] = useState(false);
    const [showRemoveModal, setShowRemoveModal] = useState(false);
    const [itemToRemove, setItemToRemove] = useState(null);
    const [filter, setFilter] = useState('all');
    const [newItem, setNewItem] = useState({ name: '', description: '', author: 'Test User', isDone: false });
    const [showEditModal, setShowEditModal] = useState(false);
    const [editedTitle, setEditedTitle] = useState(listTitle);
    const [newMemberName, setNewMemberName] = useState('');
    const [showAddMemberModal, setShowAddMemberModal] = useState(false);

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
        setShowAddItemModal(false);
        setNewItem({ name: '', description: '', author: 'Test User', isDone: false });
    };

    const handleUpdateTitle = () => {
        setListTitle(editedTitle);
        setShowEditModal(false);
    };

    const handleAddMember = () => {
        if (newMemberName) {
            setMembers([...members, { name: newMemberName, isOwner: false }]);
            setShowAddMemberModal(false);
            setNewMemberName('');
        }
    };

    const filteredItems = items.filter((item) => {
        if (filter === 'done') return item.isDone;
        if (filter === 'not_done') return !item.isDone;
        return true; // for 'all'
    });

    const owner = members.find((member) => member.isOwner);

    return (
        <div className="flex flex-col py-4 space-y-4 h-screen">
            <header className="bg-white sticky top-0 shadow-lg z-10 p-4">
                <div className="flex items-center justify-between">
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

                    <div className="flex items-center space-x-2">
                        <span className="text-gray-700">{owner?.name}</span>
                        <button className="bg-red-500 text-white px-2 py-1 rounded" onClick={() => navigate('/login')}>Logout</button>
                    </div>
                </div>
            </header>

            <div className="mt-4 space-y-4 mx-4 flex-1">
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
                        <p className="text-sm text-gray-600">Author: {owner?.name}</p>
                    </div>
                    <button className="bg-red-500 text-white px-4 py-2 rounded-md" onClick={owner ? () => setShowRemoveModal(true) : () => {/* Leave logic here */}}>
                        {owner ? 'Delete' : 'Leave'}
                    </button>
                </div>

                <div className="bg-gray-100 rounded-lg shadow-lg p-4">
                    <h2 className="text-lg font-semibold"> 
                        Members ({members.length})
                    </h2>
                    <div className="flex flex-wrap mt-2 gap-2">
                        {members.map((member, index) => (
                            <span 
                                key={index} 
                                className={`${member.isOwner ? 'bg-blue-600' : 'bg-blue-400'} text-white rounded-md px-3 py-1 shadow flex items-center`}
                            >
                                {member.name}
                                {!member.isOwner && (
                                    <span 
                                        className="text-black-500 ml-2 cursor-pointer" 
                                        onClick={() => {
                                            setItemToRemove(index);
                                            setShowRemoveModal(true);
                                        }}
                                    >
                                        X
                                    </span>
                                )}
                            </span>
                        ))}

                        {/* Circle button for adding users */}
                        <button 
                            className="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center" 
                            onClick={() => setShowAddMemberModal(true)} // Open add member modal
                        >
                            +
                        </button>
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow-2xl p-4 flex flex-col">
                    <div className="flex flex-col sm:flex-row justify-between items-center mb-2">
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

                        <button className="bg-blue-500 text-white px-8 py-2 rounded-md" onClick={() => setShowAddItemModal(true)}>Add new</button>
                    </div>

                    <hr className="my-2" />
                    <div className="overflow-y-auto max-h-[250px]">
                        <div className="space-y-2">
                            {filteredItems.map((item, index) => (
                                <div key={index} className="flex justify-between items-center bg-gray-100 rounded-lg p-2 shadow-sm">
                                    <div className="flex items-center">
                                        <input 
                                            type="checkbox" 
                                            checked={item.isDone} 
                                            onChange={() => handleCheckboxChange(index)} 
                                            className="mr-2" 
                                        />
                                        <div className={`flex flex-col ${item.isDone ? 'line-through text-gray-500' : 'text-gray-800'}`}>
                                            <span>{item.name}</span>
                                            <span className="text-sm text-gray-600">{item.description} by {item.author}</span>
                                        </div>
                                    </div>
                                    {owner && (
                                        <button 
                                            className="bg-red-500 text-white px-2 rounded-md" 
                                            onClick={() => {
                                                setItemToRemove(index);
                                                setShowRemoveModal(true);
                                            }}
                                        >
                                            Remove
                                        </button>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Add Item Modal */}
            {showAddItemModal && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white rounded-lg p-6 w-96">
                        <h2 className="text-xl font-semibold mb-4">Add New Item</h2>
                        <input 
                            type="text" 
                            placeholder="Item Name" 
                            value={newItem.name}
                            onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
                            className="border border-gray-300 rounded w-full p-2 mb-2"
                        />
                        <textarea 
                            placeholder="Description" 
                            value={newItem.description}
                            onChange={(e) => setNewItem({ ...newItem, description: e.target.value })}
                            className="border border-gray-300 rounded w-full p-2 mb-4"
                        />
                        <button 
                            className="bg-blue-500 text-white px-4 py-2 rounded-md" 
                            onClick={handleAddItem}
                        >
                            Add Item
                        </button>
                        <button 
                            className="bg-gray-300 text-black px-4 py-2 rounded-md ml-2" 
                            onClick={() => setShowAddItemModal(false)}
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            )}

            {/* Remove Item Modal */}
            {showRemoveModal && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white rounded-lg p-6 w-96">
                        <h2 className="text-lg font-semibold mb-4">Remove Item</h2>
                        <p>Are you sure you want to remove this item?</p>
                        <div className="flex justify-end mt-4">
                            <button 
                                className="bg-red-500 text-white px-4 py-2 rounded-md" 
                                onClick={handleRemoveItem}
                            >
                                Yes, Remove
                            </button>
                            <button 
                                className="bg-gray-300 text-black px-4 py-2 rounded-md ml-2" 
                                onClick={() => setShowRemoveModal(false)}
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Edit Title Modal */}
            {showEditModal && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white rounded-lg p-6 w-96">
                        <h2 className="text-lg font-semibold mb-4">Edit List Title</h2>
                        <input 
                            type="text" 
                            value={editedTitle}
                            onChange={(e) => setEditedTitle(e.target.value)}
                            className="border border-gray-300 rounded w-full p-2 mb-4"
                        />
                        <button 
                            className="bg-blue-500 text-white px-4 py-2 rounded-md" 
                            onClick={handleUpdateTitle}
                        >
                            Update Title
                        </button>
                        <button 
                            className="bg-gray-300 text-black px-4 py-2 rounded-md ml-2" 
                            onClick={() => setShowEditModal(false)}
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            )}

            {/* Add Member Modal */}
            {showAddMemberModal && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white rounded-lg p-6 w-96">
                        <h2 className="text-lg font-semibold mb-4">Add New Member</h2>
                        <input 
                            type="text" 
                            placeholder="Member Name" 
                            value={newMemberName}
                            onChange={(e) => setNewMemberName(e.target.value)}
                            className="border border-gray-300 rounded w-full p-2 mb-4"
                        />
                        <button 
                            className="bg-blue-500 text-white px-4 py-2 rounded-md" 
                            onClick={handleAddMember}
                        >
                            Add Member
                        </button>
                        <button 
                            className="bg-gray-300 text-black px-4 py-2 rounded-md ml-2" 
                            onClick={() => setShowAddMemberModal(false)}
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ShoppingListDetail;
