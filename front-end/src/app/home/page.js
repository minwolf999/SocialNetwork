"use client";

import React, { useState, useEffect } from "react";
import Comment from "../Components/Comment";
import RightPanelFunctions from "../Components/RightPanelFunctions";
import Sidebar from "../Components/Sidebar";
import Notifications from "../Components/Notifications.js";
import Suggestions from "../Components/Suggestions.js";
import PostComponent from "../Components/Post.js";
import { HeaderPost } from "../Components/HeaderPost.js";
import { PostContent } from "../Components/PostContent.js";
import { GetCookieValue } from "../Utils/getCookieValue";
import { FetchCookieValue } from "../Utils/fetchCookieValue";
import {
  FetchUserInfo,
  FetchAllUsers,
  FetchAllGroups,
  FetchPosts,
  FetchInvitationsGroup,
  FetchGroupsJoined,
  FetchUserFollowers,
  FetchFollowedRequest,
  FetchFollowAndFollowed,
  FetchAllNotifications,
} from "../Utils/fetchAllData";
import { setupWebSocket } from "../websockets";
import { getWebSocket } from "../websockets";

const Home = () => {
  const [cookieValue, setCookieValue] = useState(GetCookieValue);
  const [showNotification, setShowNotification] = useState(true);
  const [showComments, setShowComments] = useState(false);
  const [usersSuggestions, setUsersSuggestions] = useState([]); // State for user suggestions
  const [groupsSuggestions, setGroupsSuggestions] = useState([]); // State for group suggestions
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedPostComments, setSelectedPostComments] = useState([]);
  const [selectedPostId, setSelectedPostId] = useState("");
  const [resultUserInfo, setResultUserInfo] = useState([]);
  const [resultAllUsers, setResultAllUsers] = useState([]);
  const [resultAllGroups, setResultAllGroups] = useState([]);
  const [sortedResultPosts, setSortedResultPosts] = useState([]);
  const [groupInvitation, setGroupInvitation] = useState([]);
  const [resultGroupsJoined, setResultGroupsJoined] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [userFollowers, setUserFollowers] = useState([]);
  const [activePostId, setActivePostId] = useState(null);
  const [resultGetFollowedRequest, setResultGetFollowedRequest] = useState([]);
  const [ResultFollowAndFollowed, setResultFollowAndFollowed] = useState([]);
  const [resultAllNotifications, setResultAllNotifications] = useState([]);
  const [searchTerm, setSearchTerm] = useState(""); // State for search input

  let ws = setupWebSocket(cookieValue);
  ws = getWebSocket(cookieValue);
  useEffect(() => {
    const handleWebSocketMessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        if (data.Type === "AcceptJoinRequest") {
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
  }, [cookieValue, ws]);

  // UseEffect to handle data fetching on mount
  useEffect(() => {
    setCookieValue(GetCookieValue()); // Update cookie value after the component is mounted
  }, []);

  useEffect(() => {
    FetchPosts(cookieValue, setSortedResultPosts);
    FetchGroupsJoined(cookieValue, setResultGroupsJoined);
    FetchFollowAndFollowed(cookieValue, setResultFollowAndFollowed);
    FetchAllNotifications(cookieValue, setResultAllNotifications);
    FetchUserInfo(cookieValue, setResultUserInfo);
    FetchAllUsers(cookieValue, setResultAllUsers);
    FetchAllGroups(cookieValue, setResultAllGroups);
    FetchInvitationsGroup(cookieValue, setGroupInvitation);
    FetchUserFollowers(cookieValue, "", setUserFollowers);
    FetchFollowedRequest(cookieValue, setResultGetFollowedRequest);
  }, [cookieValue]);

  const COMPONENTS = {
    PROFILE: "PROFILE",
    NOTIFICATIONS: "NOTIFICATIONS",
    SUGGESTIONS: "SUGGESTIONS",
  };

  const [activeComponent, setActiveComponent] = useState(COMPONENTS.PROFILE);

  const handleNewRequest = (NewRequest) => {
    setResultGetFollowedRequest(NewRequest);
  };

  const renderActiveComponent = () => {
    switch (activeComponent) {
      case COMPONENTS.COMMENTS:
        return (
          <Comment
            comment={selectedPostComments}
            selectedPostId={selectedPostId}
            cookieValue={cookieValue}
            ws={ws}
          />
        );
      case COMPONENTS.NOTIFICATIONS:
        return (
          <Notifications
            setResultAllNotifications={setResultAllNotifications}
            groupInvitation={groupInvitation}
            setGroupInvitation={setGroupInvitation}
            resultGetFollowedRequest={resultGetFollowedRequest}
            setResultGetFollowedRequest={setResultGetFollowedRequest}
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
          <Notifications
            setResultAllNotifications={setResultAllNotifications}
            groupInvitation={groupInvitation}
            setGroupInvitation={setGroupInvitation}
            resultGetFollowedRequest={resultGetFollowedRequest}
            setResultGetFollowedRequest={setResultGetFollowedRequest}
            notifications={resultAllNotifications}
            resultUserInfo={resultUserInfo}
            setNotifications={handleNewNotifications}
            cookieValue={cookieValue}
            ws={ws}
          />
        );
    }
  };

  // Function to display comments for a post
  const displaySectionComment = async (postId) => {
    setActivePostId(postId);
    const fetchedComments = await FetchCookieValue(
      "http://localhost:8080/getComment",
      { AuthorId: cookieValue }
    );
    if (!fetchedComments?.Success) {
      // root.push("/");
      return;
    }

    const commentsForPost = fetchedComments.Posts.filter(
      (comment) => comment.PostId === postId
    );
    setActiveComponent(COMPONENTS.COMMENTS);
    setSearchTerm("");
    setSelectedPostComments(commentsForPost);
    setSelectedPostId(postId);
    setShowNotification(false);
    setShowSuggestions(false);
    setShowComments(true);
  };

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

  // Toggle modal visibility
  const toggleModal = () => setShowModal((prev) => !prev);

  const handleNewNotifications = (newNotifs) => {
    setResultAllNotifications(newNotifs);
  };

  const handleShowNotifications = () => {
    setActiveComponent(COMPONENTS.NOTIFICATIONS);
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
                  Home
                </div>
              </div>
              <div
                className="flex justify-center items-center mr-2 cursor-pointer p-0.5"
                onClick={toggleModal}
              >
                <input
                  type="text"
                  placeholder="Quoi de neuf ?"
                  className="w-32 cursor-pointer focus:outline-none"
                  readOnly
                />
                <img src="/svg/CreatePost.svg" alt="Create post" />
              </div>
              {showModal && (
                <PostComponent
                  resultUserInfo={resultUserInfo}
                  closeModal={toggleModal}
                  groupId={""}
                  cookieValue={cookieValue}
                />
              )}
            </div>
            <div className="bg-white h-[92vh] overflow-auto flex flex-col items-center hide-scrollbar">
              {sortedResultPosts.length > 0 ? (
                sortedResultPosts.map((post) => (
                  <div
                    key={post.Id}
                    onClick={() => displaySectionComment(post.Id)}
                    className={`flex flex-col bg-white h-auto p-2 mt-4 mb-4 hover:scale-103 w-[95%] cursor-pointer
                    ${activePostId == post.Id ? "bg-ligthBlue/10 shadow" : null}
                    `}
                  >
                    <HeaderPost
                      username={post.Username}
                      firstname={post.FirstName}
                      lastname={post.LastName}
                      creationdate={post.CreationDate}
                      userId={post.AuthorId}
                      profilePicture={post.ProfilePicture}
                    />
                    <PostContent text={post.Text} image={post.Image} />
                  </div>
                ))
              ) : (
                <p>Loading...</p>
              )}
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
          {showSuggestions ? (
            // Render Suggestions when showSuggestions is true
            <Suggestions
              usersSuggestions={usersSuggestions}
              groupsSuggestions={groupsSuggestions}
              cookieValue={cookieValue}
              ws={ws}
            />
          ) : (
            renderActiveComponent()
          )}
        </section>
      </section>
    </section>
  );
};

export default Home;
