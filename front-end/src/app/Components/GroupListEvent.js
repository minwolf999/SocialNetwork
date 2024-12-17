"use client";

import React, { useState, useEffect } from "react";
import GroupEventComponent from "./GroupEvent";
import CreateEventComponent from "./CreateEvent";

const GroupListEventComponent = ({ isMember, groupEvent, cookieValue, resultUserInfo, ws }) => {
  const [showModal, setShowModal] = useState(false);

  // const toggleEvent = () => setShowEventDetail((prev) => !prev);
  const toggleModal = () => setShowModal((prev) => !prev);

  return (
    <div className="flex flex-col mt-4">
      <div className="flex flex-row w-full justify-evenly">
        {isMember && (
          <button
          onClick={toggleModal}
          className="w-20 h-8 bg-[#33a9ff] rounded-lg justify-center items-center text-[#e7e9e9] text-sm font-normal font-roboto"
          >
            New
            </button>          
          )}
        {showModal && (
          <CreateEventComponent
            closeModal={toggleModal}
            cookieValue={cookieValue}
            ws={ws}
          />
        )}
      </div>
      <div className="w-full h-[50vh] flex-col gap-4 flex mt-6">
          <GroupEventComponent
            groupEvent={groupEvent}
            cookieValue={cookieValue}
            resultUserInfo={resultUserInfo}
            ws={ws}
          />          
      </div>
    </div>
  );
};

export default GroupListEventComponent;
