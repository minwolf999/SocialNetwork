// import { FetchCookieValue } from "./fetchCookieValue";

export const FetchGetMessage = async (userId, cookieValue, setResultMessage) => {
  try {
    const response = await fetch("http://localhost:8080/getMessage", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        SenderId: cookieValue,
        ReceiverId: userId,
      }),
    });

    if (response.ok) {
      const result = await response.json()
      setResultMessage(result.Value)
    }
  } catch (error) {
    console.error("Error in FetchGetMessage:", error);
  }
};

export const FetchGetGroupMessage = async (groupId, cookieValue, setResultMessage) => {
  try {
    const response = await fetch("http://localhost:8080/getMessage", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        SenderId: cookieValue,
        GroupId: groupId,
      }),
    });
    if (response.ok) {
      const result = await response.json()
      setResultMessage(result.Value)
    }

  } catch (error) {
    console.error("Error in FetchGetMessage:", error);
  }
};
