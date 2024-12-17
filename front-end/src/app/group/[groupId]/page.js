"use client";

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation"; // Correct hook for dynamic routes in the app directory
import Comment from "../../Components/Comment";
import RightPanelFunctions from "../../Components/RightPanelFunctions";
import Sidebar from "../../Components/Sidebar";
import { HeaderPost } from "../../Components/HeaderPost.js";
import { PostContent } from "../../Components/PostContent.js";
import { GetCookieValue } from "../../Utils/getCookieValue";
import { FetchCookieValue } from "../../Utils/fetchCookieValue";
import {
  FetchUserInfo,
  FetchAllUsers,
  FetchAllGroups,
  FetchInvitationsGroup,
  FetchGroupsJoined,
  FetchUserFollowers,
  FetchFollowedRequest,
  FetchFollowAndFollowed,
  FetchAllNotifications,
} from "../../Utils/fetchAllData";
import GroupDetailsComponent from "../../Components/GroupDetails.js";
import GroupHeaderComponent from "../../Components/GroupHeader";
import Notifications from "../../Components/Notifications.js";
import Suggestions from "../../Components/Suggestions.js";
import {
  FetchGroupProfile,
  FetchGroupPosts,
} from "../../Utils/fetchGroupProfile";
import { FetchJoinRequest } from "../../Utils/fetchJoinRequest";
import {
  FetchSendJoinRequest,
  FetchGroupEvent,
} from "../../Utils/fetchGroupRequest";
import { getWebSocket, setupWebSocket } from "../../websockets";
import ChatGroupComponent from "../../Components/ChatGroupMessages";
import { FetchDeleteGroupNotifications } from "../../Utils/fetchDeleteGroupNotifications";
import { FetchInvitationUserInGroup } from "../../Utils/fetchGroupRequest";
import { useRouter } from "next/navigation";

const GroupPage = () => {
  const [cookieValue, setCookieValue] = useState(GetCookieValue);
  const [group, setGroup] = useState([]);
  const [showNotification, setShowNotification] = useState(false);
  const [selectedPostComments, setSelectedPostComments] = useState([]);
  const [selectedPostId, setSelectedPostId] = useState("");
  const [resultUserInfo, setResultUserInfo] = useState([]);
  const [resultAllGroups, setResultAllGroups] = useState([]);
  const [sortedResultPosts, setSortedResultPosts] = useState([]);
  const [resultAllUsers, setResultAllUsers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [activePostId, setActivePostId] = useState(null);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [groupInvitation, setGroupInvitation] = useState({});
  const [resultGroupsJoined, setResultGroupsJoined] = useState([]);
  // const [userFollowers, setUserFollowers] = useState([]);
  const [resultGetFollowedRequest, setResultGetFollowedRequest] = useState([]);
  const [usersSuggestions, setUsersSuggestions] = useState([]); // State for user suggestions
  const [groupsSuggestions, setGroupsSuggestions] = useState([]); // State for group suggestions
  const [showComments, setShowComments] = useState(false);
  const [isMember, setIsMember] = useState(false);
  const [firstEffect, setFirstEffect] = useState(false);
  const [sendRequest, setSendRequest] = useState(false);
  const [joinRequest, setJoinRequest] = useState([]);
  const [groupMembers, setGroupMembers] = useState([]);
  const [groupEvent, setGroupEvent] = useState([]);
  const [showPostsOrChat, setShowPostsOrChat] = useState(true);
  const [ResultFollowAndFollowed, setResultFollowAndFollowed] = useState([]);
  const [resultAllNotifications, setResultAllNotifications] = useState([]);
  const [invitationUserInGroup, setInvitationUserInGroup] = useState("");
  const [invitationGet, setInvitationGet] = useState(false);
  const [searchTerm, setSearchTerm] = useState(""); // State for search input
  const { groupId } = useParams(); // Use useParams to get dynamic route parameter
  const router = useRouter();

  const COMPONENTS = {
    PROFILE: "PROFILE",
    COMMENTS: "COMMENTS",
    NOTIFICATIONS: "NOTIFICATIONS",
    SUGGESTIONS: "SUGGESTIONS",
  };

  let ws = setupWebSocket(cookieValue);
  ws = getWebSocket(cookieValue);

  useEffect(() => {
    const handleWebSocketMessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        if (
          data.Type === "Join Event" ||
          data.Type === "Decline Event" ||
          data.Type === "Event"
        ) {
          FetchGroupEvent(groupId, cookieValue, setGroupEvent);
        }
        if (data.Type === "InvitePeopleInGroup") {
          setInvitationUserInGroup((prev) => `${prev} | ${data.UserId}`);
        }
        if (data.Type === "Event") {
          setGroupEvent((prev) => [...prev, data.Value]);
        }
      } catch (error) {
        console.error("Error to fetch join request");
      }
    };

    ws.addEventListener("message", handleWebSocketMessage);
    return () => {
      ws.removeEventListener("message", handleWebSocketMessage);
    };
  }, [cookieValue, groupId, ws]);

  const [activeComponent, setActiveComponent] = useState(COMPONENTS.PROFILE);

  useEffect(() => {
    if (groupId) {
      FetchDeleteGroupNotifications(groupId, cookieValue);
    }
  });

  // UseEffect to handle data fetching on mount
  useEffect(() => {
    setCookieValue(GetCookieValue()); // Update cookie value after the component is mounted
  }, []);

  useEffect(() => {
    FetchGroupProfile(groupId, cookieValue, setGroup, setFirstEffect, router);
    FetchGroupPosts(groupId, cookieValue, setSortedResultPosts, router);
    FetchGroupsJoined(cookieValue, setResultGroupsJoined);
    FetchFollowAndFollowed(cookieValue, setResultFollowAndFollowed);
    FetchAllNotifications(cookieValue, setResultAllNotifications);
    FetchSendJoinRequest(groupId, cookieValue, setSendRequest);
    FetchGroupEvent(groupId, cookieValue, setGroupEvent);
    FetchUserInfo(cookieValue, setResultUserInfo);
    FetchAllUsers(cookieValue, setResultAllUsers);
    FetchAllGroups(cookieValue, setResultAllGroups);
    FetchInvitationsGroup(cookieValue, setGroupInvitation);
    // FetchUserFollowers(cookieValue, "", setUserFollowers);
    FetchFollowedRequest(cookieValue, setResultGetFollowedRequest);
    FetchInvitationUserInGroup(cookieValue, groupId, setInvitationUserInGroup, setInvitationGet);
  }, [cookieValue, groupId, router]);

  useEffect(() => {
    if (firstEffect) {
      const groupMembersData = resultAllUsers.filter(
        (user) => user.Id && group.MemberIds.includes(user.Id)
      );
      if (groupMembers.length === 0 && groupMembersData.length > 0) {
        setGroupMembers(groupMembersData);
      }
      if (group.MemberIds.includes(resultUserInfo.Id)) {
        setIsMember(true);
      }
      if (group.LeaderId == resultUserInfo.Id) {
        FetchJoinRequest(groupId, cookieValue, setJoinRequest);
      }
    }
  }, [
    firstEffect,
    resultAllUsers,
    groupMembers,
    group,
    resultUserInfo,
    groupId,
    cookieValue,
  ]);

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
        setSearchTerm("");
        setSelectedPostComments(commentsForPost);
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

  const handleShowProfile = () => {
    setActiveComponent(COMPONENTS.PROFILE);
    setSearchTerm("");
  };
  const handleShowNotifications = () => {
    setActiveComponent(COMPONENTS.NOTIFICATIONS);
  };
  const handleSwitchPostsToChat = () => {
    setShowPostsOrChat((prev) => !prev);
  };
  // Toggle modal visibility
  const toggleModal = () => {
    if (isMember) {
      setShowModal((prev) => !prev);
    }
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
          <GroupDetailsComponent
            group={group}
            isMember={isMember}
            cookieValue={cookieValue}
            sendRequest={sendRequest}
            setSendRequest={setSendRequest}
            joinRequest={joinRequest}
            setJoinRequest={setJoinRequest}
            groupMembers={groupMembers}
            userFollowers={ResultFollowAndFollowed}
            groupEvent={groupEvent}
            resultUserInfo={resultUserInfo}
            switchPostsToChat={handleSwitchPostsToChat}
            showPostsOrChat={showPostsOrChat}
            ws={ws}
            invitationUserInGroup={invitationUserInGroup}
            invitationGet={invitationGet}
          />
        );
    }
  };

  const handleNewNotifications = (newNotifs) => {
    setResultAllNotifications(newNotifs);
  };

  useEffect(() => {
    const handleWebSocketMessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        if (data.Type === "LeaveGroup") {
          if (data.GroupId === groupId) {
            setIsMember(false);
            setGroup(data.Group);
          }

          setResultGroupsJoined(
            resultGroupsJoined.filter((group) => group.Id !== data.GroupId)
          );
        } else if (data.Type === "JoinGroup" && data.GroupId === groupId) {
          setJoinRequest((prev) => [...prev, data.JoinRequest]);
        } else if (data.Type === "AcceptJoinRequest") {
          if (data.GroupId === groupId) {
            setIsMember(true);
          }

          FetchGroupsJoined(cookieValue, setResultGroupsJoined);
        } else if (
          data.Type === "DeclineJoinRequest" &&
          data.GroupId === groupId
        ) {
          setSendRequest(false);
        }
      } catch (error) {
        console.error("Error parsing WebSocket message:", error);
      }
    };

    ws.addEventListener("message", handleWebSocketMessage);
    return () => {
      ws.removeEventListener("message", handleWebSocketMessage);
    };
  }, [cookieValue, groupId, resultGroupsJoined, ws]);

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
            {group && (
              <GroupHeaderComponent
                toggleModal={toggleModal}
                resultUserInfo={resultUserInfo}
                showModal={showModal}
                group={group}
                isMember={isMember}
                groupId={groupId}
                cookieValue={cookieValue}
              />
            )}
            {showPostsOrChat ? (
              <div className="bg-white h-[92vh] overflow-auto flex flex-col items-center hide-scrollbar">
                {sortedResultPosts?.length > 0 ? (
                  sortedResultPosts.map((post) => (
                    <button
                      key={post.Id}
                      onClick={() => handleShowComments(post.Id)}
                      className={`flex flex-col bg-white h-auto p-2 mt-4 mb-4 hover:scale-103 w-[95%]
                    ${
                      activePostId == post.Id
                        ? "bg-ligthBlue/30 sha  x&dow"
                        : null
                    }
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
                    </button>
                  ))
                ) : (
                  <p>Pas de posts pour le moment...</p>
                )}
              </div>
            ) : (
              <ChatGroupComponent
                resultUserInfoID={resultUserInfo.Id}
                groupId={groupId}
                cookieValue={cookieValue}
                ws={ws}
              />
            )}
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

export default GroupPage;
