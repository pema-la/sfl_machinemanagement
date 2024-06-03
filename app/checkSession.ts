// Function to check the session
export function checkSession() {
  if (typeof localStorage !== "undefined") {
    const session = JSON.parse(localStorage.getItem("session"));
    if (session && session.expiresAt > Date.now()) {
      return session;
    } else {
      localStorage.removeItem("session");
    }
  }
  return null;
}
