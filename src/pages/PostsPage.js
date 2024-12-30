import React from "react";
import { useAuth } from "../hooks/UseAuth";
import styled from "styled-components";
import { useState, useEffect } from "react";
import { API_BASE_URL } from "../api/config";
import Post from "../components/posts/Post";
const PageContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
`;

const PostsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  width: 100%;
`;

const PostsPage = () => {
  const [posts, setPosts] = useState([]);
  const { credentials } = useAuth();
  const handleLikeToggle = (postId) => {
    setPosts(
      posts.map((post) => {
        if (post.id === postId) {
          return {
            ...post,
            is_liked: !post.is_liked,
            likes: post.is_liked ? post.likes - 1 : post.likes + 1,
          };
        }
        return post;
      })
    );
  };
  useEffect(() => {
    const fetchAllPosts = async () => {
      try {
        const testUsers = ["user_1", "user_2", "user_3"];

        const allPosts = await Promise.all(
          testUsers.map(async (username) => {
            try {
              const response = await fetch(
                `${API_BASE_URL}/users/${username}/posts`,
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
              if (!response.ok) return [];
              return response.json();
            } catch (err) {
              console.error(`Failed to fetch posts for ${username}:`, err);
              return [];
            }
          })
        );

        const combinedPosts = allPosts
          .flat()
          .sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

        setPosts(combinedPosts);
      } catch (error) {
        console.error("Failed to fetch posts:", error);
      }
    };

    fetchAllPosts();
  }, [credentials]);

  return (
    <PageContainer>
      <PostsGrid>
        {posts.map((post) => (
          <Post key={post.id} post={post} onLikeToggle={handleLikeToggle} />
        ))}
      </PostsGrid>
    </PageContainer>
  );
};
export default PostsPage;