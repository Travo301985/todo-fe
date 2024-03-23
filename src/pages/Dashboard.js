import React, { useContext, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import RiseLoader from "react-spinners/RiseLoader";
import { ActionsContext } from "../context/ActionsContext";
import { withAccessHandler } from "../hocs/_withAuthHandler";
import Navbar from "../constants/Navbar";
import TaskCard from "../constants/TaskCard";

function Dashboard() {
  // eslint-disable-next-line no-unused-vars
  const { isLoading, isAuthenticated, logout, user } = useAuth0();

  const {
    tasks,
    loading,
    navigate,
    setLoading,
    fetchUserTodos,
  } = useContext(ActionsContext);

  useEffect(() => {
    if (loading) setLoading(false);
    fetchUserTodos(JSON.parse(window.sessionStorage.getItem("user"))?.email);
    return () => {};
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-between mt-30">
        <RiseLoader color={"rgba(160, 160, 160, 0.5)"} size={8} />
      </div>
    );
  }

  return (
    <div className="px-10">
      {/* {!isAuthenticated && (
        <div className="flex items-center justify-center h-screen">
          <a
            className="flex justify-center w-20 px-4 py-1 mb-2 text-white bg-blue-500 rounded hover:bg-blue-600 focus:outline-none"
            href="/login"
            rel="noopener noreferrer"
          >
            Login
          </a>
        </div>
      )}
      {isAuthenticated && ( */}
      <div>
        <Navbar />
        <div>
          <h3 className="flex justify-between text-0.5xl font-bold mb-4">
            User Tasks{" "}
            <button
              className="flex justify-center font-medium tracking-wider w-20 px-4 py-1 m-2 text-blue-600 transparent rounded focus:outline-none"
              onClick={() => navigate("/create-todo")}
            >
              create
            </button>
          </h3>
          {!loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {tasks.map((task, index) => (
                <TaskCard key={index} task={task} />
              ))}
            </div>
          ) : (
            <div className="flex justify-between mt-30">
              <RiseLoader color={"rgba(160, 160, 160, 0.5)"} size={8} />
            </div>
          )}
        </div>
      </div>
      {/* )} */}
    </div>
  );
}

export default withAccessHandler(Dashboard);
