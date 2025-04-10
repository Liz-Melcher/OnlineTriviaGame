import React, { createContext, useState, useContext, ReactNode } from 'react';
import TokenServices from './utils/TokenServices';

// Define the shape of the context value
interface AuthContextType {
  loggedIn: boolean;
  login: (token: string) => void;
  logout: () => void;
  getUsername: () => string;
}

// Create the context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Create a provider component that will manage the state
export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(TokenServices.loggedIn());

  const login = (token: string) => {
    TokenServices.store(token);
    setLoggedIn(true);
  };

  const logout = () => {
    TokenServices.destroy();
    setLoggedIn(false);
  };

  const getUsername = (): string => {
    return TokenServices.getUsername();
  }

  return (
    <AuthContext.Provider value={{ loggedIn, login, logout, getUsername }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the context
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};