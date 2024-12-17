"use client";

import React, { useState } from "react";
import GroupAddMembersComponent from "./GroupAddMembers"; // No curly braces here

const GroupInviteMembersComponent = ({
  closeModal,
  userFollowers,
  group,
  cookieValue,
  invitationUserInGroup,
  invitationGet,
  ws,
}) => {
  const [searchTerm, setSearchTerm] = useState(""); // State for search input

  return (
    <div className="fixed z-10 inset-0 bg-black/20 backdrop-blur-[12.10px] flex justify-center items-center">
      <div className="w-[38vw] h-[68vh] bg-[#fefeff] rounded-lg">
        <div className="flex items-center text-center align-middle mb-4 justify-around mt-4">
          <div></div>
          <div className="flex justify-center">
            <h2 className="flex text-3xl font-bold">Invitations</h2>
          </div>
          <button onClick={closeModal} className="flex cursor-pointer">
            {/* <ClosePostSvg /> */}
            <img src="/svg/ClosePost.svg" alt="Sparkles icon" />
          </button>
        </div>
        <input
          type="text"
          placeholder="Rechercher"
          className="flex w-56 h-8 bg-[#f8f9fa] rounded-lg ml-4"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        ></input>
        <div className="w-full flex-col gap-4 flex overflow-auto h-[55vh] hide-scrollbar">
          <div className="self-stretch grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 justify-items-center items-center gap-4">
            {userFollowers.Follow ? (
              userFollowers.Follow.map((follower) => (
                <React.Fragment key={follower.UserId}>
                  {invitationGet &&
                    follower.User_Name.toLowerCase().includes(
                      searchTerm.toLowerCase()
                    ) &&
                    !group.MemberIds.includes(follower.UserId) &&
                    !invitationUserInGroup.includes(follower.UserId) && (
                      <GroupAddMembersComponent
                        name={follower.User_Name}
                        userId={follower.UserId}
                        picture={follower.User_ProfilePicture}
                        group={group}
                        cookieValue={cookieValue}
                        ws={ws}
                      />
                    )}
                </React.Fragment>
              ))
            ) : (
              <p className="text-black">No follower to invite</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GroupInviteMembersComponent;
