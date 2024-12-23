import React, { useEffect, useState } from 'react';
import ShoppingListItem from './shoppingListItem';
import axios from 'axios';
import AddListModal from '../modals/AddListModal'; // Import the new AddListModal component

const ShoppingList = () => {
    const [lists, setLists] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showModal, setShowModal] = useState(false); // State to manage modal visibility

    // Function to fetch lists
    const fetchLists = async () => {
        try {
            setIsLoading(true);
            const token = localStorage.getItem('jwt');
            const response = await axios.get('http://localhost:3003/lists', {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
                withCredentials: true,
            });
            console.log("token pri ziskavani vsech listu:" + token)
            setLists(response.data);
        } catch (err) {
            setError('Failed to fetch lists. Please try again later.');
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchLists(); // Fetch lists when the component mounts
    }, []);

    const openModal = () => setShowModal(true); // Open the modal
    const closeModal = () => setShowModal(false); // Close the modal

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div className="text-red-500">{error}</div>;
    }

    return (
        <div className="py-4">
            {/* Header */}
            <header className="bg-white sticky top-0 shadow-lg z-10">
                <div className="flex justify-between items-center p-4">
                    <button
                        className="bg-blue-500 text-white px-4 py-2 rounded"
                        onClick={openModal} // Open modal on button click
                    >
                        Add New
                    </button>
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
                {lists.length > 0 ? (
                    lists.map((list, index) => (
                        <ShoppingListItem
                            key={index}
                            id={list.id} // Přidání ID seznamu
                            name={list.name}
                            author={list.users.find((user) => user.role === 'Owner')?.username || 'Unknown'}
                            items={list.items.map((item) => item.name)}
                            members={list.users.map((user) => user.username)}
                        />
                    ))
                ) : (
                    <div>No lists available.</div>
                )}
            </div>

            {/* AddListModal */}
            <AddListModal
                showModal={showModal}
                closeModal={closeModal}
                fetchLists={fetchLists} // Pass fetchLists as prop
            />
        </div>
    );
};

export default ShoppingList;
