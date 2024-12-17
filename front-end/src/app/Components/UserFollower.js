"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { FetchRemoveFollowed } from "../Utils/fetchRemoveFollowed";

const UserFollowerComponent = ({
  name,
  followed,
  resultUserInfo,
  cookieValue,
}) => {
  const router = useRouter();

  const RemoveFollower = async () => {
    try {
      const profileData = await FetchRemoveFollowed(
        cookieValue,
        followed.FollowerId
      );
      if (profileData?.Success) {
        alert("Cette personne ne vous suit plus");
      }
    } catch (error) {
      console.error("Error fetching remove followed:", error);
    }
  };

  const handleClick = () => {
    router.push(`../profile/${followed.FollowerId}`);
  };

  return (
    <div className="w-[90%] flex-row justify-start items-center gap-3.5 inline-flex ml-4">
      <img
        alt="follower picture"
        className="w-12 h-12 rounded-[100px]"
        onClick={handleClick}
        src={followed.Follower_Picture}
      />
      <div
        onClick={handleClick}
        className="w-full h-[2vh] text-[#091314] text-base font-normal font-roboto flex justify-start items-center"
      >
        {name}
      </div>
      {resultUserInfo.Id === followed.FollowedId && (
        <button
          onClick={RemoveFollower}
          className="bg-ligthBlue text-white rounded font-roboto p-1 text-md "
        >
          Retirer
        </button>
      )}
    </div>
  );
};

export default UserFollowerComponent;
