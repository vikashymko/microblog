import { API_BASE_URL } from "./config";

export const getAuthHeader = (credentials) => ({
  Authorization: `Basic ${btoa(
    `${credentials.username}:${credentials.password}`
  )}`,
});

export const loginUser = async (credentials) => {
  const response = await fetch(`${API_BASE_URL}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...getAuthHeader(credentials),
    },
    body: JSON.stringify(credentials),
  });

  if (!response.ok) throw new Error("Invalid credentials");
  return credentials;
};

export const registerUser = async (userData) => {
  const response = await fetch(`${API_BASE_URL}/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userData),
  });

  if (!response.ok) {
    const data = await response.json();
    throw new Error(data.detail || "Registration failed");
  }
  return response.json();
};
