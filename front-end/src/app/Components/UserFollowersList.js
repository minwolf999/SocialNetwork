"use client";

import UserFollowerComponent from "./UserFollower";

// Const that retrieve the followers of the user
const UserListFollowersComponent = ({ userFollowed, resultUserInfo, cookieValue }) => {
  return (
    <div className="flex flex-col mt-4">
      <div className="w-full h-[65vh] flex-col gap-4 flex mt-6">
        <div className="self-stretch justify-evenly items-start gap-2 inline-flex p-1 flex-col overflow-auto hide-scrollbar">
          {userFollowed &&
            userFollowed.Follow &&
            userFollowed.Follow.map((followed) => (
              <UserFollowerComponent
                key={followed.FollowerId}
                name={followed.Follower_Name}
                followed={followed}
                resultUserInfo={resultUserInfo}
                cookieValue={cookieValue}
              />
            ))}
        </div>
      </div>
    </div>
  );
};

export default UserListFollowersComponent;
