export const FetchGroupProfile = async (groupId, cookieValue, setGroup, setFirstEffect, router) => {
    try {
      const response = await fetch("http://localhost:8080/getGroup", {
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

        if (result.Error) {
          router.push("/home")
          return
        }

        setGroup(result.Group)
        setFirstEffect(true)
      }
    } catch (error) {
      console.error("Error in FetchGroupProfile:", error);
    }
  };

export const FetchGroupPosts = async (groupId, cookieValue, setSortedResultPosts, router) => {
    try {
      const response = await fetch("http://localhost:8080/getGroupsPosts", {
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
        
        if (result.Error) {
          router.push("/home")
          return
        }

        const sortedPosts = result.Posts?.sort(
          (a, b) =>
            new Date(b.CreationDate).getTime() - new Date(a.CreationDate).getTime()
        );
        setSortedResultPosts(sortedPosts); 
      }
    } catch (error) {
      console.error("Error in FetchGroupProfile:", error);
    }
  };