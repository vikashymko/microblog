import React, { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../hooks/UseAuth";
import { fetchUser } from "../api/users";
import { fetchUserPosts } from "../api/posts";
import User from "../components/users/User";
import CreatePost from "../components/posts/CreatePost";
import PostList from "../components/posts/PostList";
import styled from "styled-components";
import Post from "../components/posts/Post";
const ProfileContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
`;

const PostsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const ProfileLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 20px;
  grid-template-areas: 
    "user main";
`;

const MainContent = styled.div`
  width: 100%;
  grid-area: main;
`;
const UserInfo = styled.div`
  grid-area: user; /* Вказує, що це зона користувача */
`;
const ProfilePage = () => {
  const { username } = useParams();
  const { credentials } = useAuth();
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState("");

  const fetchData = useCallback(async () => {
    try {
      const [userData, postsData] = await Promise.all([
        fetchUser(username),
        fetchUserPosts(username, credentials),
      ]);
      setUser(userData);
      setPosts(postsData);
    } catch (err) {
      setError(err.message);
    }
  }, [username, credentials]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

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

  if (!user) return <div>Loading...</div>;

  return (
    <ProfileContainer>
      <ProfileLayout>
        <UserInfo>
          <User user={user} />
        </UserInfo>
        <MainContent>
          <CreatePost username={username} onPostCreated={fetchData} />
          <PostsList>
            {posts.map((post) => (
              <Post key={post.id} post={post} onLikeToggle={handleLikeToggle} />
            ))}
          </PostsList>
        </MainContent>
      </ProfileLayout>
    </ProfileContainer>
  );
};
export default ProfilePage;
