// import { FetchCookieValue } from "./fetchCookieValue";

export const FetchRemoveFollowed = async (cookie, followerId) => {
  try {
    const response = await fetch("http://localhost:8080/removeFollowed", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        FollowerId: cookie,
        FollowedId: followerId,
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to remove a follower");
    }

    return await response.json();
  } catch (error) {
    console.error("Error in FetchRemoveFollowed:", error);
    return null;
  }
};
