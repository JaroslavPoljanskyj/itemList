import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const ShoppingListItem = ({ id, name, author, items, members, isDarkMode }) => {
    const navigate = useNavigate();
    const { t } = useTranslation();
    const [optionsOpen, setOptionsOpen] = useState(false); // Stav pro zobrazení možností

    const handleViewClick = () => {
        navigate(`/shopping-list/${id}`, { state: { isDarkMode }} );
    };

    const toggleOptions = () => {
        setOptionsOpen(!optionsOpen);
    };

    const handleArchive = () => {


    };

    const handleDelete = () => {


    };

    return (
        <div className={`rounded-lg shadow-lg p-4 mx-10 ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-black'}`}>
            <div className="flex justify-between items-center">
                <div>
                    <h3 className="text-lg font-bold">{name}</h3>
                    <p className="text-sm text-gray-500">{author}</p>
                </div>
                {/* Tři tečky pro možnosti */}
                <div className="relative">
                    <button onClick={toggleOptions} className="text-lg text-gray-500">
                        &#x22EE; {/* Vertical ellipsis */}
                    </button>
                    {optionsOpen && (
                        <div className="absolute right-0 mt-2 bg-white dark:bg-gray-700 rounded shadow-lg">
                            <div
                                className="px-4 py-2 cursor-pointer"
                                onClick={handleArchive}
                            >
                                {t('archived')} {/* Přeložený text pro archivaci */}
                            </div>
                            <div
                                className="px-4 py-2 cursor-pointer"
                                onClick={handleDelete}
                            >
                                {t('delete')} {/* Přeložený text pro odstranění */}
                            </div>
                        </div>
                    )}
                </div>
            </div>
            <hr className="my-2" />
            <div className="flex flex-col">
                <div>
                    <p className="font-bold">{t('items')}:</p>
                    <div className="flex flex-wrap space-x-1">
                        {items.map((item, index) => (
                            <span key={index} className={`rounded-md px-2 py-1 text-sm ${isDarkMode ? 'bg-gray-700 text-white' : 'bg-gray-200 text-black'}`}>
                                {item}
                            </span>
                        ))}
                    </div>
                </div>
                <div className="mt-2">
                    <p className="font-bold">{t('members')}:</p>
                    <div className="flex flex-wrap space-x-1">
                        {members.map((member, index) => (
                            <span key={index} className={`rounded-md px-2 py-1 text-sm ${isDarkMode ? 'bg-gray-700 text-white' : 'bg-gray-200 text-black'}`}>
                                {member}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
            <hr className="my-2" />
            <button
                className="text-blue-500 font-bold"
                onClick={handleViewClick}
            >
                {t('view_more')}
            </button>
        </div>
    );
};

export default ShoppingListItem;
