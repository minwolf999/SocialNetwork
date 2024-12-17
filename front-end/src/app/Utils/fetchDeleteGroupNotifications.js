// import { FetchCookieValue } from "./fetchCookieValue";

export const FetchDeleteGroupNotifications = async (groupId, cookieValue) => {
  try {
    const response = await fetch(
      "http://localhost:8080/deleteAllGroupNotifications",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          UserId: cookieValue,
          GroupId: groupId,
        }),
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch delete group notifications");
    }

    return await response.json();
  } catch (error) {
    console.error("Error in FetchDeleteGroupNotifications:", error);
    return null;
  }
};
