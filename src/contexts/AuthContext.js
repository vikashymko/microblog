import React, { createContext, useState, useEffect } from "react";
import { fetchCurrentUser } from "../api/users";

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [credentials, setCredentials] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (credentials) {
      fetchCurrentUser(credentials)
        .then((user) => {
          setCurrentUser(user);
          setLoading(false);
        })
        .catch(() => {
          setCredentials(null);
          setCurrentUser(null);
          setLoading(false);
        });
    } else {
      setCurrentUser(null);
      setLoading(false);
    }
  }, [credentials]);

  return (
    <AuthContext.Provider
      value={{
        credentials,
        setCredentials,
        currentUser,
        setCurrentUser,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
