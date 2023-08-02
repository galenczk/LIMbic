import React from "react";

export default function DeleteConfirmationModal({ message, confirmAction, cancelAction }) {
  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-lg p-8">
        <p className="text-gray-800">{message}</p>
        <div className="mt-8 flex justify-center">
        <button
          onClick={confirmAction}
          className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded mr-4 "
        >
          Delete
        </button>
        <div className="w-8" />
        <button
          onClick={cancelAction}
          className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
        >
          Cancel
        </button></div>
      </div>
    </div>
  );
}
