import React, { useState } from "react";
import Chat from "./Chat";

function App() {
  const [username, setUsername] = useState("");
  const [registered, setRegistered] = useState(false);

  const handleRegister = () => {
    if (username.trim()) {
      setRegistered(true);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
    {!registered ? (
      <div className="bg-white shadow-lg rounded-2xl p-8 w-96 text-center border border-gray-200">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          Enter your username
        </h2>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Type your username..."
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 mb-4"
        />
        <button
          onClick={handleRegister}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition duration-200 shadow-md"
        >
          Join
        </button>
      </div>
    ) : (
      <Chat username={username} />
    )}
  </div>
  
  );
}

export default App;
