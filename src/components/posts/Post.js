import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/UseAuth";
import { togglePostLike } from "../../api/posts";
import styled from "styled-components";
import { formatDate } from "../../utils/formatDate";

const PostContainer = styled.div`
  background: #ffffff;
  border-radius: 12px;
  padding: 24px;
  margin-bottom: 24px;
  box-shadow: 0 2px 4px #000000;
  transition: transform 0.2s ease;

  &:hover {
    transform: translateY(-2px);
  }
`;

const PostHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
`;

const AuthorLink = styled(Link)`
  color: #000000;
  text-decoration: none;
  font-weight: 600;
  font-size: 1.1rem;

  &:hover {
    color: #006aff;
  }
`;

const PostDate = styled.span`
  color: #000000;
  font-size: 0.9rem;
`;

const PostContent = styled.div`
  color:rgb(0, 0, 0);
  line-height: 1.6;
  margin: 0 0 16px 0;
  font-size: 1rem;
  cursor: pointer;
`;

const LikeButton = styled.button`
  background: none;
  border: none;
  color: ${(props) => (props.isLiked ? "#e0245e" : "#666")};
  font-size: 1rem;
  padding: 8px 12px;
  border-radius: 20px;
  display: flex;
  align-items: center;
  gap: 6px;
  transition: all 0.2s ease;

  &:hover:not(:disabled) {
    background: ${(props) => (props.isLiked ? "#ffebf0" : "#f5f5f5")};
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;
const PostLink = styled(Link)`
  text-decoration: none;
  color: inherit;

  &:hover {
    text-decoration: none;
  }
`;

const Post = ({ post, onLikeToggle }) => {
  const { credentials } = useAuth();
  const navigate = useNavigate();

  const handleLike = async (e) => {
    e.stopPropagation();
    if (!credentials) return;

    try {
      await togglePostLike(
        post.author.username,
        post.id,
        post.is_liked,
        credentials
      );
      onLikeToggle(post.id);
    } catch (err) {
      console.error("Failed to toggle like:", err);
    }
  };

  const handlePostClick = () => {
    navigate(`/users/${post.author.username}/posts/${post.id}`);
  };

  return (
    <PostContainer>
      <PostHeader>
        <AuthorLink to={`/users/${post.author.username}`}>
          {post.author.full_name || post.author.username}
        </AuthorLink>
        <PostDate>{formatDate(post.created_at)}</PostDate>
      </PostHeader>
      <PostContent onClick={handlePostClick}>{post.content}</PostContent>
      <LikeButton
        onClick={handleLike}
        disabled={!credentials}
        isLiked={post.is_liked}
      >
        {post.is_liked ? "❤️" : "🤍"} {post.likes}
      </LikeButton>
    </PostContainer>
  );
};

export default Post;
