// Utils/fetchData.js

export const FetchUserInfo = async (cookieValue, setResultUserInfo) => {
  try {
    const response = await fetch("http://localhost:8080/getUser", {
      method: "POST",
      body: JSON.stringify({
        SessionId: cookieValue,
      }),
    });
    if (response.ok) {
      const result = await response.json();
      setResultUserInfo(result.userInfos);
    }
  } catch (error) {
    console.error("Error fetching cookie value:", error);
    return null;
  }
};

export const FetchAllUsers = async (cookieValue, setResultAllUsers) => {
  try {
    const response = await fetch("http://localhost:8080/getAllUsers", {
      method: "POST",
      body: JSON.stringify(cookieValue),
    });
    if (response.ok) {
      const result = await response.json();
      setResultAllUsers(result.Users);
    }
  } catch (error) {
    console.error("Error fetching cookie value:", error);
    return null;
  }
};

export const FetchAllGroups = async (cookieValue, setResultAllGroups) => {
  try {
    const response = await fetch("http://localhost:8080/getAllGroups", {
      method: "POST",
      body: JSON.stringify(cookieValue),
    });
    if (response.ok) {
      const result = await response.json();
      setResultAllGroups(result.Groups);
    }
  } catch (error) {
    console.error("Error fetching cookie value:", error);
    return null;
  }
};

export const FetchPosts = async (cookieValue, setSortedResultPosts) => {
  try {
    const response = await fetch("http://localhost:8080/getPost", {
      method: "POST",
      body: JSON.stringify({
        AuthorId: cookieValue,
      }),
    });
    if (response.ok) {
      const result = await response.json();
      const sortedPosts = result.Posts.sort(
        (a, b) =>
          new Date(b.CreationDate).getTime() -
          new Date(a.CreationDate).getTime()
      );
      setSortedResultPosts(sortedPosts);
    }
  } catch (error) {
    console.error("Error fetching cookie value:", error);
    return null;
  }
};

export const FetchInvitationsGroup = async (
  cookieValue,
  setGroupInvitation
) => {
  try {
    const response = await fetch("http://localhost:8080/getInvitationGroup", {
      method: "POST",
      body: JSON.stringify(cookieValue),
    });
    if (response.ok) {
      const result = await response.json();
      setGroupInvitation(result.Value);
    }
  } catch (error) {
    console.error("Error fetching cookie value:", error);
    return null;
  }
};

export const FetchGroupsJoined = async (cookieValue, setResultGroupsJoined) => {
  try {
    const response = await fetch("http://localhost:8080/getGroupsJoined", {
      method: "POST",
      body: JSON.stringify(cookieValue),
    });
    if (response.ok) {
      const result = await response.json();
      setResultGroupsJoined(result.Groups);
    }
  } catch (error) {
    console.error("Error fetching cookie value:", error);
    return null;
  }
};

export const FetchUserFollowers = async (
  cookieValue,
  userId,
  setUserFollowers
) => {
  try {
    const response = await fetch("http://localhost:8080/getFollower", {
      method: "POST",
      body: JSON.stringify({
        UserId: cookieValue,
        OtherUserId: userId,
      }),
    });
    if (response.ok) {
      const result = await response.json();
      setUserFollowers(result);
    }
  } catch (error) {
    console.error("Error fetching cookie value:", error);
    return null;
  }
};

export const FetchUserFollowed = async (
  cookieValue,
  userId,
  setUserFollowed
) => {
  try {
    const response = await fetch("http://localhost:8080/getFollowed", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        UserId: cookieValue,
        OtherUserId: userId,
      }),
    });
    if (response.ok) {
      const result = await response.json();
      setUserFollowed(result);
    }
  } catch (error) {
    console.error("Error in FetchUserProfile:", error);
  }
};

export const FetchFollowedRequest = async (
  cookieValue,
  setResultGetFollowedRequest
) => {
  try {
    const response = await fetch("http://localhost:8080/getFollowedRequest", {
      method: "POST",
      body: JSON.stringify(cookieValue),
    });
    if (response.ok) {
      const result = await response.json();
      setResultGetFollowedRequest(result.Follow);
    }
  } catch (error) {
    console.error("Error fetching cookie value:", error);
    return null;
  }
};

export const FetchFollowAndFollowed = async (
  cookieValue,
  setResultFollowAndFollowed
) => {
  try {
    const response = await fetch(
      "http://localhost:8080/getFollowerAndFollowed",
      {
        method: "POST",
        body: JSON.stringify(cookieValue),
      }
    );
    if (response.ok) {
      const result = await response.json();
      setResultFollowAndFollowed(result);
    }
  } catch (error) {
    console.error("Error fetching cookie value:", error);
    return null;
  }
};

export const FetchFollowRequest = async (
  cookieValue,
  setResultGetFollowRequest
) => {
  try {
    const response = await fetch("http://localhost:8080/getFollowRequest", {
      method: "POST",
      body: JSON.stringify(cookieValue),
    });
    if (response.ok) {
      const result = await response.json();
      setResultGetFollowRequest(result);
    }
  } catch (error) {
    console.error("Error fetching cookie value:", error);
    return null;
  }
};

export const FetchAllNotifications = async (
  cookieValue,
  setResultAllNotifications
) => {
  try {
    const response = await fetch("http://localhost:8080/getAllNotifications", {
      method: "POST",
      body: JSON.stringify(cookieValue),
    });
    if (response.ok) {
      const result = await response.json();
      setResultAllNotifications(result.Value);
    }
  } catch (error) {
    console.error("Error fetching cookie value:", error);
    return null;
  }
};
