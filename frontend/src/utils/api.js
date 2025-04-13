export async function loginUser(email, password) {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password })
    });
  
    const data = await response.json();
    if (!response.ok) throw new Error(data.error || "Login failed");
  
    return data.token; // assuming server sends back { token }
  }
  
  export async function registerUser(email, password, name) {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password, name })
    });
  
    const data = await response.json();
    if (!response.ok) throw new Error(data.error || "Registration failed");
  
    return data.token;
  }
  