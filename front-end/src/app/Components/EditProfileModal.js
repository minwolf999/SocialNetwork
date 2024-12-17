"use client";

import React, { useState, useRef, useEffect } from "react";
import { handleFileChange } from "../Utils/handleFileChange.js";
import { handleBannerChange } from "../Utils/handleFileChange.js";
import ConfirmationEditProfileModalComponent from "./ConfirmationEditProfileModal.js";

const EditProfileModalComponent = ({
  userData,
  closeModal,
  resultUserInfo,
  cookieValue,
}) => {
  const [bannerFile, setBannerFile] = useState(null);
  const [username, setUsername] = useState("");
  const [Password, setPassword] = useState("");
  const [Mail, setMail] = useState("");
  const [aboutMe, setAboutMe] = useState("");
  const imageRef = useRef(null); // Reference for the img element
  const bannerRef = useRef(null);
  const [imageSrc, setImageSrc] = useState(null); // Default image
  const [bannerSrc, setBannerSrc] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [imageContent, setImageContent] = useState("");
  const [bannerContent, setBannerContent] = useState("");
  const [selectedOption, setSelectedOption] = useState("");

  const [showModal, setShowModal] = useState(false);

  const toggleModal = () => setShowModal((prev) => !prev);

  const handleChangeStatus = (event) => {
    setSelectedOption(event.target.value);
  };

  useEffect(() => {
    userData.UserName
      ? setUsername(userData.Username)
      : setUsername(`${userData.FirstName} ${userData.LastName}`);
    setAboutMe(userData.AboutMe);
    setImageFile(userData.ProfilePicture);
    setBannerFile(userData.Banner);
    setMail(userData.Email);
    setSelectedOption(userData.Status);
  }, [cookieValue, userData]);

  const formDataChanged = {
    Id: resultUserInfo.Id,
    Username: username,
    Email: Mail,
    Password: Password,
    imageFile: imageSrc,
    bannerFile: bannerSrc,
    aboutMe: aboutMe,
    Status: selectedOption,
  };

  return (
    <div className="fixed z-10 inset-0 bg-black/20 backdrop-blur-[12.10px] flex justify-center items-center">
      <div className="w-[38vw] h-[68vh] bg-[#fefeff] rounded-lg flex flex-col">
        <div className="flex items-center text-center mb-4 justify-between p-4">
          <h2 className="text-3xl font-bold flex-grow text-center">
            Edit your profile
          </h2>
          <button onClick={closeModal} className="cursor-pointer">
            <img src="/svg/ClosePost.svg" alt="Close" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="flex-grow overflow-auto hide-scrollbar p-4 m-2">
          <div className="flex items-center">
            <input
              id="radioPrivate"
              type="radio"
              value="private"
              checked={selectedOption === "private"}
              onChange={handleChangeStatus}
              name="default-radio"
              className="flex cursor-pointer w-4 h-4 accent-customBlue"
            />
            <label
              htmlFor="default-radio-1"
              className="flex ms-2 text-black text-base font-bold font-inter m-2 "
            >
              Privé
            </label>
          </div>
          <div className="flex items-center">
            <input
              id="radioPublic"
              type="radio"
              value="public"
              checked={selectedOption === "public"}
              onChange={handleChangeStatus}
              name="default-radio"
              className="flex cursor-pointer w-4 h-4 accent-customBlue"
            />
            <label
              htmlFor="default-radio-2"
              className="flex ms-2 text-black text-base font-bold font-inter m-2 "
            >
              Public
            </label>
          </div>

          <label className="block mb-2">
            Modifier l&apos;image de profil :
          </label>
          <div id="imageDiv" className="mb-4">
            <label htmlFor="ProfileImage">
              <img
                className="w-[9vw] h-[12vh] bg-[#5f6c6d] rounded-xl shadow-2xl cursor-pointer object-cover"
                src={imageFile}
                ref={imageRef}
                id="image"
                alt="image"
              />
            </label>
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

          <label className="block mb-2">Modifier la bannière :</label>
          <div className="mb-4" id="imageDiv">
            <label htmlFor="ProfileBanner"></label>
            <img
              className="w-full h-[12vh] bg-[#5f6c6d] cursor-pointer object-cover"
              src={bannerFile}
              ref={bannerRef}
              alt="banner"
            />
            <input
              type="file"
              accept="image/*"
              id="ProfileBanner"
              className="p-1.5 text-sm mt-2"
              onChange={(event) =>
                handleBannerChange(
                  event,
                  setBannerFile,
                  setBannerSrc,
                  setBannerContent,
                  bannerRef.current
                )
              }
            />
          </div>

          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="rounded-md p-1.5 border-2 border-gray-500 w-full mt-4 text-sm "
            placeholder="Username"
          />

          <input
            type="mail"
            value={Mail}
            onChange={(e) => setMail(e.target.value)}
            className="rounded-md p-1.5 border-2 border-gray-500 w-full mt-4 text-sm "
            placeholder="Mail"
          />

          <input
            type="password"
            value={Password}
            onChange={(e) => setPassword(e.target.value)}
            className="rounded-md p-1.5 border-2 border-gray-500 w-full mt-4 text-sm "
            placeholder="Password"
          />

          <textarea
            value={aboutMe}
            onChange={(e) => setAboutMe(e.target.value)}
            className="rounded-md p-1.5 border-2 border-gray-500 w-full  mt-4 text-sm"
            placeholder="About Me"
            rows="5"
          />
          <div className="flex justify-end">
            <button
              className="bg-darkBlue hover:bg-ligthBlue text-white py-2 px-4 rounded mt-4 flex"
              onClick={toggleModal}
            >
              Save
            </button>
            {showModal && (
              <ConfirmationEditProfileModalComponent
                data={formDataChanged}
                closeModal={toggleModal}
                cookieValue={cookieValue}
              />
            )}
          </div>
          {/* </form> */}
        </div>
      </div>
    </div>
  );
};

export default EditProfileModalComponent;
