import React from "react";
import useAuthUser from "../hook/useAuthUser";
import { Link, useLocation } from "react-router";
import useLogout from "../hook/useLogout";
import { BellIcon, LogOutIcon, ShipWheelIcon } from "lucide-react";
import ThemeSelector from "./ThemeSelector";

const NavBar = () => {
  const { authUser } = useAuthUser();
  const location = useLocation();
  const isChatPage = location.pathname.startsWith("/chat");
  const { logoutMutation, isSuccess } = useLogout();
  return (
    <nav className="bg-base-200 border-b border-base-300 sticky top-0 z-30 h-16 flex items-center">
      <div className="container max-auto px-4 sm:px-6 lg:px-8">
        <div className={`flex items-center ${!isChatPage? "justify-end" : "justify-between" } w-full`}>
          {/* LOGO ONLY IF ON CHAT PAGE */}
          {isChatPage && (
            <div className="pl-5">
              <Link to="/" className="flex items-center gap-2.5">
                <ShipWheelIcon className="size-9 text-primary" />
                <span className="text-3xl font-bold font-mono bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary tracking-wider">
                  Streamify
                </span>
              </Link>
            </div>
          )}
          <div className="flex items-center justify-evenly ">
            <div className="flex items-center gap-3 sm:gap-4">
            <Link to="/notifications">
              <button className="btn btn-ghost btn-circle">
                <BellIcon className="h-6 w-6 text-base-content opacity-70" />
              </button>
            </Link>
          </div>
          {/* TODO */}
          <ThemeSelector/>
          <div className="avatar">
            <div className="w-9 rounded-full">
              <img src={authUser?.profilePic} alt="User Avatar" rel ="noreferrer"/>
            </div>
          </div>
          <button className="btn btn-ghost btn-circle" onClick={logoutMutation} >
            <LogOutIcon className="size-6 text-base-content opacity-70"/>
          </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
