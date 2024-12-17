"use client";

import React, { useState, useEffect } from "react";
import { FetchCookieValue } from "../Utils/fetchCookieValue";
import {
  FetchFollowedRequest,
  FetchInvitationsGroup,
  FetchAllNotifications,
} from "../Utils/fetchAllData";

const Notifications = ({
  groupInvitation,
  setGroupInvitation,
  resultGetFollowedRequest,
  setResultGetFollowedRequest,
  setResultAllNotifications,
  notifications,
  resultUserInfo,
  setNotifications,
  cookieValue,
  ws,
}) => {
  const [showNotifications, setShowNotifications] = useState(true);
  const changeTabToNotifications = () => setShowNotifications(true);
  const changeTabToInvitations = () => setShowNotifications(false);

  const acceptInvitation = async (Group, Sender) => {
    try {
      const response = await FetchCookieValue(
        "http://localhost:8080/acceptInvitationGroup",
        { SenderId: Sender, GroupId: Group, ReceiverId: cookieValue }
      );

      if (response.Success) {
        setGroupInvitation((prev) =>
          prev.filter((group) => group.GroupId !== Group)
        );
      }
    } catch (error) {
      console.error("Error to accept invitation:", error);
    }
  };

  const declineInvitation = async (Group, Sender) => {
    try {
      const response = await FetchCookieValue(
        "http://localhost:8080/declineInvitationGroup",
        { SenderId: Sender, GroupId: Group, ReceiverId: cookieValue }
      );

      if (response.Success) {
        setGroupInvitation((prev) =>
          prev.filter((group) => group.GroupId !== Group)
        );
      }
    } catch (error) {
      console.error("Error to decline invitation:", error);
    }
  };

  // Holding Accept or Decline the follow request
  const acceptFollowRequest = async (followerId, user) => {
    try {
      const response = await FetchCookieValue(
        "http://localhost:8080/acceptFollowedRequest",
        { FollowedId: cookieValue, FollowerId: followerId }
      );
      if (response.Success) {
        resultGetFollowedRequest = resultGetFollowedRequest.filter(
          (item) => item.FollowerId !== user.FollowerId
        );
        setResultGetFollowedRequest(resultGetFollowedRequest);
      }
    } catch (error) {
      console.error("Error in declineFollowRequest function:", error);
    }
  };

  const declineFollowRequest = async (followerId, user) => {
    try {
      const response = await FetchCookieValue(
        "http://localhost:8080/declineFollowedRequest",
        { FollowedId: cookieValue, FollowerId: followerId }
      );
      if (response.Success) {
        resultGetFollowedRequest = resultGetFollowedRequest.filter(
          (item) => item.FollowerId !== user.FollowerId
        );
        setResultGetFollowedRequest(resultGetFollowedRequest);
      }
    } catch (error) {
      console.error("Error in declineFollowRequest function:", error);
    }
  };

  useEffect(() => {
    const handleWebSocketMessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        // This if is used in the notification part (left column in the notifiaction) to indicate to the user that he has received messages or follow requests

        if (data.Type === "Comment" && data.AuthorId === resultUserInfo.Id) {
          setNotifications((oldNotifications) => [...oldNotifications, data]);
        } else if (
          (data.Type === "Private Chat" && data.Sender !== resultUserInfo.Id) ||
          (data.Type === "Follow" &&
            data.Description === "You have been followed") ||
          (data.Type === "Group Chat" &&
            data.Description === "A group message have been send") ||
          data.Type === "Event"
        ) {
          FetchAllNotifications(cookieValue, setResultAllNotifications);
          // This else if is used in the notification part BUT to handle the follow request in order to accept or decline
        } else if (
          data.Type === "Follow" &&
          data.Description === "You have receive a followed request"
        ) {
          FetchFollowedRequest(cookieValue, setResultGetFollowedRequest);
        } else if (data.Type === "InviteGroup") {
          FetchInvitationsGroup(cookieValue, setGroupInvitation);
        }
      } catch (error) {
        console.error("Error parsing WebSocket message:", error);
      }
    };

    ws.addEventListener("message", handleWebSocketMessage);
    return () => {
      ws.removeEventListener("message", handleWebSocketMessage);
    };
  }, [
    cookieValue,
    resultUserInfo,
    notifications,
    ws,
    groupInvitation,
    setNotifications,
    setResultGetFollowedRequest,
  ]);

  const DeleteAllNotifications = async (cookieValue) => {
    try {
      const response = await FetchCookieValue(
        "http://localhost:8080/deleteAllNotifications",
        cookieValue
      );

      if (!response.Success) {
        throw new Error("Failed to decline the follow request");
      }
    } catch (error) {
      console.error("Error in DeleteAllNotifications function:", error);
      return null;
    }

    setNotifications({});
  };

  return (
    <>
      <div className="h-screen  overflow-hidden relative shadow-lg border-b">
        <div className="flex flex-row justify-around">
          <button
            className={`text-black p-2 w-[150px] ${
              !showNotifications ? "bg-gray-200" : ""
            }`}
            onClick={changeTabToNotifications}
          >
            Notifications
          </button>
          <button
            className={`text-black p-2 w-[150px] ${
              showNotifications ? "bg-gray-200" : ""
            }`}
            onClick={changeTabToInvitations}
          >
            Invitations
          </button>
        </div>
        <div className="flex flex-col justify-between h-[95%]">
          <div className="h-[95%] flex flex-col w-full pb-1">
            {showNotifications ? (
              <>
                <div className="flex flex-col h-[95%] overflow-auto hide-scrollbar">
                  {notifications &&
                    notifications.length > 0 &&
                    notifications.map((notification) => (
                      <div key={notification.Id} className="flex flex-col">
                        <div className="flex flex-col w-full justify-center items-center mt-2">
                          <span className="bg-[#E6F4FF] flex w-[95%] justify-center mt-1 mb-1 p-1 rounded-full text-center text-black text-base font-normal font-roboto">
                            {notification.Description}
                          </span>
                        </div>
                      </div>
                    ))}
                </div>

                <div className="flex justify-center items-center">
                  <button
                    onClick={() => DeleteAllNotifications(cookieValue)}
                    className="m-4 w-40 flex justify-center cursor-pointer bg-customRed rounded-lg items-center text-[#e7e9e9] text-base font-normal font-roboto"
                  >
                    Supprimer les notifications
                  </button>
                </div>
              </>
            ) : (
              <>
                <span className="text-customGrey font-roboto text-lg font-semibold ml-4 pb-2 border-b border-[#b5bbbb]">
                  Groups
                </span>
                {groupInvitation ? (
                  groupInvitation.map((invitation) => (
                    <div
                      key={invitation?.GroupId}
                      className="flex flex-col h-[45%] overflow-auto mt-1 hide-scrollbar"
                    >
                      <div className="flex flex-col suggestion-item p-2 text-black border-black">
                        <span className="flex justify-center text-justify">
                          {invitation?.GroupName}
                        </span>
                        <div className="flex justify-evenly mt-2">
                          <button
                            className="w-28 bg-customBlue rounded-lg justify-center items-center text-[#e7e9e9] text-base font-normal font-roboto"
                            onClick={() =>
                              acceptInvitation(
                                invitation?.GroupId,
                                invitation?.SenderId
                              )
                            }
                          >
                            Accepter
                          </button>
                          <button
                            className="w-28 bg-customRed rounded-lg justify-center items-center text-[#e7e9e9] text-base font-normal font-roboto"
                            onClick={() =>
                              declineInvitation(
                                invitation?.GroupId,
                                invitation?.SenderId
                              )
                            }
                          >
                            Refuser
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-black">Aucune invitation de groupe</p>
                )}
                <span className="text-customGrey font-roboto text-lg font-semibold ml-4 pb-2 border-b border-[#b5bbbb]">
                  Follows
                </span>
                {resultGetFollowedRequest ? (
                  resultGetFollowedRequest.map((user) => (
                    <div
                      key={user.FollowerId}
                      className="h-[15%] flex flex-col overflow-auto mt-1 hide-scrollbar"
                    >
                      <div className="flex h-[6vh] mt-4">
                        <div className="flex justify-center items-center w-[15%]"></div>
                        <div className="flex flex-col w-[85%] justify-center font-roboto">
                          <img
                            alt="Profile picture"
                            src={user.Follower_Picture}
                            className="flex w-12 h-12 rounded-[100px] justify-center items-center"
                          />
                          <div className="flex justify-center font-roboto items-center h-[3vh] text-black">
                            {user.Follower_Name}
                          </div>
                          <div className="flex justify-evenly mt-2">
                            <button
                              onClick={() => {
                                acceptFollowRequest(user.FollowerId, user);
                              }}
                              className="w-28 bg-customBlue rounded-lg justify-center items-center text-[#e7e9e9] text-base font-normal font-roboto"
                            >
                              Accepter
                            </button>
                            <button
                              onClick={() => {
                                declineFollowRequest(user.FollowerId, user);
                              }}
                              className="w-28 bg-customRed rounded-lg justify-center items-center text-[#e7e9e9] text-base font-normal font-roboto"
                            >
                              Refuser
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-black">
                    Aucune demande de follower en attente
                  </p>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Notifications;
