"use client";

import React, { useState, useEffect, useRef } from "react";
import { handleFileChange } from "../Utils/handleFileChange.js";
import { FetchCookieValue } from "../Utils/fetchCookieValue.js";

const PostComponent = ({
  resultUserInfo,
  closeModal,
  userFollowers,
  groupId,
  cookieValue,
}) => {
  const [text, setText] = useState("");
  const [image, setImage] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [imageSrc, setImageSrc] = useState(""); // Will be the image chosen by the user in the post
  const [imageContent, setImageContent] = useState("");
  const [publishButton, setPublishButton] = useState(false);
  const [privateOrPublic, setPrivateOrPublic] = useState("public");
  const [selectedFollowers, setSelectedFollowers] = useState([]); // New state to track selected followers
  const imageRef = useRef(null); // Reference for the image element

  const IsValideStatus = (status) => {
    if (status === "public" || status === "private") {
      return true;
    }

    const statusSplit = status.split(" | ");
    if (statusSplit.length > 1 && statusSplit[0] === "almost private") {
      return true;
    }

    return false;
  };

  const createPost = async () => {
    const date = new Date();
    const formatedDate = `${date.getFullYear()}-${
      date.getMonth() + 1
    }-${date.getDate()}`;
    const postData = {
      AuthorId: cookieValue,
      Text: text,
      Image: imageContent,
      CreationDate: formatedDate,
      Status: privateOrPublic,
      IsGroup: groupId,
    };

    if (IsValideStatus(postData.Status)) {
      const result = await FetchCookieValue(
        "http://localhost:8080/createPost",
        postData
      );
      if (!result.hasOwnProperty("Success")) {
        console.error("Error creating post");
      }
    }
  };

  useEffect(() => {
    if (text.trim() && IsValideStatus(privateOrPublic)) {
      setPublishButton(true);
    } else {
      setPublishButton(false);
    }
  }, [text, privateOrPublic]);

  const handleFollowersChange = (followerId, isChecked) => {
    setSelectedFollowers((prevSelected) => {
      if (isChecked) {
        return [...prevSelected, followerId];
      } else {
        return prevSelected.filter((id) => id !== followerId);
      }
    });
  };

  useEffect(() => {
    if (privateOrPublic[0] === "a") {
      const selectedFollowersString = selectedFollowers.length
        ? `almost private | ${selectedFollowers.join(" | ")}`
        : "almost private";
      setPrivateOrPublic(selectedFollowersString);
    }
  }, [selectedFollowers, privateOrPublic]);

  return (
    <div className="fixed z-10 inset-0 bg-gray-600 bg-opacity-75 flex justify-center items-center ">
      <div className="bg-white p-6 rounded-lg shadow-lg w-[50vw] h-[60vh] overflow-auto">
        <div className="flex items-center text-center align-middle mb-4 justify-around">
          <div></div>
          <div className="flex justify-center">
            <h2 className="text-3xl font-bold">Créer une publication !</h2>
            {/* <SparklesSvg /> */}
            <img src="/svg/Sparkles.svg" alt="Sparkles icon" />
          </div>
          <button onClick={closeModal} className="flex cursor-pointer">
            {/* <ClosePostSvg /> */}
            <img src="/svg/ClosePost.svg" alt="Sparkles icon" />
          </button>
        </div>

        {!location.pathname.startsWith("/group/") && (
          <>
            {/* Radio buttons for post visibility */}
            <div className="flex flex-row space-x-4 mb-4">
              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="visibility"
                  value="public"
                  className="form-radio text-blue-500"
                  onChange={() => setPrivateOrPublic("public")}
                />
                <span className="text-black">Public</span>
              </label>
              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="visibility"
                  value="private"
                  className="form-radio text-blue-500"
                  onChange={() => setPrivateOrPublic("private")}
                />
                <span className="text-black">Private</span>
              </label>
              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="visibility"
                  value="almost private"
                  className="form-radio text-blue-500"
                  onChange={() => setPrivateOrPublic("almost private")}
                />
                <span className="text-black">Almost</span>
              </label>
            </div>

            {/* Followers checkboxes */}
            {privateOrPublic[0] === "a" && (
              <div className="mb-4">
                <h3 className="font-semibold text-lg mb-2">
                  Select Followers:
                </h3>
                {userFollowers?.Follow?.map((follower, index) => (
                  <label key={index} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      className="form-checkbox text-blue-500"
                      onChange={(e) =>
                        handleFollowersChange(
                          follower.followerId,
                          e.target.checked
                        )
                      }
                    />
                    <span className="text-black">{follower.Follower_Name}</span>
                  </label>
                ))}
              </div>
            )}
          </>
        )}

        <div className="flex h-[10vh] items-center">
          <div className="flex justify-center w-[8vw]">
            <img
              className="h-[60px] w-[60px] rounded-lg bg-slate-200"
              src={resultUserInfo.ProfilePicture}
              alt="Image for the group"
            />
          </div>
          <div className="w-full">
            <div className="flex p-0.5">
              {resultUserInfo.FirstName} {resultUserInfo.LastName}
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center justify-center">
          <textarea
            id="postText"
            className="text-black bg-gray-100 flex justify-center items-center resize-none w-[45vw] h-[20vh]"
            value={text}
            onChange={(e) => setText(e.target.value)}
          ></textarea>
          <div
            id="imageDiv"
            className="flex flex-col items-center m-3 relative"
          >
            <input
              type="file"
              accept="image/*"
              id="postImage"
              name="image"
              className="p-1.5 text-sm flex"
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
          <img
            id="imagePreview"
            className={imageSrc ? null : "hidden"}
            src={imageSrc}
            ref={imageRef}
            alt="Preview"
          />
        </div>
        {publishButton && privateOrPublic && (
          <button
            id="publishButton"
            onClick={async () => {
              await createPost();
              closeModal();
            }}
            className="mt-10 bg-blue-500 text-white px-4 py-2 text-lg rounded w-full"
          >
            Publier
          </button>
        )}
      </div>
    </div>
  );
};

export default PostComponent;
