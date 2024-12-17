// import { FetchCookieValue } from "./fetchCookieValue";

export const FetchUserProfile = async ( userId, cookieValue, setUsers) => {
  try {
    const response = await fetch("http://localhost:8080/getUser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        SessionId: cookieValue,
        OtherPeopleId: userId,
      }),
    });

    if (response.ok) {
      const result = await response.json()
      setUsers(result.userInfos);
    }
  } catch (error) {
    console.error("Error in FetchUserProfile:", error);
  }
};
