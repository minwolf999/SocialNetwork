"use client";

import React, { useState } from "react";

export const AddGroup = (showCreateGroupModal) => {
  const [hidden, setHidden] = useState(true);

  return (
    <div
      className="self-stretch h-[35px] px-2 pt-2 pb-2 border-t border-[#b5bbbb] justify-start items-center gap-2 inline-flex cursor-pointer"
      onMouseEnter={() => setHidden(false)}
      onMouseLeave={() => setHidden(true)}
    >
      <svg width="16" height="17" viewBox="0 0 16 17" fill="none">
        <path
          d="M7.2 12.5H8.8V9.3H12V7.7H8.8V4.5H7.2V7.7H4V9.3H7.2V12.5ZM8 16.5C6.89333 16.5 5.85333 16.29 4.88 15.87C3.90667 15.45 3.06 14.88 2.34 14.16C1.62 13.44 1.05 12.5933 0.63 11.62C0.21 10.6467 0 9.60667 0 8.5C0 7.39333 0.21 6.35333 0.63 5.38C1.05 4.40667 1.62 3.56 2.34 2.84C3.06 2.12 3.90667 1.55 4.88 1.13C5.85333 0.71 6.89333 0.5 8 0.5C9.10667 0.5 10.1467 0.71 11.12 1.13C12.0933 1.55 12.94 2.12 13.66 2.84C14.38 3.56 14.95 4.40667 15.37 5.38C15.79 6.35333 16 7.39333 16 8.5C16 9.60667 15.79 10.6467 15.37 11.62C14.95 12.5933 14.38 13.44 13.66 14.16C12.94 14.88 12.0933 15.45 11.12 15.87C10.1467 16.29 9.10667 16.5 8 16.5ZM8 14.9C9.78667 14.9 11.3 14.28 12.54 13.04C13.78 11.8 14.4 10.2867 14.4 8.5C14.4 6.71333 13.78 5.2 12.54 3.96C11.3 2.72 9.78667 2.1 8 2.1C6.21333 2.1 4.7 2.72 3.46 3.96C2.22 5.2 1.6 6.71333 1.6 8.5C1.6 10.2867 2.22 11.8 3.46 13.04C4.7 14.28 6.21333 14.9 8 14.9Z"
          className={`fill-${hidden ? "darkGrey" : "customBlue"}`}
        />
      </svg>
      <div className="justify-start items-center gap-2 flex">
        <div
          className={`text-[#919a9b] text-base font-semibold font-roboto
      ${hidden ? "text-darkGrey" : "text-customBlue"}
      `}
          onMouseEnter={() => setHidden(false)}
          onMouseLeave={() => setHidden(true)}
        >
          Create a group
        </div>
      </div>
    </div>
  );
};

export default AddGroup;
