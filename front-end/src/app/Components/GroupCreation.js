"use client";

import React, { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { handleFileChange } from "../Utils/handleFileChange.js";
import {
  FetchCreateGroup,
} from "../Utils/fetchGroupRequest";
import {
  FetchGroupsJoined,
} from "../Utils/fetchAllData";

const GroupCreationComponent = ({ closeCreateGroupModal, cookieValue, setResultGroupsJoined }) => {
  const [authorId, setAuthorId] = useState("");
  const [groupName, setGroupName] = useState("");
  const [text, setText] = useState("");
  const [image, setImage] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [imageSrc, setImageSrc] = useState(""); // Will be the image choosen by the user in the post
  const imageRef = useRef(null); // Reference for the img element
  const [aboutMe, setAboutMe] = useState("");
  const [imageContent, setImageContent] = useState("");
  const [publishButton, setPublishButton] = useState(false);
  const [showCreateGroupModal, setShowCreateGroupModal] = useState(false);
  const router = useRouter();

  const createGroup = async () => {
    const date = new Date();
    const formatedDate = `${date.getFullYear()}-${
      date.getMonth() + 1
    }-${date.getDate()}`;
    const createGroupForm = {
      LeaderId: cookieValue,
      GroupName: groupName,
      GroupDescription: aboutMe,
      CreationDate: formatedDate,
      GroupPicture: imageSrc,
    };
    try {
      const createGroup = await FetchCreateGroup(createGroupForm);
      if (createGroup?.Success) {
        FetchGroupsJoined(cookieValue, setResultGroupsJoined);
      }
    } catch (error) {
      console.error("Error fetching user profile:", error);
    }
  };

  const toggleCreateGroupModal = () => setShowCreateGroupModal((prev) => !prev);

  // Function to safely check if we are in the browser environment
  const isBrowser = () =>
    typeof window !== "undefined" && typeof document !== "undefined";

  useEffect(() => {
    if (text.trim()) {
      setPublishButton(true);
    } else {
      setPublishButton(false);
    }
  }, [text]);

  return (
    <div className="fixed z-10 inset-0 bg-black/20 backdrop-blur-[12.10px] flex justify-center items-center">
      <div className="w-[38vw] h-[68vh] bg-[#fefeff] rounded-lg flex flex-col">
        <div className="flex items-center text-center mb-4 justify-between p-4">
          <h2 className="text-3xl font-bold flex-grow text-center text-black">
            Création d&apos;un groupe
          </h2>
          <button onClick={closeCreateGroupModal} className="cursor-pointer">
            <img src="/svg/ClosePost.svg" alt="Close" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="flex-grow overflow-auto hide-scrollbar p-4 m-2">
          <label className="block mb-2 text-black">
            Choisir l&apos;image du groupe :
          </label>
          <div id="imageDiv" className="mb-4 text-black">
            <input
              type="file"
              accept="image/*"
              id="ProfileImage"
              className="p-1.5 text-sm mt-2"
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

          <input
            type="text"
            onChange={(e) => setGroupName(e.target.value)}
            className="rounded-md p-1.5 border-2 border-gray-500 w-full mt-4 text-sm text-black"
            placeholder="Nom de votre groupe"
          />

          <textarea
            value={aboutMe}
            onChange={(e) => setAboutMe(e.target.value)}
            className="rounded-md p-1.5 border-2 border-gray-500 w-full  mt-4 text-sm text-black"
            placeholder="Description"
            rows="5"
          />
          <div className="flex justify-end">
            <button
              className="bg-darkBlue hover:bg-ligthBlue text-white py-2 px-4 rounded mt-4 flex"
              onClick={createGroup}
            >
              Créer
            </button>
          </div>
          {/* </form> */}
        </div>
      </div>
    </div>
  );
};

export default GroupCreationComponent;
