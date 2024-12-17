"use client";

import React, { useState, useEffect } from "react";
import EditProfileModalComponent from "./EditProfileModal";
import { FetchAddFollowed } from "../Utils/fetchAddFollowed";
import { FetchUnfollow } from "../Utils/fetchUnfollow";
import { useRouter } from "next/navigation";
import { useParams } from "next/navigation"; // Correct hook for dynamic routes in the app directory

const UserInfoComponent = ({
  userData,
  cookieValue,
  ResultFollowAndFollowed,
  resultGetFollowRequest,
  resultUserInfo,
  userFollowers,
  setIsSent,
  isSent,
}) => {
  const [showModal, setShowModal] = useState(false);
  const [profileUserData, setProfileUserData] = useState([]);
  const router = useRouter();
  const { userId } = useParams(); // Use useParams to get dynamic route parameter

  useEffect(() => {
    if (userId === resultUserInfo.Id) {
      setProfileUserData(resultUserInfo);
    } else {
      setProfileUserData(userData);
    }
  }, [resultUserInfo, userId, userData]);

  const toggleModal = () => setShowModal((prev) => !prev);

  useEffect(() => {
    if (
      resultGetFollowRequest.Follow &&
      resultGetFollowRequest.Follow.length > 0
    ) {
      resultGetFollowRequest.Follow.map((result) => {
        if (result.FollowedId === userId) {
          setIsSent(true);
        }
      });
    }
  }, [resultGetFollowRequest, userId]);

  useEffect(() => {
    if (userFollowers.Follow && userFollowers.Follow.length > 0) {
      userFollowers.Follow.map((result) => {
        if (result.FollowerId === resultUserInfo.Id) {
          setIsSent(true);
        }
      });
    }
  }, [userFollowers, resultUserInfo]);

  const addFollower = async () => {
    try {
      const profileData = await FetchAddFollowed(
        cookieValue,
        profileUserData.Id
      );
      if (profileData?.Success) {
        setIsSent(true);
        alert("Une demande a été envoyé");

        if (!location.pathname.startsWith("/profile/")) {
          root.push("/home");
        }
      }
    } catch (error) {
      console.error("Error fetching user profile:", error);
    }
  };

  const Unfollow = async () => {
    try {
      const profileData = await FetchUnfollow(cookieValue, profileUserData.Id);
      if (profileData?.Success) {
        alert("Vous ne suivez plus cette personne");
        setIsSent(false);
      }
    } catch (error) {
      console.error("Error fetching user profile:", error);
    }
  };

  const handleChatClick = () => {
    router.push(`../chat/${profileUserData.Id}`);
  };

  return (
    <div className="flex flex-col mt-4">
      {/* <div className="inline-flex items-center justify-evenly flex-row  h-10"></div> */}
      {ResultFollowAndFollowed &&
        ResultFollowAndFollowed.Follow &&
        ResultFollowAndFollowed.Follow.map((follower) => (
          <React.Fragment key={follower.UserId}>
            {follower.UserId === profileUserData.Id && (
              <div className="flex justify-center">
                <button
                  onClick={handleChatClick}
                  className="w-auto bg-customBlue rounded-lg justify-center items-center text-[#e7e9e9] text-base font-normal font-roboto p-1"
                >
                  Envoyer un message
                </button>
              </div>
            )}
          </React.Fragment>
        ))}
      <div className="w-[180px] text-black text-base font-bold font-inter ml-3 mt-4">
        <div className="w-[22vw] text-black text-base font-bold font-inter m-2">
          Confidentialité :
          <span className="text-black text-base font-normal font-inter">
            {" "}
            {profileUserData.Status}
          </span>
        </div>
        <div className="w-[22vw] text-black text-base font-bold font-inter m-2">
          Prénom :
          <span className=" text-black text-base font-normal font-inter">
            {" "}
            {profileUserData.FirstName}
          </span>
        </div>
        <div className="w-[22vw] text-black text-base font-bold font-inter m-2">
          Nom :
          <span className=" text-black text-base font-normal font-inter">
            {" "}
            {profileUserData.LastName}
          </span>
        </div>
        <div className="w-[22vw] text-black text-base font-bold font-inter m-2">
          Date d&apos;anniversaire :
          <span className=" text-black text-base font-normal font-inter">
            {" "}
            {profileUserData.BirthDate}
          </span>
        </div>
        <div className="w-[22vw] text-black text-base font-bold font-inter m-2">
          Nom d&apos;utilisateur :
          <span className=" text-black text-base font-normal font-inter">
            {" "}
            {profileUserData.Username}
          </span>
        </div>
        <div className="w-[22vw] text-black text-base font-bold font-inter m-2">
          Email :
          <span className=" text-black text-base font-normal font-inter">
            {" "}
            {profileUserData.Email}
          </span>
        </div>
        <div className="w-[22vw] text-black text-base font-bold font-inter m-2">
          About :
          <div className="flex">
            <span
              className="flex text-black text-base font-normal font-inter w-full
              resize-none"
            >
              {profileUserData.AboutMe !== ""
                ? profileUserData.AboutMe
                : "Value empty"}
            </span>
          </div>
        </div>

        {profileUserData.Id === resultUserInfo.Id && (
          <button
            onClick={toggleModal}
            className="w-40 bg-[#33a9ff] rounded-lg justify-center items-center text-[#e7e9e9] text-base font-normal font-roboto mt-8"
          >
            Modifier le profil
          </button>
        )}
        {showModal && (
          <EditProfileModalComponent
            userData={userData}
            closeModal={toggleModal}
            profileUserData={profileUserData}
            resultUserInfo={resultUserInfo}
            cookieValue={cookieValue}
          />
        )}
      </div>
      <div className="flex justify-center">
        {resultUserInfo.Id !== profileUserData.Id &&
          (!isSent ? (
            <button
              onClick={addFollower}
              className="m-4 w-40 flex justify-center cursor-pointer bg-ligthBlue rounded-lg items-center text-[#e7e9e9] text-base font-normal font-roboto"
            >
              Suivre
            </button>
          ) : (
            <button
              onClick={Unfollow}
              className="m-4 w-40 flex justify-center cursor-pointer bg-customRed rounded-lg items-center text-[#e7e9e9] text-base font-normal font-roboto"
            >
              Ne plus suivre
            </button>
          ))}
      </div>
    </div>
  );
};

export default UserInfoComponent;
