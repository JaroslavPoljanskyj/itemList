import React, { useState } from 'react';
import axios from 'axios';

const AddListModal = ({ showModal, closeModal, fetchLists }) => {
    const [listName, setListName] = useState('');
    const [error, setError] = useState(null);

    const handleCreateList = async () => {
        try {
            const token = localStorage.getItem('jwt');
            const response = await axios.post(
                'http://localhost:3003/lists',
                { name: listName },
                {
                    headers: { Authorization: `Bearer ${token}` },
                    withCredentials: true,
                }
            );
            // Zavoláme fetchLists pro načtení seznamu znovu po úspěšném vytvoření
            fetchLists();
            closeModal(); // Zavřít modal po úspěšném vytvoření
        } catch (error) {
            setError('Failed to create list. Please try again later.');
        }
    };

    return (
        <>
            {showModal && (
                <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white p-6 rounded-md shadow-lg w-1/3">
                        <h2 className="text-lg font-bold mb-4">Create New List</h2>
                        <input
                            type="text"
                            className="border p-2 w-full mb-4"
                            placeholder="List Name"
                            value={listName}
                            onChange={(e) => setListName(e.target.value)}
                        />
                        {error && <div className="text-red-500 mb-4">{error}</div>}
                        <div className="flex justify-end space-x-2">
                            <button
                                className="bg-gray-500 text-white px-4 py-2 rounded"
                                onClick={closeModal}
                            >
                                Cancel
                            </button>
                            <button
                                className="bg-blue-500 text-white px-4 py-2 rounded"
                                onClick={handleCreateList}
                            >
                                Create
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default AddListModal;
