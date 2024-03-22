import "./index.css";
import React, { lazy, Suspense } from "react";
import ReactDOM from "react-dom";
import reportWebVitals from "./reportWebVitals";
import "react-toastify/dist/ReactToastify.css";
import Auth0ProviderWithHistory from "./Auth0/Auth0Provider";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const Login = lazy(() => import("./pages/Login.js"));
const Dashboard = lazy(() => import("./pages/Dashboard.js"));
const Register = lazy(() => import("./pages/Register.js"));
const Todo = lazy(() => import("./pages/Todo.js"));

ReactDOM.render(
  <Router>
    <React.StrictMode>
      <Auth0ProviderWithHistory>
        <Routes>
          <Route path="/login" element={<Suspense fallback={<></>}><Login /></Suspense>} />
          <Route path="/register" element={<Suspense fallback={<></>}><Register /></Suspense>} />
          <Route path="/" element={<Suspense fallback={<></>}><Dashboard /></Suspense>} />
          <Route path="/todo/:id" element={<Suspense fallback={<></>}><Todo /></Suspense>} />
        </Routes>
      </Auth0ProviderWithHistory>
    </React.StrictMode>
  </Router>,
  document.getElementById("root")
);

reportWebVitals();
