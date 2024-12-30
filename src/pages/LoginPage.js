import React from "react";
import LoginForm from "../components/auth/LoginForm";
import { useAuth } from "../hooks/UseAuth";
import { useNavigate } from "react-router";
import { useEffect } from "react";
const LoginPage = () => {
  const navigate = useNavigate();
  const { credentials } = useAuth();

  useEffect(() => {
    if (credentials) {
      navigate("/posts");
    }
  }, [credentials, navigate]);

  return <LoginForm />;
};

export default LoginPage;