import React, { useState } from "react";
import ChatTab from "./ChatTab";

export default function App({ nodes }) {
  // Keep a map of messages per node
  const [chatHistory, setChatHistory] = useState({});

  const [currentNode, setCurrentNode] = useState(nodes[0]?.id);

  return (
    <div style={{ display: "flex" }}>
      <div style={{ flex: 1 }}>
        {nodes.map((node) => (
          <button key={node.id} onClick={() => setCurrentNode(node.id)}>
            {node.title}
          </button>
        ))}
      </div>
      <div style={{ flex: 2 }}>
        <ChatTab
          nodeId={currentNode}
          chatHistory={chatHistory}
          setChatHistory={setChatHistory}
        />
      </div>
    </div>
  );
}