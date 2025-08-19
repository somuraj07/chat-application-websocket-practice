import React, { useEffect, useState } from "react";

let socket;

function Chat({ username }) {
  const [to, setTo] = useState("");
  const [text, setText] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    //backend url
    socket = new WebSocket("ws://localhost:4000");

    socket.onopen = () => {
      console.log("Connected to server ✅");
      socket.send(JSON.stringify({ type: "register", username }));
    };

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setMessages((prev) => [...prev, `${data.from}: ${data.text}`]);
    };

    return () => {
      socket.close();
    };
  }, [username]);

  const sendMessage = () => {
    if (text.trim() && to.trim()) {
      socket.send(
        JSON.stringify({ type: "chat", from: username, to, text })
      );
      setMessages((prev) => [...prev, `Me -> ${to}: ${text}`]);
      setText("");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
  <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-6 flex flex-col gap-4">
    <h2 className="text-center text-xl font-semibold text-gray-700">
      👋 Welcome, {username}
    </h2>

    {/* Recipient Input */}
    <input
      type="text"
      placeholder="Send to (username)"
      value={to}
      onChange={(e) => setTo(e.target.value)}
      className="p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-400 outline-none"
    />

    {/* Message Input + Button */}
    <div className="flex gap-2">
      <input
        type="text"
        placeholder="Enter message"
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="flex-1 p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-400 outline-none"
      />
      <button
        onClick={sendMessage}
        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold"
      >
        Send
      </button>
    </div>

    {/* Messages */}
    <div className="mt-2 border border-gray-200 rounded-lg p-3 h-64 overflow-y-auto bg-gray-50">
      <h3 className="text-gray-600 text-sm mb-2 font-medium">💬 Messages</h3>
      {messages.map((msg, i) => (
        <div
          key={i}
          className={`mb-2 p-2 rounded-lg max-w-xs ${
            msg.startsWith(username)
              ? "bg-green-200 ml-auto text-right"
              : "bg-gray-200 mr-auto text-left"
          }`}
        >
          {msg}
        </div>
      ))}
    </div>
  </div>
</div>

  );
}

export default Chat;
