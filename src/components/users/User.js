import React from "react";
import styled from "styled-components";

const UserContainer = styled.div`
  background: #ffffff;
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 20px;
  box-shadow: 0 2px 4px #000000;
  height: 150px;
`;

const UserName = styled.h2`
  margin: 0 0 10px 0;
  color:#000000;
`;

const UserInfo = styled.p`
  color: #000000;
  margin: 5px 0;
`;

const User = ({ user }) => {
  return (
    <UserContainer>
      <UserName>{user.full_name || user.username}</UserName>
      <UserInfo>@{user.username}</UserInfo>
      <UserInfo>{user.posts} posts</UserInfo>
    </UserContainer>
  );
};

export default User;
