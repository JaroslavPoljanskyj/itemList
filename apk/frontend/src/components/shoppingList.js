import React, { useEffect, useState } from 'react';
import ShoppingListItem from './shoppingListItem';
import axios from 'axios';
import AddListModal from '../modals/AddListModal';
import { useUser } from '../Context/UserContext';
import { useTranslation } from 'react-i18next';
import ShoppingListSummary from "./ShoppingListSummary";

const ShoppingList = () => {
    const [lists, setLists] = useState([]);
    const [filteredLists, setFilteredLists] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showModal, setShowModal] = useState(false); // State to manage modal visibility
    const [isDarkMode, setIsDarkMode] = useState(false); // State for dark mode
    const [dropdownOpen, setDropdownOpen] = useState(false); // State to manage dropdown visibility
    const [langDropdownOpen, setLangDropdownOpen] = useState(false); // State to manage language dropdown visibility
    const [filter, setFilter] = useState('all'); // State for filtering (All, My)
    const { userId, username, setUsername } = useUser();
    const { t, i18n } = useTranslation(); // Hook for translations

    // Function to fetch shopping lists
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
            const fetchedLists = response.data;

            let currentUsername = null;
            for (const list of fetchedLists) {
                const user = list.users.find((user) => user.userId === userId);
                if (user) {
                    currentUsername = user.username;
                    break;
                }
            }

            if (currentUsername) {
                setUsername(currentUsername);
            }
            setLists(fetchedLists);
            setFilteredLists(fetchedLists); // Set filtered lists to all initially
        } catch (err) {
            setError('Failed to fetch lists. Please try again later.');
        } finally {
            setIsLoading(false);
        }
    };

    // Function to filter lists based on selected filter
    const filterLists = () => {
        if (filter === 'all') {
            setFilteredLists(lists); // Show all lists
        } else if (filter === 'my') {
            const myLists = lists.filter((list) =>
                list.users.some((user) => user.username === username)

            );
            setFilteredLists(myLists);
        }
    };

    useEffect(() => {
        fetchLists(); // Fetch lists when the component mounts
        const storedMode = localStorage.getItem('darkMode');
        if (storedMode === 'true') {
            setIsDarkMode(true);
        }
    }, []);

    useEffect(() => {
        filterLists(); // Filter lists whenever the filter state changes
    }, [filter, lists]);

    useEffect(() => {
        if (isDarkMode) {
            document.body.classList.add('dark');
            localStorage.setItem('darkMode', 'true');
        } else {
            document.body.classList.remove('dark');
            localStorage.setItem('darkMode', 'false');
        }
    }, [isDarkMode]);

    const openModal = () => setShowModal(true); // Open the modal
    const closeModal = () => setShowModal(false); // Close the modal

    const toggleDarkMode = () => {
        setIsDarkMode(prevMode => !prevMode);
    };

    const changeLanguage = (lng) => {
        i18n.changeLanguage(lng); // Change language
    };

    if (isLoading) {
        return <div>{t('loading')}</div>;
    }

    if (error) {
        return <div className="text-red-500">{t('error')}</div>;
    }

    return (
        <div className={`py-4 ${isDarkMode ? 'bg-black text-white' : 'bg-white text-black'}`}>
            {/* Header */}
            <header className="bg-white sticky top-0 shadow-lg z-10 dark:bg-gray-800 dark:text-white">
                <div className="flex justify-between items-center p-4">
                    <button
                        className="bg-blue-500 text-white px-4 py-2 rounded"
                        onClick={openModal} // Open modal on button click
                    >
                        {t('add_new')}
                    </button>
                    <div className="flex items-center">
                        <button
                            className={`text-500 ${filter === 'all' ? 'font-bold' : ''}`}
                            onClick={() => setFilter('all')} // Filter for all lists
                        >
                            {t('all')}
                        </button>
                        <span className="mx-2">|</span>
                        <button
                            className={`text-500 ${filter === 'my' ? 'font-bold' : ''}`}
                            onClick={() => setFilter('my')} // Filter for user's lists
                        >
                            {t('my')}
                        </button>
                        <span className="mx-2">|</span>
                        <button
                            className={`text-500 ${filter === 'archived' ? 'font-bold' : ''}`}
                            onClick={() => setFilter('archived')} // Filter for all lists
                        >
                            {t('archived')}
                        </button>
                    </div>
                    <div className="flex items-center space-x-4">
                        <div className="relative">
                            {/* Username Dropdown */}
                            <span
                                className="mx-2 cursor-pointer"
                                onClick={() => setDropdownOpen(!dropdownOpen)}
                            >
                                {username} &#9662;
                            </span>
                            {dropdownOpen && (
                                <div className="absolute right-0 mt-2 bg-white dark:bg-gray-700 rounded shadow-lg">
                                    {/* Language Section */}
                                    <div className="px-4 py-2">
                                        <div
                                            className="cursor-pointer flex items-center"
                                            onClick={() => setLangDropdownOpen(!langDropdownOpen)}
                                        >
                                            <span>{i18n.language === 'en' ? 'Eng' : 'Cs'}</span>
                                            <span className="ml-2">&#9662;</span>
                                        </div>
                                        {langDropdownOpen && (
                                            <div className="mt-2">
                                                <button
                                                    onClick={() => changeLanguage('en')}
                                                    className="block w-full text-left py-2"
                                                >
                                                    English
                                                </button>
                                                <button
                                                    onClick={() => changeLanguage('cs')}
                                                    className="block w-full text-left py-2"
                                                >
                                                    Čeština
                                                </button>
                                            </div>
                                        )}
                                    </div>

                                    {/* Logout */}
                                    <div className="px-4 py-2">
                                        <button className="bg-red-500 text-xs text-white px-1 py-2 rounded">
                                            {t('logout')}
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                        {/* Dark Mode Switch */}
                        <label className="flex items-center cursor-pointer">
                            <span className="mr-2">{isDarkMode ? '🌙' : '☀️'}</span>
                            <input
                                type="checkbox"
                                checked={isDarkMode}
                                onChange={toggleDarkMode}
                                className="hidden"
                            />
                            <span
                                className="w-10 h-5 bg-gray-300 rounded-full relative transition-colors duration-300 ease-in-out"
                            >
                                <span
                                    className={`w-4 h-4 bg-white rounded-full absolute top-0.5 transition-transform duration-300 ease-in-out ${isDarkMode ? 'translate-x-5' : 'translate-x-0'}`}
                                ></span>
                            </span>
                        </label>
                    </div>
                </div>
            </header>

            <hr className="my-2" />

            <ShoppingListSummary
                filteredLists={filteredLists} // Předáváme celé pole seznamů
                isDarkMode={isDarkMode} // Předáváme stav temného režimu
            />


            {/* Body */}
            <div className="mt-4 space-y-4">
                {filteredLists.length > 0 ? (
                    filteredLists.map((list, index) => (
                        <ShoppingListItem
                            key={index}
                            id={list.id} // Add the list ID
                            name={list.name}
                            author={list.users.find((user) => user.role === 'Owner')?.username || 'Unknown'}
                            items={list.items.map((item) => item.name)}
                            members={list.users.map((user) => user.username)}
                            isDarkMode={isDarkMode}
                        />
                    ))
                ) : (
                    <div>{t('no_lists')}</div>
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
