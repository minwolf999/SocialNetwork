import React, { useState, useRef } from "react";
import PostComponent from "../Components/Post.js";
import { handleFileChange } from "../Utils/handleFileChange.js";

const GroupHeaderComponent = ({
  toggleModal,
  showModal,
  resultUserInfo,
  group,
  isMember,
  groupId,
  cookieValue,
}) => {
  const [imageSrc, setImageSrc] = useState("/svg/NewGroup.svg"); // Default image
  const [imageFile, setImageFile] = useState(null);
  const [imageContent, setImageContent] = useState("");
  const imageRef = useRef(null); // Reference for the img element

  return (
    <div className="bg-white flex justify-between items-center p-0.5 h-14 shadow-lg border-b relative">
      <div className="flex items-center align-middle">
        <div id="imageDiv" className="flex ">
          <label id="labelIcon" htmlFor="groupHeaderFile">
            <img
              id="image"
              src={imageSrc}
              ref={imageRef}
              className=" w-10 h-10 object-cover rounded-full cursor-pointer"
              alt="Group logo"
            />
          </label>

          <input
            type="file"
            accept="image/*"
            id="groupHeaderFile"
            className="p-1.5 text-sm hidden"
            onChange={(event) =>
              handleFileChange(
                event,
                setImageFile,
                setImageSrc,
                setImageContent,
                imageRef.current
              )
            }
          />
        </div>

        <div className="flex items-center align-middle font-bold text-3xl text-blue-500 ml-2">
          <p className="text-3xl font-bold text-blue-500 bg-transparent border-none focus:outline-none">
            {group.GroupName}
          </p>
        </div>
      </div>
      {isMember ? (
        <div className="flex">
          <div
            className="flex justify-center items-center mr-2 cursor-pointer p-0.5"
            onClick={toggleModal}
          >
            <input
              type="text"
              placeholder="Quoi de neuf ?"
              className="w-28 cursor-pointer focus:outline-none"
              readOnly
            />
            <img src="/svg/CreatePost.svg" alt="Create post" />
          </div>
          <div className="flex justify-center items-center mr-2 cursor-pointer p-0.5"></div>
        </div>
      ) : (
        <p className="text-black">Join to Post</p>
      )}
      {showModal && (
        <PostComponent
          resultUserInfo={resultUserInfo}
          closeModal={toggleModal}
          groupId={groupId}
          cookieValue={cookieValue}
        />
      )}
    </div>
  );
};

export default GroupHeaderComponent;
