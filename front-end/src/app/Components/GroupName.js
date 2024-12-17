"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import NotificationCount from "./NotificationCount";
import { FetchGroupsJoined } from "../Utils/fetchAllData";

export const GroupName = ({
  groupsJoined,
  cookieValue,
  ws,
  setResultGroupsJoined,
}) => {
  const router = useRouter(); // React router navigation
  const [hidden, setHidden] = useState(false);
  const [grouphover, setGroupHover] = useState("");
  const [refresh, setRefresh] = useState(true);

  const setHover = (hover, groupName) => {
    setHidden(hover);
    setGroupHover(groupName);
  };

  const handleGroupClick = (groupId) => {
    router.push(`../group/${groupId}`);
  };

  useEffect(() => {
    const handleWebSocketMessage = (event) => {
      try {
        const data = JSON.parse(event.data);

        if (
          (data.Type === "GroupPost" ||
            data.Type === "Event" ||
            data.Type == "Chat" ||
            data.Type === "Group Chat") &&
          location.pathname !== "/group/" + data.GroupId &&
          groupsJoined.groupsJoined &&
          groupsJoined.groupsJoined.length > 0
        ) {
          groupsJoined.groupsJoined.map((group) => {
            if (group.Id !== data.GroupId) return;

            group.NotificationQuantity += 1;
            setRefresh(false);

            setTimeout(() => {
              setRefresh(true);
            }, 1);
          });
        } else if (
          data.Type === "DeleteAllNotification" &&
          groupsJoined.groupsJoined &&
          groupsJoined.groupsJoined.length > 0
        ) {
          groupsJoined.groupsJoined.map((group) => {
            group.NotificationQuantity = 0;
            setRefresh(false);

            setTimeout(() => {
              setRefresh(true);
            }, 1);
          });
        } else if (
          data.Type === "DeleteGroupNotification" &&
          groupsJoined.groupsJoined &&
          groupsJoined.groupsJoined.length > 0
        ) {
          groupsJoined.groupsJoined.map((group) => {
            if (group.Id !== data.GroupId) return;

            group.NotificationQuantity = 0;
            setRefresh(false);

            setTimeout(() => {
              setRefresh(true);
            }, 1);
          });
        } else if (data.Type === "AcceptInviteGroup") {
          FetchGroupsJoined(cookieValue, setResultGroupsJoined);
        }
      } catch (error) {
        console.error("Error parsing WebSocket message:", error);
      }
    };

    ws.addEventListener("message", handleWebSocketMessage);
    return () => {
      ws.removeEventListener("message", handleWebSocketMessage);
    };
  }, [cookieValue, groupsJoined, ws, setResultGroupsJoined]);

  return (
    <div className="self-stretch p-2 justify-between inline-flex h-[85%]">
      <div className="p-2 justify-start items-center gap-2 flex flex-col cursor-pointer ">
        {refresh && groupsJoined && groupsJoined.length > 0 ? (
          groupsJoined.map((group) => (
            <div
              key={group.Id}
              className={`flex text-[#091314] text-sm font-normal font-roboto justify-center items-center p-1
            ${
              hidden && grouphover == group.GroupName
                ? "bg-customBlue rounded text-white"
                : null
            }`}
            >
              <img
                alt="group profile picture"
                className="w-12 h-12 flex-shrink mr-4"
                src={group.Banner}
              />
              <p
                className={`text-black`}
                onClick={() => handleGroupClick(group.Id)}
                onMouseEnter={() => setHover(true, group.GroupName)}
                onMouseLeave={() => setHover(false, "")}
                key={group.GroupName}
              >
                {group.GroupName}
              </p>
              <NotificationCount
                position="right-0"
                count={group.NotificationQuantity}
              />
            </div>
          ))
        ) : (
          <p className="text-black">No suggestions available</p>
        )}
      </div>
    </div>
  );
};

export default GroupName;
