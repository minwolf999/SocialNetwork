// import { FetchCookieValue } from "./fetchCookieValue";

export const FetchUnfollow = async (cookie, followerId) => {
  try {
    const response = await fetch("http://localhost:8080/removeFollower", {
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
      throw new Error("Failed to unfollow the user");
    }

    return await response.json();
  } catch (error) {
    console.error("Error in FetchUnfollow:", error);
    return null;
  }
};
