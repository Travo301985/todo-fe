import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

function Dashboard() {
  // eslint-disable-next-line no-unused-vars
  const { isLoading, isAuthenticated, logout, user } = useAuth0();
  const navigate = useNavigate();
  const tasks = [
    {
      id: 1,
      userId: 1,
      title: "Deploy a website",
      description: "Deploy a website on a server, AWS, or Netlify.",
      complete: false,
      dueDate: "2024-03-30",
      createdDate: "2024-03-20",
    },
    {
      id: 2,
      userId: 1,
      title: "Test a website",
      description: "Test a website on different devices",
      complete: true,
      dueDate: "2024-04-05",
      createdDate: "2024-03-22",
    },
    {
      id: 3,
      userId: 2,
      title: "Design a website",
      description: "Design a website using Figma or Adobe XD",
      complete: null,
      dueDate: "2024-03-25",
      createdDate: "2024-03-18",
    },
    {
      id: 4,
      userId: 3,
      title: "Mobile App Development",
      description: "Develop a mobile app using React Native or Flutter",
      complete: false,
      dueDate: "2024-04-10",
      createdDate: "2024-03-24",
    },
    {
      id: 5,
      userId: 2,
      title: "Web App Development",
      description: "App Development using React or Angular",
      complete: false,
      dueDate: "2024-03-28",
      createdDate: "2024-03-19",
    },
  ];

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
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {tasks.map((task) => (
              <div key={task.id} className="border rounded p-4">
                <h2 className="text-xl font-bold mb-2">{task.title}</h2>
                <hr className="mb-3" />
                <p className="mb-2">{task.description}</p>
                <p className={"mb-2"}>
                  Status:{" "}
                  <span
                    className={`${getStatusClass(task.complete, task.dueDate)}`}
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
        </div>
      </div>
      {/* )} */}
    </div>
  );
}

export default Dashboard;
