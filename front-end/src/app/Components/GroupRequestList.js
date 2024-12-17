"use client";

import React from "react";
import { useParams } from "next/navigation"; // Correct hook for dynamic routes in the app directory
import {
  FetchAcceptJoinRequest,
  FetchDeclineJoinRequest,
} from "../Utils/fetchRequestResponses";

const GroupInfoComponent = ({
  cookieValue,
  joinRequest,
  setJoinRequest,
  ws,
}) => {
  const { groupId } = useParams(); // Use useParams to get dynamic route parameter

  const acceptJoinRequest = (sender) => {
    FetchAcceptJoinRequest(cookieValue, groupId, sender, setJoinRequest);
  };

  const declineJoinRequest = (sender) => {
    FetchDeclineJoinRequest(cookieValue, groupId, sender, setJoinRequest);
  };

  return (
    <div className="flex flex-col mt-4">
      {joinRequest && joinRequest.length > 0 ? (
        joinRequest.map((request) => (
          <div
            key={request.UserId}
            className="flex flex-col h-[45%] overflow-auto mt-1 hide-scrollbar"
          >
            <div className="flex flex-col suggestion-item p-2 text-black border-black">
              <span className="flex justify-center text-justify">
                {request.User_Name}
              </span>
              <div className="flex justify-evenly mt-2">
                <button
                  className="w-28 bg-customBlue rounded-lg justify-center items-center text-[#e7e9e9] text-base font-normal font-roboto"
                  onClick={() => acceptJoinRequest(request)}
                >
                  Accepter
                </button>
                <button
                  className="w-28 bg-customRed rounded-lg justify-center items-center text-[#e7e9e9] text-base font-normal font-roboto"
                  onClick={() => declineJoinRequest(request)}
                >
                  Refuser
                </button>
              </div>
            </div>
          </div>
        ))
      ) : (
        <p className="text-black">No Request for the moment</p>
      )}
    </div>
  );
};

export default GroupInfoComponent;
