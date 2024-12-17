export const deleteCookie = (rooter) => {
  const cookies = document.cookie.split(";");

  cookies.forEach((cookie) => {
    const key = cookie.split("=")[0];
    document.cookie = key + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC";
  });

  rooter.push("/"); // Navigate to the home page
};
