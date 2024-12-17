import React, { useState } from "react";
import { useRouter } from "next/navigation";


const Suggestions = ({usersSuggestions, groupsSuggestions }) => {
  const [showUsers, setShowUsers] = useState(true)
  const router = useRouter();
  const changeTabToUser = () => setShowUsers(true);
  const changeTabToGroup = () => setShowUsers(false);

  const handleProfileClick = (userId) => {
        router.push(`../profile/${userId}`);
  };

  const handleGroupClick = async (groupId) => {
        router.push(`../group/${groupId}`);
  };

  return (
    <div className="h-screen overflow-hidden relative shadow-lg border-b">
      <div className="flex flex-row justify-around">
        <button
          className={`text-black p-2 w-[150px] ${!showUsers ? "bg-gray-200" : ""}`}
          onClick={changeTabToUser}
        >
          Personnes
        </button>
        <button
          className={`text-black p-2 w-[150px] ${showUsers ? "bg-gray-200" : ""}`}
          onClick={changeTabToGroup}
        >
          Groupes
        </button>
      </div>
      {(usersSuggestions.length > 0 && showUsers) ? (
        usersSuggestions.map((user) => (
          <button onClick={() => handleProfileClick(user.Id)} key={user.Id} className="flex flex-col suggestion-item p-2 text-black border-black">
            {user.FirstName} {user.LastName}
          </button>
        ))
      ) : !showUsers ? (
        groupsSuggestions.map((group) => (
          <button onClick={() => handleGroupClick(group.Id)} key={group.Id} className="flex flex-col suggestion-item p-2 text-black border-black">
            {group.GroupName}
          </button>
        ))
      ) : (
        <p className="text-black">No suggestions available</p>
      )}
    </div>
  );
};

export default Suggestions;
