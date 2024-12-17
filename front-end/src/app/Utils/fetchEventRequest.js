export const FetchDeclineEvent = async (cookieValue, event) => {
    try {
      const response = await fetch("http://localhost:8080/declineEvent", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          UserId: cookieValue,
          EventId: event.Id,
        }),
      });
      if (response.ok) {

      }

    } catch (error) {
      console.error("Error in FetchDeclineEvent:", error);
    }
  };

export const FetchJoinEvent = async (cookieValue, groupId) => {
    try {
      const response = await fetch("http://localhost:8080/joinEvent", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          UserId: cookieValue,
          EventId: groupId,
        }),
      });
      if (!response.ok) {
        throw new Error("Failed to fetch send join request");
      }
  
      return await response.json();
    } catch (error) {
      console.error("Error in FetchJoinEvent:", error);
      return null;
    }
  };

export const FetchCreateEvent = async (EventData) => {
    try {
      const response = await fetch("http://localhost:8080/createEvent", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(EventData),
      });
      if (!response.ok) {
        throw new Error("Failed to fetch send join request");
      }
  
      return await response.json();
    } catch (error) {
      console.error("Error in FetchCreateEvent:", error);
      return null;
    }
  };