const API_URL = "http://localhost:5000/api/auth";

export const registerUser = async (data) => {
  const response = await fetch(`${API_URL}/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return response.json();
};

export const loginUser = async (data) => {
  const response = await fetch(`${API_URL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
    credentials: "include",
  });
  return response.json();
};

export const logoutUser = async () => {
  await fetch(`${API_URL}/logout`, { method: "GET", credentials: "include" });
};
