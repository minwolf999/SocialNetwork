"use client";

import React, { useState } from "react";
import GroupEventDetailComponent from "./GroupEventDetails";

const GroupEventComponent = ({ groupEvent, cookieValue, resultUserInfo, ws }) => {
  const [selectedEvent, setSelectedEvent] = useState([]);
  const [showEventDetail, setShowEventDetail] = useState(false);

  const openEventDetail = (event) => {
    setShowEventDetail(true);
    setSelectedEvent(event);
  };

  const closeEventDetail = () => setShowEventDetail(false);

  return (
    <div className="w-[90%] flex-col justify-start items-start gap-[7px] inline-flex mb-3 ml-4 overflow-auto hide-scrollbar h-[60vh]">
      {groupEvent &&
        groupEvent.map((event) => (
          <div key={event.Id} onClick={() => openEventDetail(event)}>
            <div className="self-stretch p-2 border-b border-[#e7e9e9] justify-evenly items-center inline-flex text-[#091314] text-base font-normal font-roboto ">
              <span className="flex">
                {event.DateOfTheEvent}
              </span>
            </div>
            <div className="inline-flex justify-between w-full">
              <div className="text-[#091314] text-base font-normal font-roboto flex ml-2">
                {event.Title}
              </div>
              {!event?.JoinUsers?.includes(resultUserInfo.Id) &&
              !event?.DeclineUsers?.includes(resultUserInfo.Id) ? (
                <div className="w-[23px] text-black text-base font-normal font-roboto flex">
                  ❓
                </div>
              ) : event.JoinUsers.includes(resultUserInfo.Id) ? (
                <div className="w-[23px] text-black text-base font-normal font-roboto flex">
                  ✅
                </div>
              ) : (
                event.DeclineUsers.includes(resultUserInfo.Id) && (
                  <div className="w-[23px] text-black text-base font-normal font-roboto flex">
                    ❌
                  </div>
                )
              )}
            </div>
            {showEventDetail && (
              <GroupEventDetailComponent
              setShowEventDetail={setShowEventDetail}
              resultUserInfo={resultUserInfo}
                event={selectedEvent}
                cookieValue={cookieValue}
                ws={ws}
              />
            )}
          </div>
        ))}
    </div>
  );
};

export default GroupEventComponent;
