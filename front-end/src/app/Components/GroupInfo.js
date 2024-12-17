"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { useParams } from "next/navigation"; // Correct hook for dynamic routes in the app directory
import { FetchLeaveGroup, FetchJoinGroup } from "../Utils/fetchGroupRequest";

const GroupRequestsListComponent = ({
  group,
  isMember,
  cookieValue,
  sendRequest,
  setSendRequest,
  switchPostsToChat,
  showPostsOrChat,
  ws,
}) => {
  console.log(group)
  const router = useRouter(); // React router navigation
  const { groupId } = useParams(); // Use useParams to get dynamic route parameter

  const handleJoinGroup = () => {
    if (isMember) {
      const fetchLeaveGroup = async () => {
        try {
          const leaveGroup = await FetchLeaveGroup(groupId, cookieValue);
          if (leaveGroup?.Success) {
            setSendRequest(false);
            router.push(`../group/${groupId}`);
            return;
          }
        } catch (error) {
          console.error("Error fetching leave group:", error);
        }
      };
      fetchLeaveGroup();
    } else if (!isMember) {
      const fetchJoinGroup = async () => {
        try {
          const joinGroup = await FetchJoinGroup(groupId, cookieValue);
          if (joinGroup?.Success) {
            setSendRequest(true);
            router.push(`../group/${groupId}`);
            return;
          }
        } catch (error) {
          console.error("Error fetching join group:", error);
        }
      };
      fetchJoinGroup();
    }
  };

  return (
    <div className="flex flex-col mt-4">
      {!isMember && sendRequest ? (
        <button className="bg-gray-500 text-black p-2 m-2">
          Requête en attente
        </button>
      ) : !isMember ? (
        <button
          className="bg-blue-500 text-white p-2 m-2"
          onClick={handleJoinGroup}
        >
          Rejoindre le groupe
        </button>
      ) : (
        <div className="flex flex-col">
          {showPostsOrChat ? (
            <button
              className="bg-green-500 text-black p-2 m-2"
              onClick={() => switchPostsToChat()}
            >
              Chat
            </button>
          ) : (
            <button
              className="bg-green-500 text-black p-2 m-2"
              onClick={() => switchPostsToChat()}
            >
              Posts
            </button>
          )}
          <button
            className="bg-red-500 text-black p-2 m-2"
            onClick={handleJoinGroup}
          >
            Quitter le groupe
          </button>
        </div>
      )}
      <div className=" w-[180px] left-[16px] top-[269px] text-black text-base font-bold font-inter ml-3">
        {group.GroupName}
      </div>
      <div className="flex w-[222px] text-black text-base font-normal font-inter ml-5 m-1">
        <img alt="Foundation group svg" src="/svg/FoundationGroup.svg" />
        <span className="flex ml-2">Founded by {group.Leader}</span>
      </div>
      <div className="flex w-[222px] text-black text-base font-normal font-inter ml-5 m-1">
        <img alt="Creation group svg" src="/svg/CreationDateGroup.svg" />
        <span className="flex ml-2">{group.CreationDate}</span>
      </div>
      <div className=" flex w-[180px]s text-black text-base font-normal font-inter ml-5 m-1">
        <img alt="Member svg" src="/svg/Member.svg" />
        <span className="flex ml-2">{group.SplitMemberIds?.length} members</span>
      </div>
      <div className="w-full text-black text-base font-bold font-inter mt-4">
        About
        <div className="w-[90%] h-[20vh] text-black text-base font-normal font-inter bg-customGrey m-2">
          {group.GroupDescription}
        </div>
      </div>
    </div>
  );
};

export default GroupRequestsListComponent;
