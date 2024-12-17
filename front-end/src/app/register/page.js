"use client";

import React, { useState, useRef } from "react";
import { Header } from "../Components/Header.js";
import { useRouter } from "next/navigation"; // import the useRouter hook
import { handleFileChange } from "../Utils/handleFileChange.js";

const Register = () => {
  const router = useRouter();

  const [Password, setPassword] = useState("");
  const [ConfirmPassword, setConfirmPassword] = useState("");
  const [Username, setUsername] = useState("");
  const [Firstname, setFirstname] = useState("");
  const [Lastname, setLastname] = useState("");
  const [BirthDate, setBirthDate] = useState("");
  const [Mail, setMail] = useState("");
  const [SelectGender, setSelectGender] = useState("");
  const [imageSrc, setImageSrc] = useState("/default_image.png"); // Default image
  const [imageFile, setImageFile] = useState(null);
  const [imageContent, setImageContent] = useState("");
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const imageRef = useRef(null); // Reference for the img element
  const bannerRef = useRef(null);
  const [bannerSrc, setBannerSrc] = useState("/Banner.png");
  const [bannerContent, setBannerContent] = useState("");
  const [bannerFile, setBannerFile] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (Password !== ConfirmPassword) {
      setErrorMessage("Wrong Password");
      return;
    }

    const formData = {
      Username: Username,
      FirstName: Firstname,
      LastName: Lastname,
      BirthDate: BirthDate,
      Email: Mail,
      Gender: SelectGender,
      Password: Password,
      ConfirmPassword: ConfirmPassword,
      ProfilePicture: imageSrc,
      Banner: bannerSrc,
    };

    try {
      const response = await fetch("http://localhost:8080/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const result = await response.json();
        if (result.hasOwnProperty("Success")) {
          setPassword("");
          setConfirmPassword("");
          setUsername("");
          setFirstname("");
          setLastname("");
          setBirthDate("");
          setMail("");
          setSelectGender("");
          setImageSrc("./default_image.png");
          setBannerSrc("./Banner.png");

          router.push("/"); // Redirect to home
        } else {
          setErrorMessage("Failed to register, email already picked");
          setShowError(true); // Show the error div
        }
      }
    } catch (error) {
      setShowError(true); // Show the error div
    }
  };

  return (
    <>
      <Header name={"Register here"} />

      <div className="flex flex-col items-center justify-center">
        <form
          className="flex flex-col p-5 md:w-auto sm-[15vw] lg-[25vw] overflow-auto"
          onSubmit={handleSubmit}
          encType="multipart/form-data"
        >
          <div className="flex m-3 text-customBlue text-3xl font-bold text-left">
            Create an account
          </div>

          {showError && (
            <div className="m-3 p-1 justify-center no-underline border-2 rounded-md bg-customRed text-white">
              <span>{errorMessage}</span>
            </div>
          )}

          <input
            type="text"
            id="Username"
            className="m-3 rounded-md p-1.5 border-2 border-gray-500"
            placeholder="Username"
            value={Username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <input
            type="text"
            id="Firstname"
            className="m-3 rounded-md p-1.5 border-2 border-gray-500"
            placeholder="Firstname"
            value={Firstname}
            onChange={(e) => setFirstname(e.target.value)}
          />

          <input
            type="text"
            id="Lastname"
            className="m-3 rounded-md p-1.5 border-2 border-gray-500"
            placeholder="Lastname"
            value={Lastname}
            onChange={(e) => setLastname(e.target.value)}
          />

          <input
            type="date"
            id="BirthDate"
            className="m-3 rounded-md p-1.5 border-2 border-gray-500"
            max="2024-12-31"
            value={BirthDate}
            onChange={(e) => setBirthDate(e.target.value)}
          />

          <select
            className="m-3 rounded-md p-1.5 border-2 border-gray-500"
            id="SelectGender"
            value={SelectGender}
            onChange={(e) => setSelectGender(e.target.value)}
          >
            <option value="">Select Gender</option>
            <option value="Homme">Homme</option>
            <option value="Femme">Femme</option>
            <option value="Ne pas répondre">Ne pas répondre</option>
          </select>

          <input
            type="email"
            id="Mail"
            className="m-3 rounded-md p-1.5 border-2 border-gray-500"
            placeholder="Email"
            value={Mail}
            onChange={(e) => setMail(e.target.value)}
          />

          <input
            type="password"
            id="Password"
            className="m-3 rounded-md p-1.5 border-2 border-gray-500"
            placeholder="Password"
            value={Password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <input
            type="password"
            id="ConfirmPassword"
            className="m-3 rounded-md p-1.5 border-2 border-gray-500"
            placeholder="Confirm Password"
            value={ConfirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />

          <div
            id="imageDiv"
            className="flex flex-col items-center m-3 relative"
          >
            <img
              id="image"
              ref={imageRef}
              src={imageSrc}
              alt="avatar pic"
              className="flex justify-center w-32 h-32 object-cover rounded-full"
            />

            <input
              type="file"
              accept="image/*"
              id="userFile"
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
            <label
              id="labelIcon"
              htmlFor="userFile"
              className="absolute top-2 right-14 text-white bg-customBlue w-7 h-7 flex items-center justify-center rounded-full text-lg cursor-pointer md:right-14"
            >
              <svg
                height="24px"
                viewBox="0 -960 960 960"
                width="24px"
                fill="white"
              >
                <path d="M480-260q75 0 127.5-52.5T660-440q0-75-52.5-127.5T480-620q-75 0-127.5 52.5T300-440q0 75 52.5 127.5T480-260Zm0-80q-42 0-71-29t-29-71q0-42 29-71t71-29q42 0 71 29t29 71q0 42-29 71t-71 29ZM160-120q-33 0-56.5-23.5T80-200v-480q0-33 23.5-56.5T160-760h126l74-80h240l74 80h126q33 0 56.5 23.5T880-680v480q0 33-23.5 56.5T800-120H160Zm0-80h640v-480H638l-73-80H395l-73 80H160v480Zm320-240Z" />
              </svg>
            </label>
          </div>

          <div className="mb-4" id="imageDiv">
            <label htmlFor="ProfileBanner"></label>
            <img
              className="w-full h-[12vh] cursor-pointer border-solid-black object-cover"
              src={bannerSrc}
              ref={bannerRef}
              alt="banner"
            />
            <input
              type="file"
              accept="image/*"
              id="ProfileBanner"
              className="p-1.5 text-sm mt-2"
              onChange={(event) =>
                handleFileChange(
                  event,
                  setBannerFile,
                  setBannerSrc,
                  setBannerContent,
                  bannerRef.current
                )
              }
            />
          </div>

          <button
            type="submit"
            className="ml-auto m-3 p-1 border-2 rounded-md bg-customBlue text-white w-40"
          >
            Sign up baby
          </button>
        </form>
      </div>
    </>
  );
};

export default Register;
