import React from 'react';
import { useTranslation } from 'react-i18next';

const ShoppingListSummary = ({ filteredLists, isDarkMode }) => {
    const { t } = useTranslation();

    return (
        <div className="mt-4 space-y-4">
            <div
                className={`rounded-lg shadow-lg p-4 mx-10 ${isDarkMode ? 'bg-gray-700 text-white' : 'bg-gray-200 text-black'}`}
            >
                {/* Kontrola, zda existují nějaké seznamy */}
                {filteredLists.length > 0 ? (
                    <div>
                        <h3 className="text-lg font-bold">Info</h3>
                        {/* Pro každý list zobrazení na řádku */}
                        {filteredLists.map((list) => (
                            <div key={list.id} className="flex justify-between items-center my-2">
                                <div>
                                    <h4 className="font-bold">{list.name}</h4>
                                </div>
                                <div className="text-right">
                                    <p>{t('items')}: {list.items.length}</p>
                                    {/* Zde můžete přidat další logiku pro zobrazení položek tohoto seznamu */}
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div>{t('no_lists')}</div> // Pokud nejsou žádné seznamy
                )}
            </div>
        </div>
    );
};

export default ShoppingListSummary;
