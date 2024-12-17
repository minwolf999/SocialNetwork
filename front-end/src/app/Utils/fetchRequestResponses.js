export const FetchAcceptJoinRequest = async (
  cookieValue,
  groupId,
  sender,
  setJoinRequest
) => {
  try {
    const response = await fetch("http://localhost:8080/acceptJoinRequest", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        UserId: cookieValue,
        GroupId: groupId,
        JoinUserId: sender.UserId,
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to fetch user profile");
    }

    setJoinRequest((prev) =>
      prev.filter(
        (group) => group.GroupId !== groupId && group.UserId !== sender.UserId
      )
    );

    return await response.json();
  } catch (error) {
    console.error("Error in FetchGroupProfile:", error);
    return null;
  }
};

export const FetchDeclineJoinRequest = async (
  cookieValue,
  groupId,
  sender,
  setJoinRequest
) => {
  try {
    const response = await fetch("http://localhost:8080/declineJoinRequest", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        UserId: cookieValue,
        GroupId: groupId,
        JoinUserId: sender.UserId,
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to fetch user profile");
    }

    setJoinRequest((prev) =>
      prev.filter(
        (group) => group.GroupId !== groupId && group.UserId !== sender.UserId
      )
    );

    return await response.json();
  } catch (error) {
    console.error("Error in FetchGroupProfile:", error);
    return null;
  }
};
