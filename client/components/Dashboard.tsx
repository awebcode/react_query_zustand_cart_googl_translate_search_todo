"use client";
import withAuthentication, { AuthProps } from "@/HOC/withAuth";
import React from "react";

// Props specific to the Dashboard
interface DashboardProps extends AuthProps {}

// Example Component
const Dashboard: React.FC<DashboardProps> = ({ isLoggedIn, onLogin, onLogout }) => {
  return (
    <div className="container mx-auto p-6 text-white">
      {isLoggedIn ? (
        <div>
          <h2 className="text-4xl text-green-500">Welcome to the Dashboard!</h2>
          <button onClick={onLogout}>Logout</button>
        </div>
      ) : (
        <div>
          <p>Please log in to access the Dashboard.</p>
          <button onClick={onLogin}>Login</button>
        </div>
      )}
    </div>
  );
};

export default withAuthentication(Dashboard);
