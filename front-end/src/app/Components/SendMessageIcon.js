"use client";

import React, { useState } from "react";

export const SendMessageIcon = () => {
  const [hidden, setHidden] = useState(true);

  return (
    <div
      className={`flex relative w-[48px] cursor-pointer justify-center items-center ${
        hidden ? null : "rotate-90" //
      }`}
      onMouseEnter={() => setHidden(false)}
      onMouseLeave={() => setHidden(true)}
    >
      <svg width="48" height="49" viewBox="0 0 48 49" fill="none">
        <path
          d="M22.8786 48.7487L0.251221 26.1213L19.3431 18.3431L38.435 10.565L22.8786 48.7487ZM21.4644 41.6777L31.1518 17.8482L7.32229 27.5355L12.272 32.4853L22.8786 26.1213L16.5147 36.7279L21.4644 41.6777Z"
          className="fill-customBlue"
        />
      </svg>
    </div>
  );
};
