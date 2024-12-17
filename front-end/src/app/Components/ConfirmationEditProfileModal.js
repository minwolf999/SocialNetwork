"use client";

import React from "react";

const ConfirmationEditProfileModalComponent = ({
  data,
  closeModal,
  cookieValue,
}) => {
  const FetchModificationUserProfile = async (data) => {
    try {
      const response = await fetch("http://localhost:8080/updateUserInfo", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          Status: data.Status,
          ProfilePicture: data.imageFile,
          Banner: data.bannerFile,
          Username: data.Username,
          AboutMe: data.aboutMe,
          Email: data.Email,
          Password: data.Password,
          Id: cookieValue,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch user profile");
      } else {
        location.reload(); // If the changed has been done, it reloads the page with the modifications
      }

      return await response.json();
    } catch (error) {
      console.error("Error in FetchUserProfile:", error);
      return null;
    }
  };

  const handleSubmit = () => {
    FetchModificationUserProfile(data);
  };

  return (
    <div className="fixed z-10 inset-0 bg-black/20 backdrop-blur-[12.10px] flex justify-center items-center">
      <div className="w-[38vw] h-[25vh] bg-[#fefeff] rounded-lg flex flex-col">
        <div className="flex items-center text-center mb-4 justify-between p-4">
          <h2 className="text-3xl font-bold flex-grow text-center">
            Edit your profile
          </h2>
          <button onClick={closeModal} className="cursor-pointer">
            <img src="/svg/ClosePost.svg" alt="Close" />
          </button>
        </div>
        <div className="flex flex-col h-[10vh] m-4">
          <div className="flex justify-center">
            <span>Voulez-vous vraiment modifier ces valeurs ?</span>
          </div>
          <div className="flex justify-evenly mt-4">
            <button
              onClick={handleSubmit}
              className="flex bg-green-600 hover:bg-green-500 p-1 rounded text-white"
            >
              Oui
            </button>
            <button
              onClick={closeModal}
              className="flex bg-red-600 hover:bg-red-500 p-1 rounded text-white"
            >
              Non
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationEditProfileModalComponent;
