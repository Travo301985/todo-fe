import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

function Dashboard() {
  const { isLoading, isAuthenticated, logout, user } = useAuth0();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {!isAuthenticated && (
        <a href="/login" rel="noopener noreferrer">
          Todo
        </a>
      )}
      {isAuthenticated && (
        <div>
          <button
            onClick={() =>
              logout({ logoutParams: { returnTo: window.location.origin } })
            }
          >
            Log Out
          </button>
          <div>
            <div>
              <img src={user.picture} alt={user.name} />
              <h2>{user.name}</h2>
              <p>{user.email}</p>
            </div>
            <a href="/todo/1" rel="noopener noreferrer">
              Todo
            </a>
          </div>
        </div>
      )}
    </div>
  );
}

export default Dashboard;
