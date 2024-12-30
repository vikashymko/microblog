import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../api/auth";
import { useAuth } from "../../hooks/UseAuth";
import styled from "styled-components";
const FormContainer = styled.div`
  max-width: 350px;
  margin: 40px auto;
  padding: 32px;
  border-radius: 10px;
  border: 1px solid #000000;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  background: #ffffff;
`;

const FormTitle = styled.h2`
  margin: 0 0 24px 0;
  color: #000000;
  font-size: 2rem;
  font-weight: 700;
  text-align: center;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

const Label = styled.label`
  color: #000000;
  font-size: 0.9rem;
  font-weight: 500;
`;

const Button = styled.button`
  padding: 12px;
  background: #006aff;
  color: #ffffff;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.3s ease;

  &:hover {
    background: #3bb7fa;
  }
`;

const Input = styled.input`
  padding: 13px;
  border: 1px solid #000000;
  border-radius: 8px;
  font-size: 1rem;
  transition: border-color 0.3s ease;

  &:focus {
    outline: none;
    border-color: #000000;
  }
`;
const ErrorMessage = styled.div`
  color: #ff0019;
  font-size: 0.9rem;
  padding: 8px;
  background: #fff5f5;
  border-radius: 6px;
  border: 1px solid #ffebeb;
`;

const LoginForm = () => {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { setCredentials } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const credentials = await loginUser(formData);
      setCredentials(credentials);
      navigate("/");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <FormContainer>
      <FormTitle>Login</FormTitle>
      {error && <ErrorMessage>{error}</ErrorMessage>}
      <Form onSubmit={handleSubmit}>
        <InputGroup>
          <Label htmlFor="username">Username</Label>
          <Input
            id="username"
            type="text"
            value={formData.username}
            onChange={(e) =>
              setFormData({ ...formData, username: e.target.value })
            }
            required
          />
        </InputGroup>
        <InputGroup>
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            value={formData.password}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
            required
          />
        </InputGroup>
        <Button type="submit">Login</Button>
      </Form>
    </FormContainer>
  );
};

export default LoginForm;
