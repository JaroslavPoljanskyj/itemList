import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import AddItemModal from "../modals/AddItemModal";
import RemoveItemModal from "../modals/RemoveItemModal";
import EditTitleModal from "../modals/EditTitleModal";
import AddMemberModal from "../modals/AddMemberModal";
import ItemsListDetail from "./ItemsListDetail";
import MembersListDetail from "./MembersListDetail";
import { useTranslation } from 'react-i18next';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

import axios from "axios";

ChartJS.register(ArcElement, Tooltip, Legend);

const ShoppingListDetail = () => {
    const { listId } = useParams();
    const navigate = useNavigate();

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
    const { t, i18n } = useTranslation(); // Hook for translations


    const location = useLocation();
    const isDarkMode = location.state?.isDarkMode || false;


    const fetchListData = async () => {
        try {
            const token = localStorage.getItem('jwt');
            const response = await axios.get(`http://localhost:3003/lists/${listId}`, {
                headers: { 'Authorization': `Bearer ${token}` },
                withCredentials: true,
            });
            const data = response.data;
            setListTitle(data.name);
            setMembers(data.users);
            setItems(data.items);
        } catch (err) {
            setError('Failed to fetch list data. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchListData();  // Načteme data při změně `listId`
    }, [listId]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    const handleCheckboxChange = (index) => {
        const updatedItems = items.map((item, i) => {
            if (i === index) return { ...item, isDone: !item.isDone };
            return item;
        });
        setItems(updatedItems);
    };

    // Přidání položky
    const handleAddItem = async () => {
        try {
            const token = localStorage.getItem('jwt');
            const response = await axios.post(
                `http://localhost:3003/lists/${listId}/items/`,
                { listId: listId, ...newItem },
                {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    },
                    withCredentials: true
                }
            );

            // Zavoláme fetchListData, abychom načetli aktualizované položky
            fetchListData();

            setShowAddItemModal(false);
            setNewItem({ name: '', description: '', author: 'Test User', isDone: false });
        } catch (err) {
            console.error('Failed to add item:', err);
        }
    };

    // Smazání položky
    const deleteItem = async (itemId) => {
        try {
            const token = localStorage.getItem('jwt');
            await axios.delete(`http://localhost:3003/lists/${listId}/items/${itemId}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                withCredentials: true
            });
            setItems(items.filter(item => item.id !== itemId)); // Aktualizace stavu
        } catch (err) {
            console.error('Failed to delete item:', err);
        }
    };

    const handleRemoveItem = () => {
        if (itemToRemove) {
            deleteItem(itemToRemove.id);
        }
        setShowRemoveModal(false);
        setItemToRemove(null);
    };

    const handleUpdateTitle = async () => {
        try {
            const token = localStorage.getItem('jwt');
            const response = await axios.post(
                `http://localhost:3003/lists/${listId}`,
                { name: editedTitle },
                {
                    headers: { 'Authorization': `Bearer ${token}` },
                    withCredentials: true,
                }
            );
            setListTitle(response.data.list.name);
            setShowEditModal(false);
        } catch (err) {
            console.error("Failed to update title:", err);
            alert("Failed to update title. Please try again.");
        }
    };

    const handleAddMember = () => {
        if (newMemberName) {
            setMembers([...members, { name: newMemberName, isOwner: false }]);
            setShowAddMemberModal(false);
            setNewMemberName('');
        }
    };

    const filteredItems = (items || []).filter((item) => {
        if (filter === 'done') return item.isDone;
        if (filter === 'not_done') return !item.isDone;
        return true;
    });

    const owner = members?.find((member) => member.role === "Owner");

    const pieChartData = {
        datasets: [
            {
                data: [
                    items.filter(item => item.isDone).length,
                    items.filter(item => !item.isDone).length,
                ],
                backgroundColor: ['#36A2EB', '#FF6384'],
                hoverBackgroundColor: ['#36A2EB', '#FF6384'],
            },
        ],
    };

    return (
        <div className={`flex flex-col py-4 space-y-4 h-screen ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'}`}>
            <header className={`sticky top-0 shadow-lg z-10 p-4 ${isDarkMode ? 'bg-gray-800 text-gray-200' : 'bg-white text-gray-900'}`}>
                <div className="flex items-center justify-between">
                    <button
                        className={`flex items-center ${isDarkMode ? 'text-blue-400' : 'text-blue-500'}`}
                        onClick={() => navigate('/shopping-list')}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12H3m0 0l6-6m-6 6l6 6" />
                        </svg>
                    </button>
                    <div className="flex items-center space-x-2">
                        <span className={isDarkMode ? 'text-gray-300' : 'text-gray-700'}>{owner?.name}</span>
                        <button className="bg-red-500 text-white px-2 py-1 rounded" onClick={() => navigate('/login')}>{t('logout')}</button>
                    </div>
                </div>
            </header>

            <div className="mt-4 space-y-4 mx-4 flex-1">
                <div
                    className={`flex justify-between items-center px-4 py-4 rounded-lg shadow-lg ${
                        isDarkMode ? "bg-gray-800 text-gray-200" : "bg-blue-100 text-gray-900"
                    }`}
                >
                    <div className="flex items-center space-x-6">
                        {/* Div s názvem seznamu */}
                        <div className="flex flex-col">
                            <h1 className="text-xl font-bold">
                                {listTitle} ({items.length} {t("items")})
                                <button
                                    onClick={() => setShowEditModal(true)}
                                    className={`ml-2 inline-flex items-center ${
                                        isDarkMode
                                            ? "text-gray-400 hover:text-blue-400"
                                            : "text-gray-500 hover:text-blue-500"
                                    }`}
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-5 w-5"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M3 21v-3a1 1 0 011-1h3m10-10l3 3m-3-3L9 18l-3 3H5a1 1 0 01-1-1v-3a1 1 0 011-1h3l6-6z"
                                        />
                                    </svg>
                                </button>
                            </h1>
                            <p
                                className={`text-sm ${
                                    isDarkMode ? "text-gray-400" : "text-gray-600"
                                }`}
                            >
                                {t("author")} {owner?.username}
                            </p>
                        </div>

                        {/* Pie graf a legenda */}
                        <div className="flex flex-col items-center">
                            <div className="w-32 h-32">
                                <Pie data={pieChartData} />
                            </div>
                            <div className="flex flex-col items-start mt-2">
                                <p className="text-sm">
          <span
              className="inline-block w-3 h-3 mr-2 rounded-full"
              style={{ backgroundColor: pieChartData.datasets[0].backgroundColor[0] }}
          ></span>
                                    Completed
                                </p>
                                <p className="text-sm">
          <span
              className="inline-block w-3 h-3 mr-2 rounded-full"
              style={{ backgroundColor: pieChartData.datasets[0].backgroundColor[1] }}
          ></span>
                                    Pending
                                </p>
                            </div>
                        </div>
                    </div>

                    <button
                        className="bg-red-500 text-white px-4 py-2 rounded-md"
                        onClick={
                            owner ? () => setShowRemoveModal(true) : () => {
                                /* Leave logic */
                            }
                        }
                    >
                        {owner ? t("delete") : t("leave")}
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
                    handleCheckboxChange={(index) => {
                        const updatedItems = items.map((item, i) => i === index ? { ...item, isDone: !item.isDone } : item);
                        setItems(updatedItems);
                    }}
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
