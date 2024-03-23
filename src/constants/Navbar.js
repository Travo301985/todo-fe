import React, { useContext } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { ActionsContext } from "../context/ActionsContext";

function Navbar() {
  const { navigate } = useContext(ActionsContext);
  // eslint-disable-next-line no-unused-vars
  const { user, logout } = useAuth0();
  return (
    <nav className="flex justify-between pt-2 mb-5">
      <div className="flex  items-center gap-2">
        <img
          className="w-10 h-10 rounded-full"
          src={
            user?.picture ||
            "https://dfstudio-d420.kxcdn.com/wordpress/wp-content/uploads/2019/06/digital_camera_photo-1080x675.jpg"
          }
          alt={user?.name}
        />
        <h2 className="text-center font-bold-500 text-xl">
          {user?.email ||
            JSON.parse(window.sessionStorage.getItem("user"))?.email}
        </h2>
      </div>
      <button
        className="flex justify-center w-30 px-4 py-1 m-2 text-red-500 text-s rounded hover:text-red-600 focus:outline-none"
        onClick={() => {
          // logout({ logoutParams: { returnTo: window.location.origin } });
          navigate("/login");
        }}
      >
        Log Out
      </button>
    </nav>
  );
}

export default Navbar;
