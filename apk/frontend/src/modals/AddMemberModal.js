import React from 'react';

const AddMemberModal = ({ newMemberName, setNewMemberName, handleAddMember, setShowAddMemberModal }) => {
    return (
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
    );
};

export default AddMemberModal;
