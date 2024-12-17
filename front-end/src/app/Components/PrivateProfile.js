"use client";

import React, { useState, useEffect } from "react";
import { FetchAddFollowed } from "../Utils/fetchAddFollowed";

const PrivateProfileComponent = ({
  userData,
  cookieValue,
  setIsPublic,
  resultGetFollowRequest,
  resultUserInfo,
  ws,
}) => {
  const [isSent, setIsSent] = useState(false);
  const ProfileUserData = userData;

  useEffect(() => {
    if (resultGetFollowRequest?.Success) {
      resultGetFollowRequest.Follow?.map((result) => {
        if (result.FollowerId === resultUserInfo.Id) {
          setIsSent(true);
        }
      });
    }
  }, [resultGetFollowRequest, resultUserInfo]);

  const addFollower = async () => {
    try {
      const profileData = await FetchAddFollowed(
        cookieValue,
        ProfileUserData.Id
      );
      if (profileData?.Success) {
        setIsSent(true);
        alert("Une demande a été envoyé");
      }
    } catch (error) {
      console.error("Error fetching user profile:", error);
    }
  };

  useEffect(() => {
    const handleWebSocketMessage = (event) => {
      try {
        const data = JSON.parse(event.data);

        if (
          data.Type === "DeclineFollow" &&
          data.UserId === ProfileUserData.Id
        ) {
          setIsSent(false);
        } else if (
          data.Type === "AcceptFollow" &&
          data.UserId === ProfileUserData.Id
        ) {
          setIsPublic(true);
        }
      } catch (error) {
        console.error("Error parsing WebSocket message:", error);
      }
    };
    ws.addEventListener("message", handleWebSocketMessage);
    return () => {
      ws.removeEventListener("message", handleWebSocketMessage);
    };
  }, [cookieValue, ws, ProfileUserData, setIsPublic]);

  return (
    <div className="flex flex-col mt-4 items-center">
      {/* <div className="inline-flex items-center justify-evenly flex-row  h-10"></div> */}
      <span className="flex text-black text-base font-inter font-bold justify-center mb-2">
        Ce profil est privé
      </span>
      <span className="flex text-black text-base font-inter justify-center max-w-sm text-justify mb-2">
        Pour voir les informations de cet utilisateur, veuillez envoyer une
        requête de suivi...
      </span>

      <div className="flex justify-center">
        {/* Check if the user has already sent a follow request */}
        {isSent === false ? (
          <button
            onClick={addFollower}
            className="m-4 w-40 flex justify-center cursor-pointer bg-ligthBlue rounded-lg items-center text-[#e7e9e9] text-base font-normal font-roboto"
          >
            Suivre
          </button>
        ) : (
          <button className="m-4 w-40 flex justify-center cursor-default bg-ligthGrey rounded-lg items-center text-black text-base font-normal font-roboto">
            Demande envoyée
          </button>
        )}
      </div>
    </div>
  );
};

export default PrivateProfileComponent;
