import React from "react";
import { NavLink, useLocation } from "react-router-dom";

export default function SideBar({ children }) {
    const location = useLocation();

    return (
        <div className="">
            <div className="sticky top-0 z-50">
                <header className="bg-slate-800 text-white p-2">
                    EnviroLab - Analytical Laboratory Database Management
                </header>
            </div>

            {location.pathname !== "/" ? (
                <div className="flex">
                    <nav className="flex flex-col border-2 border-slate-400 w-36">
                        <NavLink
                            to="/projects"
                            end
                            className={({ isActive }) =>
                                isActive ? "bg-slate-300 text-center p-4" : "text-center p-4"
                            }
                        >
                            Projects
                        </NavLink>
                        <NavLink
                            to="/technicians"
                            end
                            className={({ isActive }) =>
                                isActive ? "bg-slate-300 text-center p-4" : "text-center p-4"
                            }
                        >
                            Technicians
                        </NavLink>
                        <NavLink
                            to="/clients"
                            end
                            className={({ isActive }) =>
                                isActive ? "bg-slate-300 text-center p-4" : "text-center p-4"
                            }
                        >
                            Clients
                        </NavLink>
                        <NavLink
                            to="/managers"
                            end
                            className={({ isActive }) =>
                                isActive ? "bg-slate-300 text-center p-4" : "text-center p-4"
                            }
                        >
                            Managers
                        </NavLink>
                    </nav>
                    <main className=" h-screen w-full">{children}</main>
                </div>
            ) : (
                <main className="h-screen w-full">{children}</main>
            )}

            <div>
                <footer className="flex justify-center text-white bg-slate-800 p-0.5">
                    <p>Galen Ciszek</p>
                    <p> &copy; 2023</p>
                </footer>
            </div>
        </div>
    );
}
