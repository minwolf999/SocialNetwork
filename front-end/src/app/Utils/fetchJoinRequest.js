export const FetchJoinRequest = async (groupId, cookieValue, setJoinRequest) => {
    try {
      const response = await fetch("http://localhost:8080/getJoinRequest", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          UserId: cookieValue,
          GroupId: groupId,
        }),
      });
      if (response.ok) {
        const result = await response.json()
        if (result.Value != null) {
          setJoinRequest(result.Value);
        }
      }
    } catch (error) {
      console.error("Error in FetchGroupProfile:", error);
    }
  };