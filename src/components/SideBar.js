import React from "react";
import { NavLink, useLocation } from "react-router-dom";

export default function SideBar({ children }) {
  const location = useLocation();

  return (
    <div className="">
      <div className="sticky top-0 z-50">
        <header className="bg-midnight text-white p-2">LIMbic -- Laboratory Information Management</header>
      </div>

      {location.pathname !== "/" ? (
        <div className="flex">
          <nav className="flex flex-col border-r-2 border-black w-36">
            <NavLink
              to="/projects"
              className={({ isActive }) => (isActive ? "bg-stone-500 text-white text-center p-4" : "text-center p-4")}
            >
              Projects
            </NavLink>
            <NavLink
              to="/clients"
              className={({ isActive }) => (isActive ? "bg-stone-500 text-white text-center p-4" : "text-center p-4")}
            >
              Clients
            </NavLink>
            <div className="mt-auto" />
            <NavLink
              to="/completed"
              className={({ isActive }) => (isActive ? "bg-stone-500 text-white text-center p-4" : "text-center p-4")}
            >
              Completed Projects
            </NavLink>

            <NavLink
              to="/trash"
              className={({ isActive }) => (isActive ? "bg-stone-500 text-white text-center p-4" : "text-center p-4")}
            >
              Trash
            </NavLink>
          </nav>
          <main className=" min-h-screen w-full flex flex-col flex-grow" id="page">
            {children}
          </main>
        </div>
      ) : (
        <div className="flex flex-col h-[92vh]" id="page">
          <main className="">{children}</main>
        </div>
      )}

      <div>
        <footer
          className={`${
            location.pathname !== "/"
              ? `flex justify-center bg-zinc-200 p-0.5`
              : `flex justify-center bg-zinc-200 p-0.5 fixed bottom-0 w-full`
          }`}
        >
          <p>Galen Ciszek</p>
          <p> &copy; 2023</p>
        </footer>
      </div>
    </div>
  );
}
