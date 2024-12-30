import { API_BASE_URL } from "./config";
import { getAuthHeader } from "./auth";

export const fetchUser = async (username) => {
  const response = await fetch(`${API_BASE_URL}/users/${username}`);
  if (!response.ok) throw new Error("User not found");
  return response.json();
};

export const fetchCurrentUser = async (credentials) => {
  const response = await fetch(`${API_BASE_URL}/me`, {
    headers: getAuthHeader(credentials),
  });
  if (!response.ok) throw new Error("Failed to fetch user");
  return response.json();
};
