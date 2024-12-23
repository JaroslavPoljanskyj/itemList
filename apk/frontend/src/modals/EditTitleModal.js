import React from 'react';

const EditTitleModal = ({ editedTitle, setEditedTitle, handleUpdateTitle, setShowEditModal }) => {
    return (
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
    );
};

export default EditTitleModal;
