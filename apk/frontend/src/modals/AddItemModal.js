import React from 'react';

const AddItemModal = ({ newItem, setNewItem, handleAddItem, setShowAddItemModal }) => {
    return (
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
    );
};

export default AddItemModal;
