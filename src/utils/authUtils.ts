
// This is a temporary utility for demo purposes
// In a real application, this would be replaced with proper authentication

export const mockLogin = (userName: string = "User") => {
  localStorage.setItem("isLoggedIn", "true");
  localStorage.setItem("userName", userName);
  // Trigger storage event for other tabs
  window.dispatchEvent(new Event("storage"));
};

export const mockLogout = () => {
  localStorage.removeItem("isLoggedIn");
  localStorage.removeItem("userName");
  // Trigger storage event for other tabs
  window.dispatchEvent(new Event("storage"));
};

// Helper to check login status
export const isLoggedIn = () => {
  return localStorage.getItem("isLoggedIn") === "true";
};
