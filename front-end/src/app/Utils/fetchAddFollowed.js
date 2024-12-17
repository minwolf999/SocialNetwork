// import { FetchCookieValue } from "./fetchCookieValue";

export const FetchAddFollowed = async (cookie, followedId) => {
  try {
    const response = await fetch("http://localhost:8080/addFollowed", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        FollowerId: cookie,
        FollowedId: followedId,
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to fetch user profile");
    }

    return await response.json();
  } catch (error) {
    console.error("Error in FetchAddFollowed:", error);
    return null;
  }
};
