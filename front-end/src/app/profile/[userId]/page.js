"use client";

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation"; // Correct hook for dynamic routes in the app directory
import Comment from "../../Components/Comment.js";
import RightPanelFunctions from "../../Components/RightPanelFunctions.js";
import Sidebar from "../../Components/Sidebar.js";
import Notifications from "../../Components/Notifications.js";
import PostComponent from "../../Components/Post.js";
import { HeaderPost } from "../../Components/HeaderPost.js";
import { PostContent } from "../../Components/PostContent.js";
import { GetCookieValue } from "../../Utils/getCookieValue.js";
import { FetchCookieValue } from "../../Utils/fetchCookieValue.js";
import {
  FetchUserInfo,
  FetchAllUsers,
  FetchAllGroups,
  FetchPosts,
  FetchInvitationsGroup,
  FetchGroupsJoined,
  FetchUserFollowers,
  FetchUserFollowed,
  FetchFollowedRequest,
  FetchFollowAndFollowed,
  FetchFollowRequest,
  FetchAllNotifications,
} from "../../Utils/fetchAllData";
import UserProfileComponent from "../../Components/UserProfile.js";
import { FetchUserProfile } from "../../Utils/fetchUserProfile";
import Suggestions from "../../Components/Suggestions.js";
import { setupWebSocket } from "../../websockets";
import { getWebSocket } from "../../websockets";

const Profile = () => {
  const [cookieValue, setCookieValue] = useState(GetCookieValue);
  const [users, setUsers] = useState([]);
  const [showComments, setShowComments] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedPostComments, setSelectedPostComments] = useState([]);
  const [selectedPostId, setSelectedPostId] = useState("");
  const [resultPosts, setResultPosts] = useState([]);
  const [resultUserInfo, setResultUserInfo] = useState([]);
  const [sortedResultPosts, setSortedResultPosts] = useState([]);
  const [resultAllUsers, setResultAllUsers] = useState([]);
  const [resultAllGroups, setResultAllGroups] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [activePostId, setActivePostId] = useState(null);
  const [allUserPosts, setAllUserPosts] = useState([]);
  const [resultGroupsJoined, setResultGroupsJoined] = useState([]);
  const [usersSuggestions, setUsersSuggestions] = useState([]); // State for user suggestions
  const [groupsSuggestions, setGroupsSuggestions] = useState([]); // State for group suggestions
  const [userFollowers, setUserFollowers] = useState([]);
  const [userFollowed, setUserFollowed] = useState([]);
  const { userId } = useParams(); // Use useParams to get dynamic route parameter
  const [ResultFollowAndFollowed, setResultFollowAndFollowed] = useState([]);
  const [isPublic, setIsPublic] = useState(true);
  const [resultAllNotifications, setResultAllNotifications] = useState([]);
  const [groupInvitation, setGroupInvitation] = useState({});
  const [resultGetFollowedRequest, setResultGetFollowedRequest] = useState([]);
  const [resultGetFollowRequest, setResultGetFollowRequest] = useState([]);
  const [searchTerm, setSearchTerm] = useState(""); // State for search input

  let ws = setupWebSocket(cookieValue);
  ws = getWebSocket(cookieValue);

  // Function to handle suggestions updates from RightPanelFunctions
  const handleUsersSuggestionsUpdate = (newSuggestions) => {
    setUsersSuggestions(newSuggestions);
  };
  const handleGroupsSuggestionsUpdate = (newSuggestions) => {
    setGroupsSuggestions(newSuggestions);
  };

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
    FetchUserProfile(userId, cookieValue, setUsers);
    FetchUserInfo(cookieValue, setResultUserInfo);
    FetchPosts(cookieValue, setSortedResultPosts);
    FetchGroupsJoined(cookieValue, setResultGroupsJoined);
    FetchFollowAndFollowed(cookieValue, setResultFollowAndFollowed);
    FetchAllNotifications(cookieValue, setResultAllNotifications);
    FetchAllUsers(cookieValue, setResultAllUsers);
    FetchAllGroups(cookieValue, setResultAllGroups);
    FetchFollowedRequest(cookieValue, setResultGetFollowedRequest);
    FetchInvitationsGroup(cookieValue, setGroupInvitation);
    FetchUserFollowed(cookieValue, userId, setUserFollowed);
    FetchUserFollowers(cookieValue, userId, setUserFollowers);
    FetchFollowRequest(cookieValue, setResultGetFollowRequest);
  }, [cookieValue, userId]);

  useEffect(() => {
    if (sortedResultPosts.length > 0 && resultUserInfo.Id) {
      const userPosts = sortedResultPosts.filter(
        (post) => {
          if (post.AuthorId === userId) {
            if ((post.AuthorId !== resultUserInfo.Id && users.Satatus === "public" && post.Status === "public" && post.IsGroup === "") || (post.AuthorId === resultUserInfo.Id)) {
              
              return true
            }
          }
  
          return false
        }
      );
      setAllUserPosts(userPosts);
    }
  }, [sortedResultPosts, resultUserInfo, userId]); // When new posts are fetched this hook will re-roll and get the last versions of theses 2

  const handleShowCommentsChange = (newShowComments) => {
    setShowComments(newShowComments);
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

  const displayedPosts =
    // resultUserInfo && userId === resultUserInfo.Id
    //   ? allUserPosts // If viewing your profile, show all your posts
    //   : 
      sortedResultPosts.filter((post) => {
        if (post.AuthorId === userId) {
          if (post.AuthorId !== resultUserInfo.Id && post.Status === "public" && post.isPublic === "") {
            return true
          }
        }

        return false
      }); // Show only selected user's posts

  const COMPONENTS = {
    PROFILE: "PROFILE",
    COMMENTS: "COMMENTS",
    NOTIFICATIONS: "NOTIFICATIONS",
    SUGGESTIONS: "SUGGESTIONS",
  };

  const [activeComponent, setActiveComponent] = useState(COMPONENTS.PROFILE);

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
            cookieValue={cookieValue}
            ws={ws}
          />
        );
      case COMPONENTS.PROFILE:
      default:
        return (
          <>
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
          </>
        );
    }
  };

  const handleShowNotifications = () => {
    setActiveComponent(COMPONENTS.NOTIFICATIONS);
  };

  const handleShowComments = async (postId) => {
    setActiveComponent(COMPONENTS.COMMENTS);
    setSelectedPostId(postId);
    try {
      const fetchedComments = await FetchCookieValue(
        "http://localhost:8080/getComment",
        { AuthorId: cookieValue }
      );

      if (fetchedComments?.Success) {
        const commentsForPost = fetchedComments.Posts.filter(
          (comment) => comment.PostId === postId
        );

        setSelectedPostComments(commentsForPost);
        setSearchTerm("");
        setSelectedPostId(postId);
        setShowComments(true); // Ensure this is toggled
        setShowNotification(false);
        setShowSuggestions(false);
      } else {
        console.error("Failed to fetch comments.");
      }
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };

  const handleShowProfile = () => {
    setActiveComponent(COMPONENTS.PROFILE);
    setSearchTerm("");
  };

  const handleNewNotifications = (newNotifs) => {
    setResultAllNotifications(newNotifs);
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
                  Profil de{" "}
                  {resultUserInfo && userId === resultUserInfo.Id // Check if the profile is yours
                    ? resultUserInfo.Username ||
                      resultUserInfo.FirstName +
                        " " +
                        resultUserInfo.LastName ||
                      "Loading" // Display Username if available, else FirstName
                    : userId === users.Id
                    ? users.Username && users.Username.trim() !== ""
                      ? users.Username
                      : users.FirstName + " " + users.LastName
                    : "Loading"}
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
                  cookieValue={cookieValue}
                />
              )}
            </div>
            <div className="bg-white h-[92vh] overflow-auto flex flex-col items-center hide-scrollbar">
              {userId === resultUserInfo.Id || userId === users.Id ? (
                // Your Profile
                allUserPosts.length > 0 ? (
                  allUserPosts.map((post) => (
                    <div
                      key={post.Id}
                      onClick={() => handleShowComments(post.Id)}
                      className={`flex flex-col bg-white h-auto p-2 mt-4 mb-4 hover:scale-103 w-[95%] cursor-pointer ${
                        activePostId == post.Id ? "bg-lightBlue/10 shadow" : ""
                      }`}
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
                  <p>You have no posts.</p>
                )
              ) : users.Id === userId ? (
                // Viewing another user's profile
                users.Status === "public" ? (
                  displayedPosts.length > 0 ? (
                    displayedPosts.map((post) => (
                      <div
                        key={post.Id}
                        onClick={() => handleShowComments(post.Id)}
                        className={`flex flex-col bg-white h-auto p-2 mt-4 mb-4 hover:scale-103 w-[95%] cursor-pointer ${
                          activePostId == post.Id
                            ? "bg-lightBlue/10 shadow"
                            : ""
                        }`}
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
                    <p>This user has no posts.</p>
                  )
                ) : (
                  <p>This user&apos;s profile is private.</p>
                )
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

export default Profile;
