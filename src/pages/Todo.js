import { BeatLoader } from "react-spinners";
import React, { useContext, useEffect, useRef } from "react";
// import { useAuth0 } from "@auth0/auth0-react";
import { ActionsContext } from "../context/ActionsContext";
// import RiseLoader from "react-spinners/RiseLoader";
import { withAccessHandler } from "../hocs/_withAuthHandler";
import Navbar from "../constants/Navbar";
import TaskCardId from "../constants/TaskCardId";

function Todo() {
  // eslint-disable-next-line no-unused-vars
  // const { isLoading, isAuthenticated, logout, user } = useAuth0();

  const titleRef = useRef("");
  const descriptionRef = useRef("");
  const dueDateRef = useRef("");
  const completeRef = useRef("");

  const { edit, task, setEdit, loading, setLoading, updateTodo, navigate } =
    useContext(ActionsContext);

  useEffect(() => {
    if (!window.sessionStorage.getItem("user")) {
      return navigate("/login");
    }
    if (edit) setEdit(false);
    if (loading) setLoading(false);
    return () => {};
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // if (isLoading) {
  //   return (
  //     <div className="flex justify-between mt-30">
  //       <RiseLoader color={"rgba(160, 160, 160, 0.5)"} size={8} />
  //     </div>
  //   );
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
            User Task
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {<TaskCardId task={task} />}
            {edit && (
              <div className="border rounded p-4">
                <label className="block">Title</label>

                <input
                  className="border border-gray-300 w-full rounded mb-2 px-1"
                  type="text"
                  name="title"
                  defaultValue={task?.title}
                  ref={titleRef}
                />

                <label className="block">Description</label>

                <textarea
                  className="border border-gray-300 w-full rounded mb-1 px-1"
                  type="text"
                  name="description"
                  defaultValue={task?.description}
                  ref={descriptionRef}
                ></textarea>

                <label className="block">Due Date</label>

                <input
                  className="border border-gray-300 w-full rounded mb-2 px-1"
                  type="date"
                  name="due"
                  defaultValue={task?.dueDate}
                  ref={dueDateRef}
                />

                <div className="mb-2 flex justify-between align-center">
                  Complete ?{" "}
                  <input
                    type="checkbox"
                    name="complete"
                    defaultValue={task?.complete}
                    ref={completeRef}
                  />
                </div>
                <div className="flex justify-center">
                  <button
                    disabled={loading}
                    onClick={() =>
                      updateTodo(
                        titleRef.current["value"],
                        descriptionRef.current["value"],
                        dueDateRef.current["value"],
                        completeRef.current["value"]
                      )
                    }
                    className="mt-2 px-4 py-0.5 w-1/2 bg-blue-600 text-white rounded"
                  >
                    {!loading ? (
                      "Update"
                    ) : (
                      <BeatLoader color="white" size={6} />
                    )}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      {/* )} */}
    </div>
  );
}

export default withAccessHandler(Todo);
