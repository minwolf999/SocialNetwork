"use client";

import React, { useEffect, useState } from "react";
import LeftUserFollowerComponent from "./LeftUserFollower";
import { FetchFollowAndFollowed } from "../Utils/fetchAllData";

// Const that retrieve the followers of the user
const UserListFollowersComponent = ({
  followAndFollowed,
  cookieValue,
  ws,
  setResultFollowAndFollowed,
}) => {
  const [dataUser, setDataUser] = useState([]);

  useEffect(() => {
    const handleWebSocketMessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        if (
          data.Type === "Follow" &&
          (data.Description === "You have been followed" ||
            data.Description === "You have unfollow")
        ) {
          // fetchData();
          FetchFollowAndFollowed(cookieValue, setResultFollowAndFollowed);
        } else if (
          data.Type === "AcceptFollow" &&
          data.Description === "Your follow request have been accepted"
        ) {
          setResultFollowAndFollowed(cookieValue, setResultFollowAndFollowed);
          // fetchData();
        } else if (data.Type === "Private Chat") {
          FetchFollowAndFollowed(cookieValue, setResultFollowAndFollowed);
          // fetchData();
        }
      } catch (error) {
        console.error("Error parsing WebSocket message:", error);
      }
    };

    ws.addEventListener("message", handleWebSocketMessage);
    return () => {
      ws.removeEventListener("message", handleWebSocketMessage);
    };
  }, [cookieValue, ws, setResultFollowAndFollowed]);

  useEffect(() => {
    if (followAndFollowed?.Follow?.length > 0) {
      // Extract the user data and set it in state
      setDataUser(followAndFollowed.Follow.map((value) => value));
    }
  }, [followAndFollowed]);

  return (
    <div className="self-stretch items-start gap-2 inline-flex flex-col overflow-auto hide-scrollbar justify-center">
      {followAndFollowed &&
        followAndFollowed.Follow &&
        followAndFollowed.Follow.map((follower) => (
          <LeftUserFollowerComponent
            key={follower.UserId}
            name={follower.User_Name}
            userId={follower.UserId}
            cookieValue={cookieValue}
            dataUser={follower}
          />
        ))}
    </div>
  );
};

export default UserListFollowersComponent;
