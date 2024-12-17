"use client";

import React from "react";

export const PostContent = ({ image, text }) => {
  return (
    <div className="flex flex-col items-sta rt justify-center  w-full mt-4">
      <div className="flex flex-col w-full h-auto items-center">
        <div className="flex self-stretch text-[#091314] text-base font-normal font-roboto text-center">
          {text}
        </div>
        {image && (
          <img
            src={image}
            alt="post image"
            className="flex w-[611px] h-[278px] bg-ligthGrey items-center justify-center rounded-lg mt-4"
          />
        )}
      </div>
    </div>
  );
};
