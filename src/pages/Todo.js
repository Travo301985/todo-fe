import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

function Todo() {
  // eslint-disable-next-line no-unused-vars
  const { isLoading, isAuthenticated, logout, user } = useAuth0();
  const [edit, setEdit] = useState(false);
  const navigate = useNavigate();
  const task = {
    id: 1,
    userId: 1,
    title: "Deploy a website",
    description: "Deploy a website on a server, AWS, or Netlify.",
    complete: false,
    dueDate: "2024-03-30",
    createdDate: "2024-03-20",
  };

  function getStatusClass(complete, dueDate) {
    const status = getStatus(complete, dueDate);
    switch (status) {
      case "COMPLETED":
        return "text-green-500";
      case "IN_PROGRESS":
        return "text-yellow-500";
      case "TODO":
        return "text-red-500";
      default:
        return "";
    }
  }

  function getStatus(complete, dueDate) {
    if (complete === true) {
      return "COMPLETED";
    } else if (complete === false) {
      if (new Date(dueDate) > new Date()) {
        return "IN_PROGRESS";
      } else {
        return "TODO";
      }
    } else {
      return "TODO";
    }
  }

  useEffect(() => {
    setEdit(false);

    return () => {};
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
          <h3 className="text-0.5xl font-bold mb-4">User Tasks</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {
              <div className="border rounded p-4">
                <h2 className="text-xl font-bold mb-2">{task?.title}</h2>
                <hr className="mb-3" />
                <p className="mb-2">{task?.description}</p>
                <p className={"mb-2"}>
                  Status:{" "}
                  <span
                    className={`${getStatusClass(
                      task?.complete,
                      task?.dueDate
                    )}`}
                  >
                    {getStatus(task?.complete, task?.dueDate)}
                  </span>
                </p>
                <p className="mb-2">Due Date: {task?.dueDate}</p>
                <p className="mb-2">Created Date: {task?.createdDate}</p>
                <div className="flex justify-between">
                  <button
                    onClick={() => navigate(`/`)}
                    className="mt-2 px-4 py-0.5 bg-red-500 text-white rounded"
                  >
                    Delete
                  </button>
                  {!edit && (
                    <button
                      onClick={() => setEdit(true)}
                      className="mt-2 px-4 py-0.5 bg-blue-500 text-white rounded"
                    >
                      Edit
                    </button>
                  )}
                </div>
              </div>
            }
            {!edit && (
              <div className="border rounded p-4">
                <label className="block">Title</label>

                <input
                  className="border border-gray-300 w-full rounded mb-2 px-1"
                  type="text"
                  name="title"
                  defaultValue={task?.title}
                />

                <label className="block">Description</label>

                <textarea
                  className="border border-gray-300 w-full rounded mb-1 px-1"
                  type="text"
                  name="description"
                  defaultValue={task?.description}
                ></textarea>

                <label className="block">Due Date</label>

                <input
                  className="border border-gray-300 w-full rounded mb-2 px-1"
                  type="date"
                  name="due"
                  defaultChecked={task?.dueDate}
                />

                <div className="mb-2 flex justify-between align-center">
                  Complete ?{" "}
                  <input
                    type="checkbox"
                    name="complete"
                    defaultValue={task?.complete}
                  />
                </div>
                <button
                  onClick={() => setEdit(true)}
                  className="mt-2 px-4 py-0.5 bg-blue-500 text-white rounded"
                >
                  Save
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
      {/* )} */}
    </div>
  );
}

export default Todo;
