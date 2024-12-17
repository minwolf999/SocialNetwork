"use client";

import { useRouter } from "next/navigation";

export const HeaderPost = ({
  username,
  firstname,
  lastname,
  creationdate,
  userId,
  profilePicture,
}) => {
  const router = useRouter();

  const handleProfileClick = async () => {
    router.push(`../profile/${userId}`);
  };

  return (
    <div className="flex flex-col w-full">
      <div className="flex w-full items-center justify-between gap h-[48px]">
        <div className="flex items-center">
          <img
            alt="user profile picture"
            onClick={handleProfileClick}
            className="flex-shrink-0 w-[48px] h-[48px] rounded-xl"
            src={profilePicture}
          />
          <div className="flex flex-col w-[200px] items-start ml-4">
            <span className="text-darkBlue font-roboto text-[16px] font-bold leading-normal">
              {username ? `${username}` : `${firstname} ${lastname}`}
            </span>
            <div className="flex">
              <span className="text-darkBlue font-roboto text-[13px] ftext-base font-normal">
                {creationdate}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
