"use client";

import React from "react";
import { FetchInviteGroup } from "../Utils/fetchGroupRequest";

const GroupAddMembersComponent = ({
  name,
  userId,
  picture,
  group,
  cookieValue,
  ws,
}) => {
  const handleInvitation = () => {
    FetchInviteGroup(cookieValue, group.Id, userId);
  };

  return (
    <div
      key={userId}
      className="w-[103px] flex-col justify-center items-center gap-3.5 inline-flex"
    >
      <img
        alt="Group members picture"
        className="w-12 h-12 rounded-[100px]"
        src={picture}
      />
      <div className="w-[103px] h-[19px] text-[#091314] text-base font-normal font-roboto flex justify-center items-center text-center">
        {name}
      </div>
      <button
        onClick={handleInvitation}
        className="bg-[#33a9ff] h-8 w-20 rounded-lg justify-center items-center inline-flex text-[#e7e9e9] text-sm font-normal font-roboto"
      >
        Invite
      </button>
    </div>
  );
};

export default GroupAddMembersComponent;
