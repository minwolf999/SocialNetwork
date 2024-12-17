import React, { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { deleteCookie } from "../Utils/deleteCookie";

const RightPanelFunctions = ({
  setUsersSuggestions,
  setGroupsSuggestions,
  handleShowNotifications,
  resultUserInfo,
  resultAllUsers,
  resultAllGroups,
  setActiveComponent,
  COMPONENTS,
  searchTerm,
  setSearchTerm,
}) => {
  const [isOpen, setIsOpen] = useState(false); // State for dropdown menu
  const router = useRouter(); // use useRouter inside the component

  useEffect(() => {
    if (searchTerm.trim()) {
      const filteredUsers = resultAllUsers.filter(
        (user) =>
          (user.FirstName &&
            user.FirstName.toLowerCase().includes(searchTerm.toLowerCase())) ||
          (user.LastName &&
            user.LastName.toLowerCase().includes(searchTerm.toLowerCase()))
      );
      const filteredGroups = resultAllGroups.filter((group) =>
        group.GroupName.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setUsersSuggestions(filteredUsers);
      setGroupsSuggestions(filteredGroups);
    }
  }, [
    searchTerm,
    resultAllUsers,
    resultAllGroups,
    setGroupsSuggestions,
    setUsersSuggestions,
  ]);

  // Toggle dropdown
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  // Handle bell icon click
  const bellIcon = () => {
    setActiveComponent(COMPONENTS.NOTIFICATIONS);
    setSearchTerm(""); // Clear the search bar

    if (typeof handleShowNotifications === "function") {
      handleShowNotifications();
    }
  };

  const ToProfile = () => {
    router.push(`../profile/${resultUserInfo.Id}`);
  };

  return (
    <div className="flex flex-row p-0.5 h-14 shadow-lg border-b justify-evenly">
      <div className="flex">
        <input
          className="bg-customGray text-sm text-black m-4 max-w-[px]"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setActiveComponent(COMPONENTS.SUGGESTIONS);
          }}
        />
      </div>
      <div className="flex items-center align-middle">
        <ul className="flex flex-row items-center justify-center">
          <li className="mr-2 cursor-pointer">
            <img
              alt="own user profile picture"
              onClick={toggleDropdown}
              className=" rounded-full p-1 w-10 h-10 m-1"
              src={resultUserInfo.ProfilePicture}
            />
            {isOpen && (
              <ul className="absolute z-10 right-0 mt-2 w-48 bg-[#6C6C6C] rounded mr-4">
                <li className="px-4 py-2 hover:bg-gray-200">
                  <div onClick={ToProfile} className="flex items-center">
                    <img
                      className="mr-2"
                      src="/svg/Profile.svg"
                      alt="Profile picture"
                    />
                    <button className="text-white">Profile</button>
                  </div>
                </li>
                <li className="px-4 py-2 hover:bg-gray-200">
                  <div
                    onClick={() => deleteCookie(router)}
                    className="flex items-center"
                  >
                    <img
                      className="mr-2"
                      src="/svg/Logout.svg"
                      alt="Logout icon"
                    />
                    <button className="text-white">Logout</button>
                  </div>
                </li>
              </ul>
            )}
          </li>
          <button onClick={bellIcon} className="ml-2 z-10 cursor-pointer">
            <img
              src="/svg/Bell.svg"
              alt="Bell icon"
              className="min:w-full min:h-full"
            />
          </button>
        </ul>
      </div>
    </div>
  );
};

export default RightPanelFunctions;
