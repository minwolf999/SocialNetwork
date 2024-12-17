export const FetchLeaveGroup = async (groupId, cookieValue) => {
  try {
    const response = await fetch("http://localhost:8080/leaveGroup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        UserId: cookieValue,
        GroupId: groupId,
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to fetch user profile");
    }

    return await response.json();
  } catch (error) {
    console.error("Error in FetchLeaveGroup:", error);
    return null;
  }
};

export const FetchJoinGroup = async (groupId, cookieValue) => {
  try {
    const response = await fetch("http://localhost:8080/joinGroup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        UserId: cookieValue,
        GroupId: groupId,
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to fetch user profile");
    }

    return await response.json();
  } catch (error) {
    console.error("Error in FetchLeaveGroup:", error);
    return null;
  }
};

export const FetchSendJoinRequest = async (
  groupId,
  cookieValue,
  setSendRequest
) => {
  try {
    const response = await fetch("http://localhost:8080/getSendJoinRequest", {
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
      const result = await response.json();
      if (result.Value !== null) {
        setSendRequest(true);
      }
    }
  } catch (error) {
    console.error("Error in FetchSendJoinRequest:", error);
  }
};

export const FetchInviteGroup = async (
  cookieValue,
  groupId,
  userReceiverId
) => {
  try {
    const response = await fetch("http://localhost:8080/inviteGroup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        SenderId: cookieValue,
        GroupId: groupId,
        ReceiverId: userReceiverId,
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to fetch send join request");
    }

    return await response.json();
  } catch (error) {
    console.error("Error in FetchSendJoinRequest:", error);
    return null;
  }
};

export const FetchInvitationUserInGroup = async (
  cookieValue,
  groupId,
  setInvitationUserInGroup,
  setInvitationGet
) => {
  try {
    const response = await fetch(
      "http://localhost:8080/getInvitationUserInGroup",
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

    if (response.ok) {
      const result = await response.json();
      if (result.Value != null) {
        // Extract all ReceiverIds into a comma-separated string
        const receiverIds = result.Value.map((item) => item.ReceiverId).join(
          " | "
        );
        // Push the string into the invitationUserInGroup array
        setInvitationUserInGroup(receiverIds);
      }
      setInvitationGet(true);
    }
  } catch (error) {
    console.error("Error in FetchSendJoinRequest:", error);
  }
};

export const FetchCreateGroup = async (createGroupForm) => {
  try {
    const response = await fetch("http://localhost:8080/createGroup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(createGroupForm),
    });

    if (!response.ok) {
      throw new Error("Failed to fetch send join request");
    }

    return await response.json();
  } catch (error) {
    console.error("Error in FetchSendJoinRequest:", error);
    return null;
  }
};

export const FetchGroupEvent = async (groupId, cookieValue, setGroupEvent) => {
  try {
    const response = await fetch("http://localhost:8080/getAllGroupEvents", {
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
      const result = await response.json();
      if (result.Value !== null) {
        setGroupEvent(result.Value);
      }
    }
  } catch (error) {
    console.error("Error in FetchSendJoinRequest:", error);
  }
};
