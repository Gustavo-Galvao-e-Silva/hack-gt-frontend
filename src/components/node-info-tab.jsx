"use client";
import React, { useState } from "react";

export default function NodeInfoTab({ selectedNode }) {
  const [notes, setNotes] = useState("");

  if (!selectedNode) {
    return (
      <div className="flex items-center justify-center h-full p-4 text-gray-500 text-center">
        <p>Select a node to view its information</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      {/* Node Info Section - Top Half */}
      <div className="flex-1 flex flex-col border-b border-gray-200">
        <div className="bg-gray-50 px-4 py-2 border-b border-gray-200">
          <h3 className="font-medium text-gray-700">Node Information</h3>
        </div>
        
        <div className="flex-1 overflow-y-auto p-4 space-y-6">
          {/* Title */}
          <div>
            <h1 className="text-2xl font-bold text-gray-800 mb-2">{selectedNode.label}</h1>
          </div>

          {/* Description */}
          <div>
            <h2 className="text-lg font-semibold text-gray-700 mb-2">Description</h2>
            <p className="text-gray-600 leading-relaxed">{selectedNode.description}</p>
          </div>

          {/* Connections */}
          <div>
            <h2 className="text-lg font-semibold text-gray-700 mb-2">Connections</h2>
            <div className="space-y-1">
              {selectedNode.connections?.map((connection, index) => (
                <div key={index} className="bg-blue-50 px-3 py-2 rounded text-blue-700 text-sm">
                  {connection}
                </div>
              ))}
            </div>
          </div>

          {/* Keywords */}
          <div>
            <h2 className="text-lg font-semibold text-gray-700 mb-2">Keywords</h2>
            <div className="flex flex-wrap gap-2">
              {selectedNode.keywords?.map((keyword, index) => (
                <span key={index} className="bg-gray-200 px-2 py-1 rounded-full text-xs text-gray-700">
                  {keyword}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Notes Section - Bottom Half
      <div className="flex-1 flex flex-col">
        <div className="bg-gray-50 px-4 py-2 border-b border-gray-200">
          <h3 className="font-medium text-gray-700">Node Notes</h3>
        </div>
        
        <div className="flex-1 p-4">
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Write notes about this node..."
            className="w-full h-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none resize-none"
          />
        </div>
      </div> */}
    </div>
  );
}