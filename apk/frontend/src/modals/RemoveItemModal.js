import React from 'react';

const RemoveItemModal = ({ handleRemoveItem, setShowRemoveModal }) => {
    return (
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
    );
};

export default RemoveItemModal;
