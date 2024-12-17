"use client";

import React from "react";
import { useRouter } from "next/navigation";

const UserSubComponent = ({ user }) => {
  const router = useRouter();

  const handleClick = () => {
    router.push(`../profile/${user.FollowedId}`);
  };

  return (
    <div
      onClick={handleClick}
      className="w-[90%] flex-row justify-start items-center gap-3.5 inline-flex ml-4"
    >
      <img
        alt="followed picture"
        className="w-12 h-12 rounded-[100px]"
        src={user.Followed_Picture}
      />
      <div className="w-full h-[2vh] text-[#091314] text-base font-normal font-roboto flex justify-start items-center">
        {user.Followed_Name}
      </div>
      <span className="text-black rounded font-roboto p-1 text-md ">
        Suivi(e)
      </span>
    </div>
  );
};

export default UserSubComponent;
