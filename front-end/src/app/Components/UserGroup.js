"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import NotificationCount from "./NotificationCount";

export const UserGroupComponent = ({ group }) => {
  const [hidden, setHidden] = useState(true);
  const router = useRouter();

  const handleClick = () => {
    router.push(`../group/${group.Id}`);
  };
  return (
    <div
      key={group.Id}
      className={`self-stretch justify-start items-center inline-flex w-[90%] ml-4 ${
        hidden ? null : "bg-customBlue rounded text-white"
      }`}
      onMouseEnter={() => setHidden(false)}
      onMouseLeave={() => setHidden(true)}
      onClick={handleClick}
    >
      <div className="flex relative items-center mr-2">
        <img
          alt="group picture"
          src={group.Banner}
          className={` w-12 h-12 rounded-[100px] mr-4 ${
            hidden ? "rounded-md" : "rounded-full"
          }`}
        />
      </div>
      <div className="w-full h-[2vh] text-[#091314] text-base font-normal font-roboto flex justify-start items-center">
        <span className="">{group.GroupName}</span>
      </div>
      <NotificationCount
        position="right-0"
        count={group.NotificationQuantity}
      />
    </div>
  );
};

export default UserGroupComponent;
