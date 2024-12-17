"use client";

import React, { useState, useEffect } from "react";
import { FetchCookieValue } from "../Utils/fetchCookieValue";
import EventJoinedListDetailsComponent from "./EventJoinedListDetails";

const ListEventComponent = ({ closeModal, cookieValue }) => {
  const [eventJoined, setEventJoined] = useState([]);

  useEffect(() => {
    const fetchEventJoined = async () => {
      const response = await FetchCookieValue(
        "http://localhost:8080/getJoinedEvent",
        { UserId: cookieValue }
      );

      if (response.Success) {
        setEventJoined(response.Value);
      }
    };

    fetchEventJoined();
  }, [cookieValue]);

  return (
    <div className="fixed z-10 inset-0 bg-gray-600 bg-opacity-75 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-[50vw] h-[60vh]">
        <div className="flex items-center text-center align-middle mb-4 justify-around">
          <div></div>
          <div className="flex justify-center">
            <h2 className="text-3xl font-bold">Liste des évènements 📆</h2>
          </div>
          <button onClick={closeModal} className="flex cursor-pointer">
            {/* <ClosePostSvg /> */}
            <img src="/svg/ClosePost.svg" alt="Sparkles icon" />
          </button>
        </div>
        <div className="flex flex-col items-center relative h-[90%] overflow-auto hide-scrollbar">
          <EventJoinedListDetailsComponent eventJoined={eventJoined} />
        </div>
      </div>
    </div>
  );
};

export default ListEventComponent;
