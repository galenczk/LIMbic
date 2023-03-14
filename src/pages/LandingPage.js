import React from "react";
import axios from "axios"

export default function LandingPage() {
  
  async function AddToDb(){
    const response = await axios.post("http://localhost:3030/numbers", 42);
  } 
  
  
  
  
  return (
      <>
          <div className="flex">
              <div className="bg-blue-400 h-96 w-1/2 mx-auto mt-24">
                  Login Panel
                  <button onClick={async () => {AddToDb()}}
                    className="bg-white border-2 border-black m-4"
                  >Add Entry to Table</button>
              </div>
          </div>
      </>
  );
}
