import { BeatLoader } from "react-spinners";
import { useNavigate } from "react-router-dom";
import React, { useEffect, useRef, useState } from "react";
import { MdVisibility, MdVisibilityOff } from "react-icons/md";
import { useAuth0 } from "@auth0/auth0-react";
import { toast, ToastContainer } from "react-toastify";

function Login() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const [passVisibility, setPassVisibility] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [userDetails, setUserDetails] = useState({ email: "", password: "" });
  const { loginWithRedirect } = useAuth0();

  const loginUser = (email, password) => {
    if (!email || !password) {
      return toast.error("Please fill in all the fields");
    }
    setLoading(true);
    try {
      setUserDetails({ email, password });
      window.sessionStorage.setItem("user", JSON.stringify(userDetails));
      setLoading(false);
      toast.success("Login Successful");
      return navigate("/");
    } catch (error) {
      return toast.error(error.message);
    }
  };

  useEffect(() => {
    window.sessionStorage.removeItem("user");
    if (loading) {
      setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="flex items-center justify-center h-screen">
      <form
        className="w-80 p-4 bg-white shadow rounded"
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <div>
          <h5 className="text-xl font-bold mb-4 text-center">Login</h5>
          <label className="block mb-2">Email</label>
          <input
            type="text"
            name="email"
            ref={emailRef}
            className="w-full mb-2 px-2 py-1 border border-gray-300 rounded"
          />
          <label className="flex justify-between block mb-2">
            Password
            <div>
              {!passVisibility ? (
                <MdVisibility
                  className="inline-block ml-2 cursor-pointer"
                  onClick={() => setPassVisibility(true)}
                />
              ) : (
                <MdVisibilityOff
                  className="inline-block ml-2 cursor-pointer"
                  onClick={() => setPassVisibility(false)}
                />
              )}
            </div>
          </label>
          <input
            type={passVisibility ? "text" : "password"}
            name="password"
            ref={passwordRef}
            className="w-full mb-2 px-2 py-1 border border-gray-300 rounded"
          />
          <div className="text-sm mb-4">
            <span
              className="text-blue-500 cursor-pointer"
              onClick={() => navigate("/register")}
            >
              Register
            </span>
          </div>
          <button
            disabled={loading}
            onClick={() =>
              loginUser(emailRef.current.value, passwordRef.current.value)
            }
            className="w-full px-4 py-1 mb-2 text-white bg-blue-500 rounded hover:bg-blue-600 focus:outline-none"
          >
            {!loading ? "Proceed" : <BeatLoader color="white" size={6} />}
          </button>
          <p className="text-center mb-2">or</p>
          <button
            onClick={loginWithRedirect}
            className="w-full px-4 py-1 text-white bg-blue-500 rounded hover:bg-blue-600 focus:outline-none"
          >
            Login with Auth0
          </button>
        </div>
      </form>
      <ToastContainer
        position="bottom-left"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
}

export default Login;
