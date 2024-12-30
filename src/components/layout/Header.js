import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router";
import { useAuth } from "../../hooks/UseAuth";
import styled from "styled-components";
import blogIcon from '../../img/blog.png';
const HeaderContainer = styled.header`
  background-color: #006aff;
  box-shadow: 0 1px 3px #323232;
  position: sticky;
  top: 0;
  z-index: 100;
`;

const Nav = styled.nav`
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem 1rem;;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Logo = styled.div`
  color: #ffffff;
  font-size: 1.5rem;
  font-weight: 700;
  letter-spacing: -0.5px;
  display: flex;
  align-items: center;
`;

const NavLinks = styled.div`
  display: flex;
  gap: 35px;
  align-items: center;
`;

const NavLink = styled(Link)`
  color: #ffffff;
  text-decoration: none;
  font-weight: 700;
  padding: 8px 0;
  position: relative;

  &:after {
    content: "";
    position: absolute;
    width: 0;
    height: 2px;
    bottom: 0;
    left: 0;
    background-color: #ffffff;
    transition: width 0.3s ease;
  }

  &:hover:after {
    width: 100%;
  }
`;

const NavButton = styled.button`
  background: none;
  border: none;
  color: #ffffff;
  font-weight: 700;
  font-size: 15px;
  cursor: pointer;
  padding: 8px 0;
  font-family: "Times New Roman", Times, serif;
`;

const Header = () => {
  const { currentUser, setCredentials } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    setCredentials(null);
    navigate("/login");
  };

  return (
    <HeaderContainer>
      <Nav>
      <Logo>
        ThoughtStream
        <img
          src={blogIcon}
          alt="Blog Icon"
          style={{
            width: "35px",
            height: "35px",
            marginLeft: "8px",
            objectFit: "contain",
          }}
        />
      </Logo>
        <NavLinks>
          {currentUser ? (
            <>
              <NavLink to="/posts">Posts</NavLink>
              <NavLink to={`/users/${currentUser.username}`}>Profile</NavLink>
              <NavButton onClick={handleLogout}>Logout</NavButton>
            </>
          ) : (
            <>
              <NavLink to="/login">Login</NavLink>
              <NavLink to="/register">Register</NavLink>
            </>
          )}
        </NavLinks>
      </Nav>
    </HeaderContainer>
  );
};
export default Header;
