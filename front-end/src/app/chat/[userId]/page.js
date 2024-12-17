"use client";

import React, { useState, useEffect, useRef } from "react";
import { useParams } from "next/navigation"; // Correct hook for dynamic routes in the app directory
import RightPanelFunctions from "../../Components/RightPanelFunctions.js";
import Sidebar from "../../Components/Sidebar.js";
import Notifications from "../../Components/Notifications.js";
import { GetCookieValue } from "../../Utils/getCookieValue.js";
import { FetchCookieValue } from "../../Utils/fetchCookieValue.js";
import {
  FetchUserInfo,
  FetchAllUsers,
  FetchAllGroups,
  FetchInvitationsGroup,
  FetchGroupsJoined,
  FetchUserFollowed,
  FetchUserFollowers,
  FetchFollowedRequest,
  FetchFollowAndFollowed,
  FetchFollowRequest,
  FetchAllNotifications,
} from "../../Utils/fetchAllData";
import UserProfileComponent from "../../Components/UserProfile.js";
import { FetchUserProfile } from "../../Utils/fetchUserProfile";
import Suggestions from "../../Components/Suggestions.js";
import dynamic from "next/dynamic";
import { FetchGetMessage } from "../../Utils/fetchGetMessage.js";
import { FetchDeleteUserNotifications } from "../../Utils/fetchDeleteUserNotifications";
import { setupWebSocket } from "../../websockets";
import { getWebSocket } from "../../websockets";
import { useRouter } from "next/navigation";

const Chat = () => {
  const [cookieValue, setCookieValue] = useState(GetCookieValue);
  const [users, setUsers] = useState([]);
  const [showComments, setShowComments] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedPostComments, setSelectedPostComments] = useState([]);
  const [resultUserInfo, setResultUserInfo] = useState([]);
  const [resultAllUsers, setResultAllUsers] = useState([]);
  const [resultAllGroups, setResultAllGroups] = useState([]);
  const [resultGroupsJoined, setResultGroupsJoined] = useState([]);
  const [usersSuggestions, setUsersSuggestions] = useState([]); // State for user suggestions
  const [groupsSuggestions, setGroupsSuggestions] = useState([]); // State for group suggestions
  const { userId } = useParams(); // Use useParams to get dynamic route parameter
  const [ResultFollowAndFollowed, setResultFollowAndFollowed] = useState([]);
  const [resultAllNotifications, setResultAllNotifications] = useState([]);
  const [groupInvitation, setGroupInvitation] = useState({});
  const [resultGetFollowedRequest, setResultGetFollowedRequest] = useState([]);
  const [resultGetFollowRequest, setResultGetFollowRequest] = useState([]);
  const [userFollowers, setUserFollowers] = useState([]);
  const [userFollowed, setUserFollowed] = useState([]);
  const [searchTerm, setSearchTerm] = useState(""); // State for search input

  const [text, setText] = useState(""); // Test emojis
  const [showEmojiPicker, setShowEmojiPicker] = useState(false); // Show/hide emoji picker
  const EmojiPicker = dynamic(() => import("emoji-picker-react"), {
    ssr: false,
  });
  const [resultMessage, setResultMessage] = useState([]);
  const chatRef = useRef(null); // This will be used to load the bottom of the chat

  const rooter = useRouter();

  // Check if the id in the url is among the follow and followed, if not, it redirects on the home
  useEffect(() => {
    if (ResultFollowAndFollowed?.Follow) {
      ResultFollowAndFollowed.Follow.forEach((result) => {
        if (result.UserId !== userId) {
          rooter.push("/home");
        }
      });
    }
  }, [ResultFollowAndFollowed, userId]);

  let ws = setupWebSocket(cookieValue);
  ws = getWebSocket(cookieValue);

  // Check if the user try to chat with himself
  useEffect(() => {
    if (location.pathname.startsWith("/chat/" + resultUserInfo.Id)) {
      alert("You can't chat with yourself idiot !");
      rooter.push("/home");
    }
  }, [resultUserInfo, rooter]);

  // Function to handle suggestions updates from RightPanelFunctions
  const handleUsersSuggestionsUpdate = (newSuggestions) => {
    setUsersSuggestions(newSuggestions);
  };
  const handleGroupsSuggestionsUpdate = (newSuggestions) => {
    setGroupsSuggestions(newSuggestions);
  };

  const [refreshing, setRefreshing] = useState(true);

  // UseEffect to handle data fetching on mount
  useEffect(() => {
    setCookieValue(GetCookieValue()); // Update cookie value after the component is mounted
  }, []);

  useEffect(() => {
    FetchUserProfile(userId, cookieValue, setUsers);
    FetchUserInfo(cookieValue, setResultUserInfo);
    FetchGetMessage(userId, cookieValue, setResultMessage);
    FetchGroupsJoined(cookieValue, setResultGroupsJoined);
    FetchFollowAndFollowed(cookieValue, setResultFollowAndFollowed);
    FetchAllNotifications(cookieValue, setResultAllNotifications);
    FetchFollowedRequest(cookieValue, setResultGetFollowedRequest);
    FetchInvitationsGroup(cookieValue, setGroupInvitation);
    FetchAllUsers(cookieValue, setResultAllUsers);
    FetchAllGroups(cookieValue, setResultAllGroups);
    FetchUserFollowed(cookieValue, userId, setUserFollowed);
    FetchUserFollowers(cookieValue, userId, setUserFollowers);
    FetchFollowRequest(cookieValue, setResultGetFollowRequest);
    FetchDeleteUserNotifications(userId, cookieValue);
  }, [cookieValue, userId]);

  const COMPONENTS = {
    PROFILE: "PROFILE",
    NOTIFICATIONS: "NOTIFICATIONS",
    SUGGESTIONS: "SUGGESTIONS",
  };

  const [activeComponent, setActiveComponent] = useState(COMPONENTS.PROFILE);

  const renderActiveComponent = () => {
    switch (activeComponent) {
      case COMPONENTS.NOTIFICATIONS:
        return (
          <Notifications
            groupInvitation={groupInvitation}
            setGroupInvitation={setGroupInvitation}
            resultGetFollowedRequest={resultGetFollowedRequest}
            setResultGetFollowedRequest={setResultGetFollowedRequest}
            setResultAllNotifications={setResultAllNotifications}
            notifications={resultAllNotifications}
            resultUserInfo={resultUserInfo}
            setNotifications={handleNewNotifications}
            cookieValue={cookieValue}
            ws={ws}
          />
        );
      case COMPONENTS.SUGGESTIONS:
        return (
          <Suggestions
            usersSuggestions={usersSuggestions}
            groupsSuggestions={groupsSuggestions}
          />
        );
      case COMPONENTS.PROFILE:
      default:
        return (
          <UserProfileComponent
            userData={users}
            resultGroupsJoined={resultGroupsJoined}
            resultUserInfo={resultUserInfo}
            cookieValue={cookieValue}
            userFollowers={userFollowers}
            userFollowed={userFollowed}
            ws={ws}
            ResultFollowAndFollowed={ResultFollowAndFollowed}
            resultGetFollowRequest={resultGetFollowRequest}
          />
        );
    }
  };

  const handleShowNotifications = () => {
    setActiveComponent(COMPONENTS.NOTIFICATIONS);
  };

  const handleShowProfile = () => {
    setActiveComponent(COMPONENTS.PROFILE);
    setSearchTerm("");
  };

  // Handle emoji click to display the picker
  const handleEmojiClick = (emojiObject) => {
    setText((prev) => prev + emojiObject.emoji);
  };

  const SendMessage = async () => {
    const date = new Date();
    let formatedDate = date.toISOString().slice(0, 19).replace("T", " ");

    const message = {
      SenderId: cookieValue,
      Message: text,
      Image: "",
      CreationDate: formatedDate,
      ReceiverId: userId,
    };

    const result = await FetchCookieValue(
      "http://localhost:8080/addMessage",
      message
    );
    if (!result.hasOwnProperty("Success")) {
      console.error("Error creating post");
    }
    setText("");
  };

  const handleNewNotifications = (newNotifs) => {
    setResultAllNotifications(newNotifs);
  };

  useEffect(() => {
    const handleWebSocketMessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        if (data.Type === "Private Chat") {
          if (resultMessage?.length > 0) {
            setResultMessage((prev) => [...prev, data.Value]);
          } else {
            setResultMessage([data.Value]);
          }
          // UpdateChat(data.Value, data.Sender, resultUserInfo);
          BottomChat(chatRef);
          FetchDeleteUserNotifications(userId, cookieValue);
        } else if (data.Type === "AcceptJoinRequest") {
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
  }, [cookieValue, userId, chatRef, resultMessage, ws]);

  // This useEffect displays the bottom of the chat so the user can see the last messages sent directly
  function BottomChat(chatRef) {
    const chat = chatRef.current;
    if (chat) {
      chat.scrollTop = chat.scrollHeight; // Scroll to the bottom
    }
  }
  useEffect(() => {
    BottomChat(chatRef);
  }, [resultMessage]); // Re-run effect when `resultMessage` changes

  // Handle toggle profile event
  const handleToggleProfile = (event) => {
    const {
      showProfile: updatedShowProfile,
      showNotification: updatedShowNotification,
      selectedPostComments: updatedSelectedPostComments,
    } = event.detail;
    setShowProfile(updatedShowProfile);
    setShowNotification(updatedShowNotification);
    setSelectedPostComments(updatedSelectedPostComments);
  };

  return (
    <section className="flex h-screen">
      <Sidebar
        resultGroupsJoined={resultGroupsJoined}
        ResultFollowAndFollowed={ResultFollowAndFollowed}
        cookieValue={cookieValue}
        ws={ws}
        setResultFollowAndFollowed={setResultFollowAndFollowed}
        setResultGroupsJoined={setResultGroupsJoined}
      />
      <section className="flex h-screen w-full">
        <section className="flex flex-col w-[80%]">
          <section className="flex flex-col h-screen">
            <div className="bg-white flex justify-between items-center p-0.5 h-14 shadow-lg border-b relative">
              <div className="flex items-center align-middle">
                <img src="/svg/Home.svg" alt="Home" />
                <div className="flex items-center align-middle font-bold text-3xl text-blue-500 ml-2">
                  Chat avec{" "}
                  {userId === resultUserInfo.Id // Check if the profile is yours
                    ? resultUserInfo.Username ||
                      resultUserInfo.FirstName +
                        " " +
                        resultUserInfo.LastName ||
                      "Loading" // Display Username if available, else FirstName
                    : users
                    ? users.Username && users.Username.trim() !== ""
                      ? users.Username
                      : users.FirstName + " " + users.LastName
                    : "Loading"}
                </div>
              </div>
            </div>
            <div
              ref={chatRef}
              id="chat"
              className="bg-white h-screen overflow-auto flex flex-col hide-scrollbar pb-5"
            >
              {resultMessage && resultMessage.length > 0 ? (
                resultMessage.map((message) =>
                  message.SenderId === resultUserInfo.Id ? (
                    <div
                      key={message.Id}
                      className="flex flex-col items-end justify-end mt-4"
                    >
                      <span className="flex mr-4">{message.CreationDate}</span>
                      <div className="flex items-end justify-end space-x-2">
                        <div className="bg-ligthBlue px-4 py-2 rounded-lg rounded-br-none">
                          <span className="flex text-white justify-end">
                            {message.Message}
                          </span>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div
                      key={message.Id}
                      className="flex flex-col items-start justify-start mt-4"
                    >
                      <span className="flex ml-4">{message.CreationDate}</span>
                      <div className="flex items-start space-x-2">
                        <div className="bg-gray-300 text-gray-800 px-4 py-2 rounded-lg rounded-bl-none">
                          <span className="flex justify-start ">
                            {message.Message}
                          </span>
                        </div>
                      </div>
                    </div>
                  )
                )
              ) : (
                <span>Envoyer un message </span>
              )}
            </div>
            <div className="flex justify-center mb-2 bg-white">
              <div className="flex w-[95%] justify-evenly bg-customBlue rounded-full shadow-lg p-2 h-11">
                <textarea
                  className="flex w-[70%] resize-none text-lg rounded pl-2"
                  placeholder="Envoyer un message..."
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                ></textarea>

                {/* Emoji Picker Icon */}
                <button
                  onClick={() => setShowEmojiPicker((prev) => !prev)}
                  className="ml-2 text-2xl "
                  aria-label="Add Emoji"
                >
                  😄
                </button>

                {/* Emoji Picker */}
                {showEmojiPicker && (
                  <div className="absolute bottom-14 right-[30rem] z-50">
                    <EmojiPicker onEmojiClick={handleEmojiClick} />
                  </div>
                )}

                {/* Send Button */}
                <button
                  onClick={SendMessage}
                  className="w-auto bg-white rounded-lg justify-center items-center text-customBlue text-base font-normal font-roboto p-1"
                >
                  Envoyer
                </button>
              </div>
            </div>
          </section>
        </section>
        <section
          id="commentSection"
          className="bg-white flex flex-col h-screen w-[35%] relative"
        >
          <RightPanelFunctions
            onToggleProfile={handleToggleProfile}
            setUsersSuggestions={setUsersSuggestions}
            setGroupsSuggestions={setGroupsSuggestions}
            handleShowNotifications={handleShowNotifications}
            resultUserInfo={resultUserInfo}
            resultAllUsers={resultAllUsers}
            resultAllGroups={resultAllGroups}
            setActiveComponent={setActiveComponent}
            COMPONENTS={COMPONENTS}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
          />

          {/* {userId === resultUserInfo.Id && ( */}
          {activeComponent !== COMPONENTS.PROFILE && (
            <div className="flex justify-center">
              <button
                onClick={handleShowProfile}
                className="m-4 w-40 flex justify-center cursor-pointer  bg-ligthBlue rounded-lg items-center text-[#e7e9e9] text-base font-normal font-roboto"
              >
                Back to Profile
              </button>
            </div>
          )}

          {showSuggestions ? (
            // Render Suggestions when showSuggestions is true
            <Suggestions
              usersSuggestions={usersSuggestions}
              groupsSuggestions={groupsSuggestions}
            />
          ) : (
            renderActiveComponent()
          )}
        </section>
      </section>
    </section>
  );
};

export default Chat;
