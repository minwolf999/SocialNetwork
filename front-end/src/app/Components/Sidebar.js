"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation"; // import the useRouter hook
import GroupName from "./GroupName"; // No curly braces here
import AddGroup from "./AddGroups"; // No curly braces here
import ListEventComponent from "./GroupDetailEvent";
import GroupCreationComponent from "./GroupCreation";
import UserFollowerList from "./LeftUserFollowersList";
import { SendMessageIcon } from "./SendMessageIcon";

export const Sidebar = ({
  resultGroupsJoined,
  ResultFollowAndFollowed,
  cookieValue,
  ws,
  setResultFollowAndFollowed,
  setResultGroupsJoined,
}) => {
  const router = useRouter(); // React router navigation
  const [hidden, setHidden] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [showCreateGroupModal, setShowCreateGroupModal] = useState(false);

  const toggleModal = () => setShowModal((prev) => !prev);
  const toggleCreateGroupModal = () => setShowCreateGroupModal((prev) => !prev);

  return (
    <section className="relative flex h-screen">
      <section className="flex flex-col bg-white h-screen w-20 justify-between">
        <div className="flex flex-col justify-center m-1 cursor-pointer">
          <button
            onClick={() => router.push("/home")} //
            className="flex justify-center z-0 "
          >
            {/*Import the svg file to get the Logo*/}
            <div
              onMouseEnter={() => setHidden(false)}
              onMouseLeave={() => setHidden(true)}
              className={`bg-ligthBlue rounded-full ${
                hidden ? "" : "rounded-lg"
              } overflow-hidden`}
            >
              <img src="/svg/Logo.svg" alt="Logo" />
            </div>
          </button>
          <div className="flex flex-inline mt-2 justify-center">
            <UserFollowerList
              followAndFollowed={ResultFollowAndFollowed}
              cookieValue={cookieValue}
              ws={ws}
              setResultFollowAndFollowed={setResultFollowAndFollowed}
            />
          </div>
        </div>
        <div className="flex justify-center m-1">
          <SendMessageIcon />
        </div>
      </section>
      <section className="flex flex-col h-screen items-center w-[90%] bg-white">
        <div className="w-64 h-screen relative shadow border-r border-black/0">
          <div className="w-full h-screen left-[16px] top-[-7px] flex-col justify-start items-start gap-2 inline-flex">
            <div className="p-2 justify-center items-center gap-2 inline-flex">
              <div
                onClick={toggleModal}
                className="text-[#919a9b] text-base font-semibold font-roboto mt-4 cursor-pointer"
              >
                Events
              </div>
              {showModal && (
                <ListEventComponent
                  closeModal={toggleModal}
                  cookieValue={cookieValue}
                />
              )}
            </div>
            <div onClick={toggleCreateGroupModal}>
              <AddGroup showCreateGroupModal={showCreateGroupModal} />
            </div>
            {showCreateGroupModal && (
              <GroupCreationComponent
                closeCreateGroupModal={toggleCreateGroupModal}
                cookieValue={cookieValue}
                setResultGroupsJoined={setResultGroupsJoined}
              />
            )}
            <GroupName
              groupsJoined={resultGroupsJoined}
              cookieValue={cookieValue}
              ws={ws}
              setResultGroupsJoined={setResultGroupsJoined}
            />
          </div>
        </div>
      </section>
    </section>
  );
};

export default Sidebar;
