// import { FetchCookieValue } from "./fetchCookieValue";

export const FetchUserNotifications = async (userId, cookieValue) => {
  try {
    const response = await fetch("http://localhost:8080/getUserNotification", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        UserId: cookieValue,
        OtherUserId: userId,
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to fetch user notifications");
    }

    return await response.json();
  } catch (error) {
    console.error("Error in FetchUserNotifications:", error);
    return null;
  }
};
