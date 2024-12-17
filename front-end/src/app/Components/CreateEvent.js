"use client";

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation"; // Correct hook for dynamic routes in the app directory
import { FetchCreateEvent } from "../Utils/fetchEventRequest";

const CreateEventComponent = ({ closeModal, cookieValue, ws }) => {
  const [text, setText] = useState("");
  const [date, setDate] = useState("");
  const [title, setTitle] = useState("");
  const [publishButton, setPublishButton] = useState(false);
  const { groupId } = useParams(); // Use useParams to get dynamic route parameter

  const EventData = {
    OrganisatorId: cookieValue,
    GroupId: groupId,
    Title: title,
    Description: text,
    DateOfTheEvent: `${date.split("T")[0]} ${date.split("T")[1]}`,
  };

  useEffect(() => {
    if (text.trim() && title.trim() && date.length === 16) {
      setPublishButton(true);
    } else {
      setPublishButton(false);
    }
  }, [text, title, date]);

  const createEvent = () => {
    FetchCreateEvent(EventData);
  };

  return (
    <div className="fixed z-10 inset-0 bg-gray-600 bg-opacity-75 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-[40vw] h-auto">
        <div className="flex items-center text-center align-middle mb-4 justify-around">
          <div></div>
          <div className="flex justify-center">
            <h2 className="text-3xl font-bold">Créer un event 📆</h2>
          </div>
          <button onClick={closeModal} className="flex cursor-pointer">
            {/* <ClosePostSvg /> */}
            <img src="/svg/ClosePost.svg" alt="Sparkles icon" />
          </button>
        </div>
        <div className="flex flex-col items-center justify-center">
          <div className="flex items-start w-full mb-4">
            <input
              className="text-[#88898a] text-xl font-extrabold font-roboto"
              placeholder="Titre de l’évènement"
              onChange={(e) => setTitle(e.target.value)}
            ></input>
          </div>
          <textarea
            id="postText"
            className="bg-gray-100 flex justify-center items-center resize-none w-full h-[20vh] text-black"
            placeholder="Description de l’evenement"
            onChange={(e) => setText(e.target.value)}
          ></textarea>
          <div
            id="imageDiv"
            className="flex flex-col items-center m-3 relative"
          ></div>
        </div>
        <div className="flex justify-between mt-10">
          <input
            type="datetime-local"
            onChange={(e) => setDate(e.target.value)}
            className="flex rounded border-2 border-[#0093ff] p-1 text-black"
          />
          {publishButton && (
            <button
              id="publishButton"
              onClick={() => {
                createEvent();
                closeModal();
              }}
              className=" bg-blue-500 text-white px-4 py-2 text-lg rounded-lg"
            >
              Let&apos;s go
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CreateEventComponent;
