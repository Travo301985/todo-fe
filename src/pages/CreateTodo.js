import { BeatLoader } from "react-spinners";
// import { useAuth0 } from "@auth0/auth0-react";
import { ActionsContext } from "../context/ActionsContext";
import React, { useContext, useEffect, useRef } from "react";
import { withAccessHandler } from "../hocs/_withAuthHandler";
import Navbar from "../constants/Navbar";

function CreateTodo() {
  // eslint-disable-next-line no-unused-vars
  // const { isLoading, isAuthenticated, logout, user } = useAuth0();
  const titleRef = useRef("");
  const descriptionRef = useRef("");
  const dueDateRef = useRef("");

  const { loading, setLoading, createTodo, navigate } = useContext(ActionsContext);

  useEffect(() => {
    if (!window.sessionStorage.getItem("user")) {
      return navigate("/login")
    }
    if (loading) setLoading(false);
    return () => {};
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // if (isLoading) {
  //   return <div>Loading...</div>;
  // }

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
            Create Task
          </h3>
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
              <div className="flex justify-center">
                <button
                  disabled={loading}
                  onClick={() =>
                    createTodo(
                      titleRef.current.value,
                      descriptionRef.current.value,
                      dueDateRef.current.value
                    )
                  }
                  className="mt-2 w-1/2 px-4 py-0.5 bg-blue-600 text-white rounded"
                >
                  {!loading ? "Submit" : <BeatLoader color="white" size={6} />}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* )} */}
    </div>
  );
}

export default withAccessHandler(CreateTodo);
