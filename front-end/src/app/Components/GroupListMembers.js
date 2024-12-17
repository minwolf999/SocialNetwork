"use client";

import React, { useState } from "react";
import GroupMembersComponent from "./GroupMembers";
import GroupInviteMembersComponent from "./GroupInviteMembers";


const GroupListMembersComponent = ( { groupMembers, isMember, userFollowers, group, cookieValue, invitationUserInGroup, invitationGet }) => {
  const [showModal, setShowModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState(""); // State for search input
  const toggleModal = () => setShowModal((prev) => !prev);

  return (
    <div className="flex flex-col mt-4">
      {(isMember) ? (
        <div className="flex flex-row w-full justify-evenly">
        <input
          type="text"
          placeholder="Rechercher"
          className="w-56 h-8 bg-[#f8f9fa] rounded-lg"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        ></input>

        <button
          onClick={toggleModal}
          className="w-20 h-8 bg-[#33a9ff] rounded-lg justify-center items-center text-[#e7e9e9] text-sm font-normal font-roboto"
        >
          Invite
        </button>
        {showModal && <GroupInviteMembersComponent
        closeModal={toggleModal}
        userFollowers={userFollowers}
        group={group}
        cookieValue={cookieValue}
        invitationUserInGroup={invitationUserInGroup}
        invitationGet={invitationGet}/>}
      </div>
      ) : (
        <p></p>
      )}      
      <div className="w-full h-[50vh] flex-col gap-4 flex mt-6">        
          <GroupMembersComponent groupMembers={groupMembers} searchTerm={searchTerm}/>
      </div>
    </div>
  );
};

export default GroupListMembersComponent;
