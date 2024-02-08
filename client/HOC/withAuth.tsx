"use client";
import React, { useState } from "react";

// Props specific to authentication
export interface AuthProps {
  isLoggedIn: boolean;
  onLogin: () => void;
  onLogout: () => void;
}

// Higher Order Component (HOC) for Authentication
const withAuthentication = <P extends object>(
  WrappedComponent: React.ComponentType<P & AuthProps>
) => {
  const AuthenticatedComponent: React.FC<P> = (props) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const handleLogin = () => {
      // Simulate login logic
      setIsLoggedIn(true);
    };

    const handleLogout = () => {
      // Simulate logout logic
      setIsLoggedIn(false);
    };

    return (
      <WrappedComponent
        {...props}
        isLoggedIn={isLoggedIn}
        onLogin={handleLogin}
        onLogout={handleLogout}
      />
    );
  };

  return AuthenticatedComponent;
};

export default withAuthentication;
