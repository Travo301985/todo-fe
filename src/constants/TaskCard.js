import React, { useContext } from "react";
import { ActionsContext } from "../context/ActionsContext";

function TaskCard({ task }) {
  const { navigate, getStatus, getStatusClass } = useContext(ActionsContext);
  return (
    <div key={task.id} className="border rounded p-4">
      <h2 className="text-l font-medium mb-2">{task.title}</h2>
      <hr className="mb-3" />
      <p className="mb-2">{task.description}</p>
      <p className={"mb-2"}>
        Status:{" "}
        <span className={`${getStatusClass(task.complete, task.dueDate)}`}>
          {getStatus(task.complete, task.dueDate)}
        </span>
      </p>
      <p className="mb-2 flex justify-between">
        <span>Due Date:</span> {task.dueDate}
      </p>
      <p className="mb-2 flex justify-between">
        <span>Created Date:</span> {task.createdDate}
      </p>
      <div className="flex justify-center">
        <button
          onClick={() => navigate(`/todo/${task.id}`)}
          className="mt-2 w-1/2 px-4 py-0.5 bg-blue-600 text-white rounded"
        >
          View Details
        </button>
      </div>
    </div>
  );
}

export default TaskCard;
