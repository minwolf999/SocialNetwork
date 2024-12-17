"use client";

import React from "react";

const NotificationCount = ({ position, count = 0 }) => {
  return (
    <>
      {count === 0 ? null : (
        <p
          className={`flex text-white bg-customRed h-[20px] w-[20px] rounded text-center items-center justify-center text-sm font-roboto absolute ${position}`}
        >
          {count}
        </p>
      )}
    </>
  );
};

export default NotificationCount;
