// Fetch function for cookie validation
export const FetchCookieValue = async (url, data) => {
  try {
    const response = await fetch(url, {
      method: "POST",
      body: JSON.stringify(data),
    });
    if (response.ok) {
      const result = await response.json();
      return result;
    } else {
      console.error("Error: Cookie not valid");
      return null;
    }
  } catch (error) {
    console.error("Error fetching cookie value:", error);
    return null;
  }
};
