"use client";

import React from "react";
import UserSubComponent from "./UserSub";

// Const that retrieve the subs of the user
const UserListSubsComponent = ({ userFollowers }) => {

  return (
    <div className="flex flex-col mt-4">
      <div className="w-full h-[65vh] flex-col gap-4 flex mt-6">
        <div className="self-stretch justify-evenly items-start gap-2 inline-flex p-1 flex-col overflow-auto hide-scrollbar">
          {userFollowers &&
            userFollowers.Follow &&
            userFollowers.Follow.map((sub) => (
              <UserSubComponent key={sub.FollowedId} user={sub} />
            ))}
        </div>
      </div>
    </div>
  );
};

export default UserListSubsComponent;
