import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../hooks/UseAuth";
import Post from "../components/posts/Post";
import styled from "styled-components";
import { API_BASE_URL } from "../api/config";

const SinglePostContainer = styled.div`
  max-width: 800px;
  margin: 40px auto;
  padding: 20px;
`;

const SinglePostPage = () => {
  const { username, postId } = useParams();
  const { credentials } = useAuth();
  const [post, setPost] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await fetch(
          `${API_BASE_URL}/users/${username}/posts/${postId}`,
          {
            headers: credentials
              ? {
                  Authorization: `Basic ${btoa(
                    `${credentials.username}:${credentials.password}`
                  )}`,
                }
              : {},
          }
        );

        if (!response.ok) {
          throw new Error("Post not found");
        }

        const data = await response.json();
        setPost(data);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchPost();
  }, [username, postId, credentials]);

  const handleLikeToggle = (postId) => {
    setPost((prevPost) => ({
      ...prevPost,
      is_liked: !prevPost.is_liked,
      likes: prevPost.is_liked ? prevPost.likes - 1 : prevPost.likes + 1,
    }));
  };

  if (error) {
    return (
      <SinglePostContainer>
        <p style={{ color: "red" }}>{error}</p>
      </SinglePostContainer>
    );
  }

  if (!post) {
    return (
      <SinglePostContainer>
        <p>Loading...</p>
      </SinglePostContainer>
    );
  }

  return (
    <SinglePostContainer>
      <Post post={post} onLikeToggle={handleLikeToggle} />
    </SinglePostContainer>
  );
};

export default SinglePostPage;
