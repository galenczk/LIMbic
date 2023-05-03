import React from "react";
import { NavLink, useLocation } from "react-router-dom";

export default function SideBar({ children }) {
  const location = useLocation();

  return (
    <div className="">
      <div className="sticky top-0 z-50">
        <header className="bg-midnight text-white p-2">EnviroLab - Analytical Laboratory Database Management</header>
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
            <NavLink
              to="/techs"
              className={({ isActive }) => (isActive ? "bg-stone-500 text-white text-center p-4" : "text-center p-4")}
            >
              Technicians
            </NavLink>
            <NavLink
              to="/completed"
              className={({ isActive }) => (isActive ? "bg-stone-500 text-white text-center p-4" : "text-center p-4")}
            >
              Completed Projects
            </NavLink>
            <div className="mt-auto"/>
            <NavLink
              to="/trash"
              className={({ isActive }) => (isActive ? "bg-stone-500 text-white text-center p-4" : "text-center p-4")}
            >
              Trash
            </NavLink>
          </nav>
          <main className=" h-screen w-full flex flex-col flex-grow">{children}</main>
        </div>
      ) : (
        <main className="h-screen w-full">{children}</main>
      )}

      <div>
        <footer className="flex justify-center  bg-myGrey2 p-0.5">
          <p>Galen Ciszek</p>
          <p> &copy; 2023</p>
        </footer>
      </div>
    </div>
  );
}
