"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { FetchUserNotifications } from "../Utils/fetchGetUserNotifications";
import NotificationCount from "./NotificationCount";

const UserFollowerComponent = ({ name, userId, cookieValue, dataUser }) => {
  const [isShown, setIsShown] = useState(false);
  const router = useRouter();
  const [notifications, setNotifications] = useState([]);
  const notificationsNumber = notifications.Value?.length || 0;

  const handleChatClick = () => {
    router.push(`../chat/${userId}`);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const notif = await FetchUserNotifications(userId, cookieValue);
        if (notif?.Success) {
          setNotifications(notif);
        }
      } catch (error) {
        console.error("Error fetching notifications:", error);
      }
    };
    fetchData();
  }, [userId, cookieValue]);

  return (
    <div
      onMouseEnter={() => setIsShown(true)}
      onMouseLeave={() => setIsShown(false)}
      className="flex-row gap-3.5 inline-flex"
    >
      <div className="flex relative">
        <img
          alt="user profile picture"
          onClick={handleChatClick}
          className="w-12 h-12 rounded-[100px]"
          src={dataUser.User_ProfilePicture}
        />
        <NotificationCount position="right-0" count={notificationsNumber} />
      </div>
      {isShown && (
        <div className=" bg-customGrey flex justify-center items-center absolute rounded-[100px] z-10 p-2 ml-14 mt-1">
          <span className=" text-black text-base font-normal font-roboto flex">
            {" "}
            {name}
          </span>
        </div>
      )}
    </div>
  );
};

export default UserFollowerComponent;
