"use client";

import React, { useState, useRef, useEffect } from "react";
import { useParams } from "next/navigation"; // Correct hook for dynamic routes in the app directory
import UserListFollowersComponent from "./UserFollowersList";
import UserInfoComponent from "./UserInfo";
import UserListSubsComponent from "./UserSubsList";
import UserGroupListComponent from "./UserGroupList";
import PrivateProfileComponent from "./PrivateProfile";
import { useRouter } from "next/navigation";

const UserProfileComponent = ({
  userData,
  resultGroupsJoined,
  resultUserInfo,
  cookieValue,
  userFollowers,
  userFollowed,
  ws,
  ResultFollowAndFollowed,
  resultGetFollowRequest,
}) => {
  const [isSent, setIsSent] = useState(false);
  const [activeComponent, setActiveComponent] = useState(1);
  const imageRef = useRef(null); // Reference for the img element
  const bannerRef = useRef(null);
  const [hoveredButton, setHoveredButton] = useState(null);
  const [isPublic, setIsPublic] = useState(false);
  const [isFollowed, setIsFollowed] = useState(false);
  const [ProfileUserData, setProfileUserData] = useState([]);

  const [canAccess, setCanAccess] = useState(false);
  const { userId } = useParams(); // Use useParams to get dynamic route parameter
  const root = useRouter();

  useEffect(() => {
    setProfileUserData(userData);
  }, [userData]);

  useEffect(() => {
    if (userData.Status === "public" || resultUserInfo.Id === userId) {
      setIsPublic(true);
    } else if (userFollowed.Follow && userFollowed.Follow.length > 0) {
      userFollowed.Follow.map((result) => {
        if (result.FollowerId === resultUserInfo.Id) {
          setIsPublic(true);
          setIsFollowed(true);
        }
      });
    }
  }, [userData, userFollowed, ProfileUserData, resultUserInfo, userId]);

  useEffect(() => {
    const handleWebSocketMessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        if (
          data.Type === "AcceptFollow" &&
          data.Description === "Your follow request have been accepted"
        ) {
          if (data.UserId === ProfileUserData.Id) {
            setIsPublic(true);
            setIsSent(true);
          }
        } else if (
          data.Type === "Follow" &&
          data.Description === "You have unfollow"
        ) {
          if (location.pathname.startsWith("/profile/")) {
            root.push("/home");
          }
          if (
            data.Value.FollowedId === ProfileUserData.Id &&
            data.Value.FollowerId === resultUserInfo.Id
          ) {
            setIsPublic(false);
          }
        }
      } catch (error) {
        console.error("Error parsing WebSocket message:", error);
      }
    };
    ws.addEventListener("message", handleWebSocketMessage);
    return () => {
      ws.removeEventListener("message", handleWebSocketMessage);
    };
  }, [cookieValue, ProfileUserData, root, ws, resultUserInfo]);

  const renderComponent = () => {
    switch (activeComponent) {
      case 1:
        return isPublic ? (
          <UserInfoComponent
            userData={userData}
            cookieValue={cookieValue}
            ResultFollowAndFollowed={ResultFollowAndFollowed}
            resultGetFollowRequest={resultGetFollowRequest}
            resultUserInfo={resultUserInfo}
            userFollowers={userFollowed}
            setIsSent={setIsSent}
            isSent={isSent}
          />
        ) : (
          <PrivateProfileComponent
            userData={userData}
            cookieValue={cookieValue}
            setIsPublic={setIsPublic}
            resultGetFollowRequest={resultGetFollowRequest}
            resultUserInfo={resultUserInfo}
            ws={ws}
          />
        );
      case 2:
        return (
          <UserListFollowersComponent
            userFollowers={userFollowers}
            userFollowed={userFollowed}
            resultUserInfo={resultUserInfo}
            cookieValue={cookieValue}
          />
        );
      case 3:
        return (
          <UserListSubsComponent
            userData={userData}
            cookieValue={cookieValue}
            userFollowers={userFollowers}
          />
        );
      case 4:
        return (
          <UserGroupListComponent resultGroupsJoined={resultGroupsJoined} />
        );
      default:
        return (
          <PrivateProfileComponent
            userData={userData}
            cookieValue={cookieValue}
            setIsPublic={setIsPublic}
            resultGetFollowRequest={resultGetFollowRequest}
            ws={ws}
          />
        ); // Default to ComponentA
    }
  };

  return (
    <div className="w-full h-screen relative shadow-lg">
      {ProfileUserData && (
        <div>
          <img
            id="image"
            ref={bannerRef}
            className="w-full h-[196px] left-0 top-0"
            src={ProfileUserData.Banner}
            alt="banner"
          />
          <div
            id="imageDiv"
            className="w-[9vw] h-[12vh] left-[24px] top-[32px] absolute"
          >
            <label id="labelIcon" htmlFor="groupDetailsFile">
              <img
                id="image"
                src={ProfileUserData.ProfilePicture}
                ref={imageRef}
                alt="Group avatar picture"
                className="w-[9vw] h-[12vh] left-0 top-0 absolute bg-[#5f6c6d] rounded-xl shadow-2xl cursor-pointer object-cover"
              />
            </label>
          </div>
        </div>
      )}
      <div className="flex ml-4 mt-4">
        <button
          onMouseEnter={() => setHoveredButton("Infos")}
          onMouseLeave={() => setHoveredButton(null)}
          onClick={() => setActiveComponent(1)}
          className={`w-[47px] text-base font-bold font-inter cursor-pointer ${
            activeComponent === 1 || hoveredButton === "Infos"
              ? "text-black"
              : "text-[#919a9b]"
          }`}
        >
          Infos
        </button>
        <button
          onMouseEnter={() => setHoveredButton("Followers")}
          onMouseLeave={() => setHoveredButton(null)}
          onClick={() => setActiveComponent(2)}
          className={`w-[79px] text-base font-bold font-inter cursor-pointer ml-3 ${
            activeComponent === 2 || hoveredButton === "Followers"
              ? "text-black"
              : "text-[#919a9b]"
          }`}
        >
          Followers
        </button>
        <button
          onMouseEnter={() => setHoveredButton("Suivies")}
          onMouseLeave={() => setHoveredButton(null)}
          onClick={() => setActiveComponent(3)}
          className={`w-[79px] text-base font-bold font-inter cursor-pointer ml-2 ${
            activeComponent === 3 || hoveredButton === "Suivies"
              ? "text-black"
              : "text-[#919a9b]"
          }`}
        >
          Suivies
        </button>
        <button
          onMouseEnter={() => setHoveredButton("Groupes")}
          onMouseLeave={() => setHoveredButton(null)}
          onClick={() => setActiveComponent(4)}
          className={`w-[79px] text-base font-bold font-inter cursor-pointer ml-2 ${
            activeComponent === 4 || hoveredButton === "Groupes"
              ? "text-black"
              : "text-[#919a9b]"
          }`}
        >
          Groupes
        </button>
      </div>
      <div className="w-[90%] border border-[#b0b1b2] mt-3 ml-4"></div>
      {renderComponent()}
    </div>
  );
};

export default UserProfileComponent;
