import "./index.css";
import React, { lazy, Suspense } from "react";
import ReactDOM from "react-dom";
import reportWebVitals from "./reportWebVitals";
import "react-toastify/dist/ReactToastify.css";
import Auth0ProviderWithHistory from "./Auth0/Auth0Provider";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Loading from "./pages/components/Loading.js";
import { QueryClient, QueryClientProvider } from "react-query";

const Login = lazy(() => import("./pages/Login.js"));
const Dashboard = lazy(() => import("./pages/Dashboard.js"));
const Register = lazy(() => import("./pages/Register.js"));
const Todo = lazy(() => import("./pages/Todo.js"));
const CreateTodo = lazy(() => import("./pages/CreateTodo.js"));

const queryClient = new QueryClient();

ReactDOM.render(
  <Router>
    <React.StrictMode>
      <Auth0ProviderWithHistory>
        <QueryClientProvider client={queryClient}>
          <Routes>
            <Route
              path="/login"
              element={
                <Suspense fallback={<Loading />}>
                  <Login />
                </Suspense>
              }
            />
            <Route
              path="/register"
              element={
                <Suspense fallback={<Loading />}>
                  <Register />
                </Suspense>
              }
            />
            <Route
              path="/"
              element={
                <Suspense fallback={<Loading />}>
                  <Dashboard />
                </Suspense>
              }
            />
            <Route
              path="/todo/:id"
              element={
                <Suspense fallback={<Loading />}>
                  <Todo />
                </Suspense>
              }
            />
            <Route
              path="/create-todo"
              element={
                <Suspense fallback={<Loading />}>
                  <CreateTodo />
                </Suspense>
              }
            />
          </Routes>
        </QueryClientProvider>
      </Auth0ProviderWithHistory>
    </React.StrictMode>
  </Router>,
  document.getElementById("root")
);

reportWebVitals();
