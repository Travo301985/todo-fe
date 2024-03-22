import "./index.css";
import Dashboard from "./Dashboard";
import React from "react";
import Todo from "./pages/Todo";
import ReactDOM from "react-dom";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

ReactDOM.render(
  <Router>
    <React.StrictMode>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/todo/:id" element={<Todo />} />
      </Routes>
    </React.StrictMode>
  </Router>,
  document.getElementById("root")
);

reportWebVitals();