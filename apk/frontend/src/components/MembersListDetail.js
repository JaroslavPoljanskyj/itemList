import {useState} from "react";
import { useTranslation } from 'react-i18next';

const MembersListDetail = ({ members, onRemoveClick, onAddMemberClick }) => {
    const [isDarkMode, setIsDarkMode] = useState(() => {
        return localStorage.getItem('darkMode') === 'true';
    });
    const { t, i18n } = useTranslation(); // Hook for translations

    return (
        <div className={`rounded-lg shadow-lg p-4 ${isDarkMode ? 'bg-gray-800 text-gray-200' : 'bg-gray-100 text-gray-900'}`}>
            <h2 className="text-lg font-semibold">
                {t('members')} ({members?.length})
            </h2>
            <div className="flex flex-wrap mt-2 gap-2">
                {members?.map((member, index) => (
                    <span
                        key={index}
                        className={`${
                            member.role === "Owner"
                                ? isDarkMode
                                    ? 'bg-blue-500'
                                    : 'bg-blue-600'
                                : isDarkMode
                                    ? 'bg-blue-400'
                                    : 'bg-blue-400'
                        } text-white rounded-md px-3 py-1 shadow flex items-center`}
                    >
                {member.username}
                        {/* Pokud to není "Owner", zobrazí se "X" pro odstranění */}
                        {member.role !== "Owner" && (
                            <span
                                className={`ml-2 cursor-pointer ${isDarkMode ? 'text-gray-200' : 'text-black-500'}`}
                                onClick={() => onRemoveClick(index)} // volání funkce z props
                            >
                        X
                    </span>
                        )}
            </span>
                ))}
                <button
                    className={`rounded-full w-8 h-8 flex items-center justify-center ${
                        isDarkMode ? 'bg-blue-500 text-gray-200' : 'bg-blue-500 text-white'
                    }`}
                    onClick={onAddMemberClick} // volání funkce z props
                >
                    +
                </button>
            </div>
        </div>
    );
};
export default MembersListDetail;