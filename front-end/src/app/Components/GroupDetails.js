"use client";

import React, { useState, useEffect, useRef } from "react";
import { useParams } from "next/navigation"; // Correct hook for dynamic routes in the app directory
import GroupListMembersComponent from "./GroupListMembers";
import GroupInfoComponent from "./GroupInfo";
import GroupListEventComponent from "./GroupListEvent";
import GroupRequestsListComponent from "./GroupRequestList";
import { handleFileChange } from "../Utils/handleFileChange.js";

const GroupDetailsComponent = ({
  group,
  isMember,
  cookieValue,
  sendRequest,
  setSendRequest,
  joinRequest,
  setJoinRequest,
  groupMembers,
  userFollowers,
  groupEvent,
  resultUserInfo,
  switchPostsToChat,
  showPostsOrChat,
  ws,
  invitationUserInGroup,
  invitationGet,
}) => {
  const [activeComponent, setActiveComponent] = useState(1);
  const [imageSrc, setImageSrc] = useState("/svg/ImageProfileGroup.svg"); // Default image
  const [imageFile, setImageFile] = useState(null);
  const [imageContent, setImageContent] = useState("");
  const imageRef = useRef(null); // Reference for the img element
  const bannerRef = useRef(null);
  const [hoveredButton, setHoveredButton] = useState(null);
  const { groupId } = useParams(); // Use useParams to get dynamic route parameter

  const renderComponent = () => {
    switch (activeComponent) {
      case 1:
        return (
          <GroupInfoComponent
            group={group}
            isMember={isMember}
            cookieValue={cookieValue}
            sendRequest={sendRequest}
            setSendRequest={setSendRequest}
            switchPostsToChat={switchPostsToChat}
            showPostsOrChat={showPostsOrChat}
            ws={ws}
          />
        );
      case 2:
        return (
          <GroupListMembersComponent
            groupMembers={groupMembers}
            isMember={isMember}
            userFollowers={userFollowers}
            group={group}
            cookieValue={cookieValue}
            invitationUserInGroup={invitationUserInGroup}
            invitationGet={invitationGet}
          />
        );
      case 3:
        return (
          <GroupListEventComponent
            isMember={isMember}
            groupEvent={groupEvent}
            cookieValue={cookieValue}
            resultUserInfo={resultUserInfo}
            ws={ws}
          />
        );
      case 4:
        return (
          <GroupRequestsListComponent
            cookieValue={cookieValue}
            joinRequest={joinRequest}
            setJoinRequest={setJoinRequest}
            ws={ws}
          />
        );
      default:
        return (
          <GroupInfoComponent
            group={group}
            isMember={isMember}
            cookieValue={cookieValue}
            sendRequest={sendRequest}
            setSendRequest={setSendRequest}
            switchPostsToChat={switchPostsToChat}
            showPostsOrChat={showPostsOrChat}
            ws={ws}
          />
        ); // Default to ComponentA
    }
  };
  return (
    <div className="w-full h-screen relative shadow-lg">
      <img
        id="image"
        ref={bannerRef}
        className="w-full h-[196px] left-0 top-0 $"
        src={group.GroupPicture}
        alt="banner"
      />
      <div
        id="imageDiv"
        className="w-[9vw] h-[12vh] left-[24px] top-[32px] absolute"
      >
        <label id="labelIcon" htmlFor="groupDetailsFile">
          <img
            id="image"
            src={group.Banner}
            ref={imageRef}
            alt="Group avatar picture"
            className="w-[9vw] h-[12vh] left-0 top-0 absolute bg-[#5f6c6d] rounded-xl shadow-2xl cursor-pointer object-cover"
          />
        </label>

        <input
          type="file"
          accept="image/*"
          id="groupDetailsFile"
          className="p-1.5 text-sm hidden"
          onChange={(event) =>
            handleFileChange(
              event,
              setImageFile,
              setImageSrc,
              setImageContent,
              imageRef.current
            )
          }
        />
      </div>
      <label
        id="labelIcon"
        htmlFor="bannerGroup"
        className="p-2 right-6 top-0 absolute justify-center items-center gap-2 inline-flex cursor-pointer text-[#919a9b] text-base font-bold font-inter"
      >
        {" "}
        Edit
        {/* <button className="p-2 right-6 top-0 absolute justify-center items-center gap-2 inline-flex cursor-pointer text-[#dfe0e0] text-base font-bold font-inter"> */}
        {/* </button> */}
      </label>
      <input
        type="file"
        accept="image/*"
        id="bannerGroup"
        className="p-1.5 text-sm hidden"
        onChange={(event) =>
          handleFileChange(
            event,
            setImageFile,
            setImageSrc,
            setImageContent,
            bannerRef.current
          )
        }
      />

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
          onMouseEnter={() => setHoveredButton("Members")}
          onMouseLeave={() => setHoveredButton(null)}
          onClick={() => setActiveComponent(2)}
          className={`w-[79px] text-base font-bold font-inter cursor-pointer ml-3 ${
            activeComponent === 2 || hoveredButton === "Members"
              ? "text-black"
              : "text-[#919a9b]"
          }`}
        >
          Members
        </button>
        <button
          onMouseEnter={() => setHoveredButton("Events")}
          onMouseLeave={() => setHoveredButton(null)}
          onClick={() => setActiveComponent(3)}
          className={`w-[79px] text-base font-bold font-inter cursor-pointer ml-2 ${
            activeComponent === 3 || hoveredButton === "Events"
              ? "text-black"
              : "text-[#919a9b]"
          }`}
        >
          Events
        </button>
        {group.LeaderId === resultUserInfo.Id && (
          <button
            onMouseEnter={() => setHoveredButton("Requests")}
            onMouseLeave={() => setHoveredButton(null)}
            onClick={() => setActiveComponent(4)}
            className={`w-[79px] text-base font-bold font-inter cursor-pointer ml-2 ${
              activeComponent === 4 || hoveredButton === "Requests"
                ? "text-black"
                : "text-[#919a9b]"
            }`}
          >
            Requests
          </button>
        )}
      </div>
      <div className="w-[90%] border border-[#b0b1b2] mt-3 ml-4"></div>
      {renderComponent()}
    </div>
  );
};

export default GroupDetailsComponent;
