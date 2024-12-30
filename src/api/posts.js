import { API_BASE_URL } from "./config";
import { getAuthHeader } from "./auth";

export const fetchUserPosts = async (username, credentials = null) => {
  const headers = credentials ? getAuthHeader(credentials) : {};
  const response = await fetch(`${API_BASE_URL}/users/${username}/posts`, {
    headers,
  });
  if (!response.ok) throw new Error("Failed to fetch posts");
  return response.json();
};

export const createPost = async (username, content, credentials) => {
  const response = await fetch(`${API_BASE_URL}/users/${username}/posts`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...getAuthHeader(credentials),
    },
    body: JSON.stringify({ content }),
  });
  if (!response.ok) throw new Error("Failed to create post");
  return response.json();
};

export const togglePostLike = async (
  username,
  postId,
  isLiked,
  credentials
) => {
  const method = isLiked ? "DELETE" : "PUT";
  const response = await fetch(
    `${API_BASE_URL}/users/${username}/posts/${postId}/like`,
    {
      method,
      headers: getAuthHeader(credentials),
    }
  );
  if (!response.ok) throw new Error("Failed to toggle like");
};
