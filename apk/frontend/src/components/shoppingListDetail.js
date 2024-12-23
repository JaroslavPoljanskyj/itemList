import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import AddItemModal from "../modals/AddItemModal";
import RemoveItemModal from "../modals/RemoveItemModal";
import EditTitleModal from "../modals/EditTitleModal";
import AddMemberModal from "../modals/AddMemberModal";
import ItemsListDetail from "./ItemsListDetail";
import MembersListDetail from "./MembersListDetail";
import axios from "axios";

const ShoppingListDetail = () => {
    const { listId } = useParams();
    const navigate = useNavigate();

    // Stavové Hooky na vrcholu komponenty
    const [members, setMembers] = useState([]);
    const [items, setItems] = useState([]);
    const [listTitle, setListTitle] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [filter, setFilter] = useState('all');
    const [newItem, setNewItem] = useState({ name: '', description: '', author: 'Test User', isDone: false });
    const [showAddItemModal, setShowAddItemModal] = useState(false);
    const [showRemoveModal, setShowRemoveModal] = useState(false);
    const [itemToRemove, setItemToRemove] = useState(null);
    const [showEditModal, setShowEditModal] = useState(false);
    const [editedTitle, setEditedTitle] = useState('');
    const [newMemberName, setNewMemberName] = useState('');
    const [showAddMemberModal, setShowAddMemberModal] = useState(false);

    useEffect(() => {
        const fetchListData = async () => {
            try {
                const token = localStorage.getItem('jwt'); // JWT token z localStorage
                const response = await axios.get(`http://localhost:3003/lists/${listId}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                    withCredentials: true, // Zahrnuje cookies
                });
                const data = response.data;
                setListTitle(data.title);
                setMembers(data.members);
                setItems(data.items);
            } catch (err) {
                setError('Failed to fetch list data. Please try again later.');
            } finally {
                setLoading(false);
            }
        };

        fetchListData();
    }, [listId]);

    // Zobrazení během načítání nebo při chybě
    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    // Funkce pro manipulaci s daty
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

    // Filtrace položek podle filtru
    const filteredItems = (items || []).filter((item) => {
        if (filter === 'done') return item.isDone;
        if (filter === 'not_done') return !item.isDone;
        return true;
    });

    const owner = members?.find((member) => member.isOwner);

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
                    <button className="bg-red-500 text-white px-4 py-2 rounded-md" onClick={owner ? () => setShowRemoveModal(true) : () => {/* Leave logic here */}} >
                        {owner ? 'Delete' : 'Leave'}
                    </button>
                </div>

                <MembersListDetail
                    members={members}
                    onRemoveClick={(index) => {
                        setItemToRemove(index);
                        setShowRemoveModal(true);
                    }}
                    onAddMemberClick={() => setShowAddMemberModal(true)}
                />

                <ItemsListDetail
                    filter={filter}
                    setFilter={setFilter}
                    filteredItems={filteredItems}
                    handleCheckboxChange={handleCheckboxChange}
                    owner={owner}
                    setItemToRemove={setItemToRemove}
                    setShowRemoveModal={setShowRemoveModal}
                    setShowAddItemModal={setShowAddItemModal}
                />
            </div>

            {/* Modals */}
            {showAddItemModal && <AddItemModal {...{ showAddItemModal, setShowAddItemModal, newItem, setNewItem, handleAddItem }} />}
            {showRemoveModal && <RemoveItemModal {...{ showRemoveModal, setShowRemoveModal, handleRemoveItem }} />}
            {showEditModal && <EditTitleModal {...{ showEditModal, setShowEditModal, editedTitle, setEditedTitle, handleUpdateTitle }} />}
            {showAddMemberModal && <AddMemberModal {...{ showAddMemberModal, setShowAddMemberModal, newMemberName, setNewMemberName, handleAddMember }} />}
        </div>
    );
};

export default ShoppingListDetail;
