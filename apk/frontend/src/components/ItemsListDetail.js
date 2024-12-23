import React from 'react';

const ItemsListDetail = ({
                        filter,
                        setFilter,
                        filteredItems,
                        handleCheckboxChange,
                        owner,
                        setItemToRemove,
                        setShowRemoveModal,
                        setShowAddItemModal,
                    }) => {
    return (
        <div className="bg-white rounded-lg shadow-2xl p-4 flex flex-col">
            <div className="flex flex-col sm:flex-row justify-between items-center mb-2">
                <div className="flex items-center space-x-2">
                    <h3 className="text-lg">Filter by:</h3>
                    <select
                        className="border rounded-md p-1"
                        value={filter}
                        onChange={(e) => setFilter(e.target.value)}
                    >
                        <option value="all">All</option>
                        <option value="done">Done</option>
                        <option value="not_done">Not done</option>
                    </select>
                </div>

                <button
                    className="bg-blue-500 text-white px-8 py-2 rounded-md"
                    onClick={() => setShowAddItemModal(true)}
                >
                    Add new
                </button>
            </div>

            <hr className="my-2" />
            <div className="overflow-y-auto max-h-[250px]">
                <div className="space-y-2">
                    {filteredItems.map((item, index) => (
                        <div
                            key={index}
                            className="flex justify-between items-center bg-gray-100 rounded-lg p-2 shadow-sm"
                        >
                            <div className="flex items-center">
                                <input
                                    type="checkbox"
                                    checked={item.isDone}
                                    onChange={() => handleCheckboxChange(index)}
                                    className="mr-2"
                                />
                                <div
                                    className={`flex flex-col ${
                                        item.isDone ? 'line-through text-gray-500' : 'text-gray-800'
                                    }`}
                                >
                                    <span>{item.name}</span>
                                    <span className="text-sm text-gray-600">
                    {item.description} by {item.author}
                  </span>
                                </div>
                            </div>
                            {owner && (
                                <button
                                    className=" text-red-500 px-2 font-bold rounded-md"
                                    onClick={() => {
                                        setItemToRemove(index);
                                        setShowRemoveModal(true);
                                    }}
                                >
                                    Remove
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
