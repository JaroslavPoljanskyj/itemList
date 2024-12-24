import React, {useState} from 'react';
import { useTranslation } from 'react-i18next';


const ItemsListDetail = ({
                        filter,
                        setFilter,
                        filteredItems,
                        handleCheckboxChange,
                        owner,
                        setItemToRemove,
                        setShowRemoveModal,
                        setShowAddItemModal

                    }) => {

    const [isDarkMode, setIsDarkMode] = useState(() => {
        return localStorage.getItem('darkMode') === 'true';
    });

    const { t, i18n } = useTranslation();

    return (
        <div className={`rounded-lg shadow-2xl p-4 flex flex-col ${isDarkMode ? 'bg-gray-800 text-gray-200' : 'bg-white text-gray-900'}`}>
            <div className="flex flex-col sm:flex-row justify-between items-center mb-2">
                <div className="flex items-center space-x-2">
                    <h3 className="text-lg">{t('filter_by')}:</h3>
                    <select
                        className={`border rounded-md p-1 ${isDarkMode ? 'bg-gray-700 border-gray-600 text-gray-200' : 'bg-white border-gray-300 text-gray-900'}`}
                        value={filter}
                        onChange={(e) => setFilter(e.target.value)}
                    >
                        <option value="all">{t('all')}</option>
                        <option value="done">{t('done')}</option>
                        <option value="not_done">{t('not_done')}</option>
                    </select>
                </div>

                <button
                    className={`px-8 py-2 rounded-md ${isDarkMode ? 'bg-blue-500 text-gray-200' : 'bg-blue-500 text-white'}`}
                    onClick={() => setShowAddItemModal(true)}
                >
                    {t('add_new')}
                </button>
            </div>

            <hr className={`my-2 ${isDarkMode ? 'border-gray-600' : 'border-gray-300'}`} />
            <div className="overflow-y-auto max-h-[250px]">
                <div className="space-y-2">
                    {filteredItems.map((item, index) => (
                        <div
                            key={index}
                            className={`flex justify-between items-center rounded-lg p-2 shadow-sm ${
                                isDarkMode ? 'bg-gray-700 text-gray-200' : 'bg-gray-100 text-gray-800'
                            }`}
                        >
                            <div className="flex items-center">
                                <input
                                    type="checkbox"
                                    checked={item.isDone}
                                    onChange={() => handleCheckboxChange(index)}
                                    className={`mr-2 ${isDarkMode ? 'bg-gray-600 text-gray-200' : ''}`}
                                />
                                <div
                                    className={`flex flex-col ${
                                        item.isDone
                                            ? isDarkMode
                                                ? 'line-through text-gray-500'
                                                : 'line-through text-gray-500'
                                            : isDarkMode
                                                ? 'text-gray-200'
                                                : 'text-gray-800'
                                    }`}
                                >
                                    <span>{item.name}</span>
                                    <span className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                                {item.description} by {item.author}
                            </span>
                                </div>
                            </div>
                            {owner && (
                                <button
                                    className={`px-2 font-bold rounded-md ${
                                        isDarkMode ? 'text-red-400' : 'text-red-500'
                                    }`}
                                    onClick={() => {
                                        setItemToRemove(index);
                                        setShowRemoveModal(true);
                                    }}
                                >
                                    {t('remove')}
                                </button>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ItemsListDetail;
