import React, { useState, useEffect, useRef } from "react";
import { HeaderPost } from "./HeaderPost";
import { PostContent } from "./PostContent";
import { handleFileChange } from "../Utils/handleFileChange.js";
const Comments = ({
  comment,
  selectedPostId = "",
  resultUserInfo,
  cookieValue,
  ws,
}) => {
  const [showCommentBox, setShowCommentBox] = useState(false);
  const [text, setText] = useState("");
  const [publishButton, setPublishButton] = useState(false);
  const [image, setImage] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [imageSrc, setImageSrc] = useState(""); // Will be the image choosen by the user in the post
  const [imageContent, setImageContent] = useState("");
  const imageRef = useRef(null); // Reference for the img element
  const [selectedPostComments, setComments] = useState([]);

  useEffect(() => {
    setComments(comment);
  }, [comment]);

  // Toggle comment box visibility
  const toggleCommentBox = () => {
    setShowCommentBox(!showCommentBox);
  };

  // Function to post a comment
  const createComment = async () => {
    const date = new Date();
    const formatedDate = `${date.getFullYear()}-${
      date.getMonth() + 1
    }-${date.getDate()}`;
    const CommentData = {
      AuthorId: cookieValue,
      Text: text,
      Image: imageContent,
      CreationDate: formatedDate,
      PostId: selectedPostId,
    };

    try {
      const response = await fetch("http://localhost:8080/createComment", {
        method: "POST",
        body: JSON.stringify(CommentData),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const result = await response.json();
      if (!result?.Success) {
        console.error("Error creating comment", result.Error);
      }
    } catch (error) {
      console.error("Error creating the comment:", error);
    }
  };

  // Update the state of the publish button based on the text content
  useEffect(() => {
    setPublishButton(text.trim() !== "");
  }, [text]);

  useEffect(() => {
    const handleWebSocketMessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        if (data.Type === "Comment" && data.PostId === selectedPostId) {
          setComments((oldComment) => [...oldComment, data.Value]);
        }
      } catch (error) {
        console.error("Error parsing WebSocket message:", error);
      }
    };

    ws.addEventListener("message", handleWebSocketMessage);
    return () => {
      ws.removeEventListener("message", handleWebSocketMessage);
    };
  }, [cookieValue, resultUserInfo, ws, selectedPostId]);

  return (
    <div className="h-screen overflow-hidden relative shadow-lg border-b">
      <div className="flex flex-col overflow-auto h-[70vh]">
        {/* Render the comments for the selected post */}
        {selectedPostComments.length > 0 ? (
          <>
            <span className="font-bold mt-4 ml-2">Commentaires</span>
            {selectedPostComments.map((comment, index) => (
              <div
                key={index}
                className="flex flex-col bg-gray-300 h-auto p-1 m-2 text-xs text-center"
              >
                <HeaderPost
                  username={comment.Username}
                  firstname={comment.FirstName}
                  lastname={comment.LastName}
                  creationdate={comment.CreationDate}
                  userId={comment.AuthorId}
                  profilePicture={comment.ProfilePicture}
                />
                <PostContent text={comment.Text} image={comment.Image} />
              </div>
            ))}
          </>
        ) : (
          <p className="text-black">No comments for the moment</p>
        )}
        <div className="flex w-auto justify-center">
          <button
            onClick={toggleCommentBox}
            className="bg-ligthBlue flex justify-center w-[10vw] rounded-lg text-white mt-3 mb-3"
          >
            Commenter
          </button>
        </div>
      </div>

      {/* Comment Box (appears from the bottom, inside the section) */}
      <div
        className={`flex flex-col absolute bottom-0 p-4 transition-transform duration-500 bg-gray-100 h-[15vh] w-full overflow-auto ${
          showCommentBox ? "translate-y-0" : "translate-y-full"
        }`}
      >
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md resize-none"
          placeholder="Ecrire un commentaire..."
        />
        <div id="imageDiv" className="flex flex-col items-center m-3 relative">
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
        {publishButton && (
          <div className="flex justify-end mt-2">
            <button
              onClick={() => {
                createComment();
                toggleCommentBox();
              }}
              className="bg-ligthBlue text-white rounded-lg p-1"
            >
              Envoyer
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Comments;
