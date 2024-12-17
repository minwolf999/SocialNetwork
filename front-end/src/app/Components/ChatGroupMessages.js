"use client";

import React, { useState, useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import { FetchCookieValue } from "../Utils/fetchCookieValue.js";
import { FetchGetGroupMessage } from "../Utils/fetchGetMessage.js";

const ChatGroupComponent = ({ resultUserInfoID, groupId, cookieValue, ws }) => {
  const [text, setText] = useState(""); // Test emojis
  const [showEmojiPicker, setShowEmojiPicker] = useState(false); // Show/hide emoji picker
  const EmojiPicker = dynamic(() => import("emoji-picker-react"), {
    ssr: false,
  });

  const [resultMessage, setResultMessage] = useState([]);

  const chatRef = useRef(null); // This will be used to load the bottom of the chat

  useEffect(() => {
    FetchGetGroupMessage(groupId, cookieValue, setResultMessage);
  }, [groupId, cookieValue]);

  // Handle emoji click to display the picker
  const handleEmojiClick = (emojiObject) => {
    setText((prev) => prev + emojiObject.emoji);
  };

  const SendMessage = async () => {
    const date = new Date();
    let formatedDate = date.toISOString().slice(0, 19).replace("T", " ");
    const message = {
      SenderId: cookieValue,
      Message: text,
      Image: "",
      CreationDate: formatedDate,
      GroupId: groupId,
    };

    const result = await FetchCookieValue(
      "http://localhost:8080/addMessage",
      message
    );
    if (!result.hasOwnProperty("Success")) {
      console.error("Error creating post");
    }
    setText("");
  };

  // This useEffect displays the bottom of the chat so the user can see the last messages sent directly
  useEffect(() => {
    const chat = chatRef.current;
    if (chat) {
      chat.scrollTop = chat.scrollHeight; // Scroll to the bottom
    }
  }, [resultMessage]); // Re-run effect when `resultMessage` changes

  useEffect(() => {
    const handleWebSocketMessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        if (data.Type === "Group Chat") {
          if (resultMessage && resultMessage.length > 0) {
            setResultMessage((prev) => [...prev, data.Value]);
          } else {
            setResultMessage([data.Value]);
          }
        }
      } catch (error) {
        console.error("Error parsing WebSocket message:", error);
      }
    };

    ws.addEventListener("message", handleWebSocketMessage);
    return () => {
      ws.removeEventListener("message", handleWebSocketMessage);
    };
  }, [cookieValue, groupId, resultMessage, ws]);

  return (
    <div className="flex flex-col h-screen">
      <div
        ref={chatRef}
        id="chat"
        className="bg-white h-[95%] overflow-auto flex flex-col hide-scrollbar pb-5"
      >
        {resultMessage && resultMessage.length > 0 ? (
          resultMessage.map((message) =>
            message.SenderId === resultUserInfoID ? (
              <div
                key={message.Id}
                className="flex flex-col items-end justify-end mt-4"
              >
                <span className="flex mr-4">
                  {message.Sender_Name} le {message.CreationDate}
                </span>
                <div className="flex items-end justify-end space-x-2">
                  <div className="bg-ligthBlue px-4 py-2 rounded-lg rounded-br-none">
                    <span className="flex text-white justify-end">
                      {message.Message}
                    </span>
                  </div>
                </div>
              </div>
            ) : (
              <div
                key={message.Id}
                className="flex flex-col items-start justify-start mt-4"
              >
                <span className="flex ml-4 text-black">
                  {message.Sender_Name} le {message.CreationDate}
                </span>
                <div className="flex items-start space-x-2">
                  <div className="bg-gray-300 text-gray-800 px-4 py-2 rounded-lg rounded-bl-none">
                    <span className="flex justify-start ">
                      {message.Message}
                    </span>
                  </div>
                </div>
              </div>
            )
          )
        ) : (
          <span>Envoyer un message </span>
        )}
      </div>
      <div className="flex justify-center mb-2">
        <div className="flex w-[95%] justify-evenly bg-customBlue rounded-full shadow-lg p-2 h-11">
          <textarea
            className="flex w-[70%] resize-none text-lg rounded pl-2"
            placeholder="Envoyer un message..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          ></textarea>

          {/* Emoji Picker Icon */}
          <button
            onClick={() => setShowEmojiPicker((prev) => !prev)}
            className="ml-2 text-2xl "
            aria-label="Add Emoji"
          >
            😄
          </button>

          {/* Emoji Picker */}
          {showEmojiPicker && (
            <div className="absolute bottom-14 right-[30rem] z-50">
              <EmojiPicker onEmojiClick={handleEmojiClick} />
            </div>
          )}

          {/* Send Button */}
          <button
            onClick={SendMessage}
            className="w-auto bg-white rounded-lg justify-center items-center text-customBlue text-base font-normal font-roboto p-1"
          >
            Envoyer
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatGroupComponent;
