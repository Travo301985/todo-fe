import React, { useContext, useEffect, useRef } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { ActionsContext } from "../context/ActionsContext";
import { withAccessHandler } from "../hocs/_withAuthHandler";

function CreateTodo() {
  // eslint-disable-next-line no-unused-vars
  const { isLoading, isAuthenticated, logout, user } = useAuth0();
  const titleRef = useRef("");
  const descriptionRef = useRef("");
  const dueDateRef = useRef("");

  const {
    loading,
    navigate,
    setLoading,
    createTodo,
  } = useContext(ActionsContext);

  useEffect(() => {
    if (loading) setLoading(false);
    return () => {};
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
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
          <h3 className="text-0.5xl font-bold mb-4">Create Tasks</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            <div className="border rounded p-4">
              <p className="mb-2">
                <label className="block">Title</label>
                <input
                  className="border border-gray-300 w-full rounded mb-2 px-1"
                  type="text"
                  name="title"
                  ref={titleRef}
                />
              </p>
              <label className="block">Description</label>
              <p className="mb-2">
                <textarea
                  ref={descriptionRef}
                  className="border border-gray-300 w-full rounded mb-2 px-1"
                  type="text"
                  name="description"
                ></textarea>
              </p>
              <label className="block">Due Date</label>
              <p className="mb-2">
                <input
                  className="border border-gray-300 w-full rounded mb-2 px-1"
                  type="date"
                  name="due"
                  ref={dueDateRef}
                />
              </p>
              <button
                onClick={() =>
                  createTodo(
                    titleRef.current.value,
                    descriptionRef.current.value,
                    dueDateRef.current.value
                  )
                }
                className="mt-2 px-4 py-0.5 bg-blue-500 text-white rounded"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* )} */}
    </div>
  );
}

export default withAccessHandler(CreateTodo);
