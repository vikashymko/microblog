import React from "react";
import Post from "./Post";
import styled from "styled-components";
const PostsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
  width: 100%;
`;

const PostList = ({ posts, onLikeToggle }) => {
  return (
    <PostsGrid>
      {posts.map((post) => (
        <Post key={post.id} post={post} onLikeToggle={onLikeToggle} />
      ))}
    </PostsGrid>
  );
};

export default PostList;
