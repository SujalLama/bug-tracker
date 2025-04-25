import React, { useEffect, useRef, useState } from "react";
import socket from "../socket";
import { Message } from "../types";

const ChatModal = ({
  projectId,
  onClose,
}: {
  projectId: string;
  onClose: () => void;
}) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);

  useEffect(() => {
    function getCurrentUserId() {
      const currentUserId = localStorage.getItem("userId");
      setCurrentUserId(currentUserId);
    }
    getCurrentUserId();
  }, []);

  useEffect(() => {
    socket.emit("joinProjectChat", projectId);

    socket.on("projectMessageHistory", setMessages);
    socket.on("newMessage", (msg: Message) => {
      setMessages((prev) => [...prev, msg]);
    });

    return () => {
      socket.off("projectMessageHistory");
      socket.off("newMessage");
    };
  }, [projectId]);

  const bottomRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = () => {
    if (!input.trim()) return;
    const senderId = localStorage.getItem("userId");
    socket.emit("sendMessage", { content: input, projectId, senderId });
    setInput("");
  };
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-6 w-full max-w-2xl shadow-lg flex flex-col max-h-[90vh]">
        <div className="flex justify-between items-center border-b pb-3 mb-4">
          <h3 className="text-xl font-bold text-gray-800">💬 Project Chat</h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-red-500 text-lg transition"
          >
            ✖
          </button>
        </div>

        <div className="flex-1 overflow-y-auto space-y-2 mb-4 pr-2 flex flex-col">
          {messages.map((m) => (
            <div
              key={m.id}
              className={`inline-block px-4 py-2 rounded-lg shadow-sm max-w-fit ${
                m.senderId === currentUserId
                  ? "bg-blue-600 text-white self-end"
                  : "bg-gray-100 text-gray-800 self-start"
              }`}
            >
              <div className="text-xs font-semibold mb-1 opacity-70">
                {m.senderId === currentUserId ? "You" : m.senderId}
              </div>
              <div className="text-sm">{m.content}</div>
            </div>
          ))}
          <div ref={bottomRef} />
        </div>

        <div className="flex gap-2">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            placeholder="Type your message..."
            className="flex-1 border border-gray-300 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={sendMessage}
            className="bg-blue-600 text-white rounded-full px-5 py-2 hover:bg-blue-700 transition"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-6 w-full max-w-2xl shadow-lg flex flex-col max-h-[90vh]">
        <div className="flex justify-between items-center border-b pb-3 mb-4">
          <h3 className="text-xl font-bold text-gray-800">💬 Project Chat</h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-red-500 text-lg transition"
          >
            ✖
          </button>
        </div>

        <div className="flex-1 overflow-y-auto space-y-2 mb-4 pr-2">
          {messages.map((m) => (
            <div
              key={m.id}
              className={`inline-block px-4 py-2 rounded-lg shadow-sm max-w-fit ${
                m.senderId === currentUserId
                  ? "bg-blue-600 text-white self-end ml-auto"
                  : "bg-gray-100 text-gray-800 self-start mr-auto"
              }`}
            >
              <div className="text-xs font-semibold mb-1 opacity-70">
                {m.senderId === currentUserId ? "You" : m.senderId}
              </div>
              <div className="text-sm">{m.content}</div>
            </div>
          ))}
        </div>

        <div className="flex gap-2">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            placeholder="Type your message..."
            className="flex-1 border border-gray-300 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={sendMessage}
            className="bg-blue-600 text-white rounded-full px-5 py-2 hover:bg-blue-700 transition"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatModal;
