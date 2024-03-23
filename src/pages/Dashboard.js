import React, { useContext, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import RiseLoader from "react-spinners/RiseLoader";
import { ActionsContext } from "../context/ActionsContext";
import { withAccessHandler } from "../hocs/_withAuthHandler";

function Dashboard() {
  // eslint-disable-next-line no-unused-vars
  const { isLoading, isAuthenticated, logout, user } = useAuth0();

  const {
    tasks,
    loading,
    navigate,
    getStatus,
    setLoading,
    fetchUserTodos,
    getStatusClass,
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
        <div className="flex justify-end">
          <button
            className="flex justify-center w-30 px-4 py-1 m-2 text-white bg-red-500 rounded hover:bg-red-600 focus:outline-none"
            onClick={() =>
              // logout({ logoutParams: { returnTo: window.location.origin } })
              navigate("/login")
            }
          >
            Log Out
          </button>
        </div>
        <div>
          <div>
            <img src={user?.picture} alt={user?.name} />
            <h2 className="text-center font-bold-500 text-xl">
              Email:{" "}
              {user?.email ||
                JSON.parse(window.sessionStorage.getItem("user"))?.email}
            </h2>
          </div>
          <h3 className="flex justify-between text-0.5xl font-bold mb-4">
            User Tasks{" "}
            <button
              className="flex justify-center w-20 px-4 py-1 m-2 text-blue-600 transparent rounded focus:outline-none"
              onClick={() =>
                // logout({ logoutParams: { returnTo: window.location.origin } })
                navigate("/create-todo")
              }
            >
              create
            </button>
          </h3>
          {!loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {tasks.map((task) => (
                <div key={task.id} className="border rounded p-4">
                  <h2 className="text-xl font-bold mb-2">{task.title}</h2>
                  <hr className="mb-3" />
                  <p className="mb-2">{task.description}</p>
                  <p className={"mb-2"}>
                    Status:{" "}
                    <span
                      className={`${getStatusClass(
                        task.complete,
                        task.dueDate
                      )}`}
                    >
                      {getStatus(task.complete, task.dueDate)}
                    </span>
                  </p>
                  <p className="mb-2">Due Date: {task.dueDate}</p>
                  <p className="mb-2">Created Date: {task.createdDate}</p>
                  <button
                    onClick={() => navigate(`/todo/${task.id}`)}
                    className="mt-2 px-4 py-0.5 bg-blue-500 text-white rounded"
                  >
                    View Details
                  </button>
                </div>
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
