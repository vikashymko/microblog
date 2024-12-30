import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import Layout from "./components/layout/Layout";
import PostsPage from "./pages/PostsPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ProfilePage from "./pages/ProfilePage";
import { Navigate } from "react-router-dom";
import SinglePostPage from "./pages/SinglePostPage";

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Navigate to="/posts" />} />
            <Route path="/posts" element={<PostsPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/users/:username" element={<ProfilePage />} />
            <Route
              path="/users/:username/posts/:postId"
              element={<SinglePostPage />}
            />
          </Routes>
        </Layout>
      </Router>
    </AuthProvider>
  );
};

export default App;
