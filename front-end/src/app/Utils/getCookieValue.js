export const isBrowser = () =>
  typeof window !== "undefined" && typeof document !== "undefined";

// Helper to get the cookie value
export const GetCookieValue = () => {
  if (isBrowser()) {
    const cookies = document.cookie.split(";");
    for (let cookie of cookies) {
      cookie = cookie.trim();
      if (cookie.startsWith("sessionId=")) {
        return cookie.substring("sessionId=".length);
      }
    }
  }
  return null;
};
