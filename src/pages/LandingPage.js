import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <>
      <div className="flex flex-col ">
        <div className="border-2 border-slate-400 rounded h-1/2 w-1/3 mx-auto mt-24">
          <div className="m-6">Login</div>
          <div id="user_pass_fields" className="m-8 flex flex-col">
            <div>User</div>
            <div>Pass</div>
            <button
              className="btn btn-blue mx-auto"
              onClick={() => {
                navigate("/projects");
              }}
            >
              Login
            </button>
          </div>
          <div id="test_buttons" className="m-8 flex justify-between">
            <button>TEST (manager)</button>
            <button>TEST (technician)</button>
          </div>
        </div>
      </div>
    </>
  );
}
