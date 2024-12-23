const MembersListDetail = ({ members, onRemoveClick, onAddMemberClick }) => {
    return (
        <div className="bg-gray-100 rounded-lg shadow-lg p-4">
            <h2 className="text-lg font-semibold">
                Members ({members?.length})
            </h2>
            <div className="flex flex-wrap mt-2 gap-2">
                {members?.map((member, index) => (
                    <span
                        key={index}
                        className={`${member.isOwner ? 'bg-blue-600' : 'bg-blue-400'} text-white rounded-md px-3 py-1 shadow flex items-center`}
                    >
                        {member.name}
                        {!member.isOwner && (
                            <span
                                className="text-black-500 ml-2 cursor-pointer"
                                onClick={() => onRemoveClick(index)}  // volání funkce z props
                            >
                                X
                            </span>
                        )}
                    </span>
                ))}
                <button
                    className="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center"
                    onClick={onAddMemberClick}  // volání funkce z props
                >
                    +
                </button>
            </div>
        </div>
    );
};
export default MembersListDetail;