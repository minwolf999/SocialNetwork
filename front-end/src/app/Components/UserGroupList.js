"use client";

import React from "react";
import UserGroupComponent from "./UserGroup";

const UserGroupListComponent = ({ resultGroupsJoined }) => {
  return (
    <div className="flex flex-col mt-4">
      <div className="w-full h-[65vh] flex-col gap-4 flex mt-6">
        <div className="self-stretch justify-evenly items-start gap-2 inline-flex p-1 flex-col overflow-auto hide-scrollbar">
          {resultGroupsJoined && resultGroupsJoined.length > 0 ? (
            resultGroupsJoined.map((group) => (
              <React.Fragment key={group.Id}>
                <UserGroupComponent group={group} />
              </React.Fragment>
            ))
          ) : (
            <p>No group found for the specified member.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserGroupListComponent;
