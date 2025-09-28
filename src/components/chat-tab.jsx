"use client";
import React, { useState, useEffect, useRef } from "react";
import axios from "axios";

export default function ChatTab({ messages = [], setMessages, isLoading = false, setIsLoading }) {
  const [notes, setNotes] = useState("");
  const messagesEndRef = useRef(null);

  const agentId = "weatherAgent";

  // Auto-scroll to bottom when messages change
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async (text) => {
    if (!setIsLoading || !setMessages) {
      console.error('Missing required props: setIsLoading or setMessages');
      return;
    }
    
    setIsLoading(true);
    setMessages((msgs) => [...(msgs || []), { role: "user", content: text }]);
    
    try {
      const res = await axios.post(`http://localhost:4111/api/agents/${agentId}/generate`, {
        messages: [{ role: "user", content: text }],
      });
      
      console.log('Full response:', res.data);
      const reply = res.data.text || "No reply";
      
      setMessages((msgs) => [...(msgs || []), { role: "assistant", content: reply }]);
    } catch (err) {
      console.error('Error details:', err);
      setMessages((msgs) => [...(msgs || []), { role: "assistant", content: "Error: " + err.message }]);
    }
    setIsLoading(false);
  };

  return (
    <div className="flex flex-col h-full">
      {/* Chat Section - Top Half */}
      <div className="flex-1 flex flex-col border-b border-gray-200 min-h-0">
        <div className="bg-gray-50 px-4 py-2 border-b border-gray-200 flex-shrink-0">
          <h3 className="font-medium text-gray-700">AI Assistant</h3>
        </div>
        
        {/* Scrollable messages area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3 min-h-0">
          {messages.length === 0 && (
            <p className="text-gray-500 text-sm italic">No messages yet. Start typing!</p>
          )}
          {messages.map((msg, i) => (
            <div key={i} className={`p-3 rounded-lg flex-shrink-0 ${
              msg.role === "user" 
                ? "bg-blue-50 border-l-4 border-blue-400" 
                : "bg-green-50 border-l-4 border-green-400"
            }`}>
              <div className="font-medium text-sm mb-1 text-gray-700">
                {msg.role === "user" ? "You" : "Assistant"}
              </div>
              <div className="text-gray-800">{msg.content}</div>
            </div>
          ))}
          {isLoading && (
            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-3 rounded-lg flex-shrink-0">
              <div className="font-medium text-sm text-gray-700">Assistant</div>
              <div className="text-gray-600 italic">🤖 Thinking...</div>
            </div>
          )}
          {/* Invisible element to scroll to */}
          <div ref={messagesEndRef} />
        </div>
        
        {/* Fixed input area */}
        <div className="p-4 border-t border-gray-200 flex-shrink-0">
          <input
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            placeholder="Type a message and press Enter..."
            onKeyDown={(e) => {
              if (e.key === "Enter" && e.currentTarget.value.trim() !== "") {
                sendMessage(e.currentTarget.value);
                e.currentTarget.value = "";
              }
            }}
          />
        </div>
      </div>

      {/* Notes Section - Bottom Half
      <div className="flex-1 flex flex-col min-h-0">
        <div className="bg-gray-50 px-4 py-2 border-b border-gray-200 flex-shrink-0">
          <h3 className="font-medium text-gray-700">Personal Notes</h3>
        </div>
        
        <div className="flex-1 p-4 min-h-0">
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Write your notes here..."
            className="w-full h-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none resize-none"
          />
        </div>
      </div> */}
    </div>
  );
}