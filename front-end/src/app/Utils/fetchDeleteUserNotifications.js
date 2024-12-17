// import { FetchCookieValue } from "./fetchCookieValue";

export const FetchDeleteUserNotifications = async (userId, cookieValue) => {
  try {
    const response = await fetch(
      "http://localhost:8080/deleteAllUserNotifications",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          UserId: cookieValue,
          OtherUserId: userId,
        }),
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch delete user notifications");
    }

    return await response.json();
  } catch (error) {
    console.error("Error in FetchDeleteUserNotifications:", error);
    return null;
  }
};
