"use client"

import { useState } from 'react';
import dynamic from "next/dynamic";
import "vis-network/styles/vis-network.css";

import GraphSidebar from "@/components/graph-sidebar";

const Graph = dynamic(() => import("react-vis-network-graph"), { ssr: false });

// Sample data with enhanced node information
const graphData = {
  nodes: [
    {
      id: "Cell Theory",
      label: "Cell Theory",
      connections: ["Prokaryotic Cells", "Eukaryotic Cells"],
      color: "#FFD700",
      description: "The cell theory states that all living things are composed of one or more cells, the cell is the basic unit of life, and all cells arise from pre-existing cells.",
      keywords: ["Basic unit of life", "Living organisms", "Cell division", "Microscopy"]
    },
    {
      id: "Prokaryotic Cells",
      label: "Prokaryotic Cells",
      color: "#FF6347",
      connections: ["Cell Theory", "Eukaryotic Cells"],
      description: "Cells that lack a membrane-bound nucleus and organelles. Their genetic material is freely suspended in the cytoplasm.",
      keywords: ["No nucleus", "Bacteria", "Archaea", "Simple structure"]
    },
    {
      id: "Eukaryotic Cells",
      label: "Eukaryotic Cells",
      color: "#4682B4",
      connections: ["Cell Theory", "Prokaryotic Cells"],
      description: "Cells that contain a membrane-bound nucleus and specialized organelles. Found in plants, animals, fungi, and protists.",
      keywords: ["Nucleus", "Organelles", "Complex structure", "Membrane-bound"]
    },
    {
      id: "DNA Structure",
      label: "DNA Structure",
      color: "#32CD32",
      connections: ["DNA Function"],
      description: "DNA is a double helix structure composed of nucleotides containing four bases: adenine, thymine, guanine, and cytosine.",
      keywords: ["Double helix", "Nucleotides", "Base pairs", "Genetic code"]
    },
  ],
  edges: [
    { from: "Cell Theory", to: "Prokaryotic Cells" },
    { from: "Cell Theory", to: "Eukaryotic Cells" },
    { from: "Prokaryotic Cells", to: "Eukaryotic Cells" },
    { from: "DNA Structure", to: "DNA Function" },
  ],
};

const options = {
  nodes: {
    shape: "dot",
    size: 20,
    font: { size: 16 },
  },
  edges: {
    arrows: {
      to: false
    },
    color: {
      color: "#999",
      highlight: "#555"
    },
    smooth: {
      type: "continuous"
    },
  },
  physics: {
    enabled: true
  },
  interaction: {
    dragNodes: true,
    dragView: true,
    zoomView: true
  },
};

function GraphComponent({ onNodeSelect }) {
  const handleNodeClick = (params) => {
    if (params.nodes.length > 0) {
      const nodeId = params.nodes[0];
      const selectedNode = graphData.nodes.find(node => node.id === nodeId);
      onNodeSelect(selectedNode);
    }
  };

  return (
      <div className="w-full h-full">
        <Graph
            graph={graphData}
            options={options}
            events={{ selectNode: handleNodeClick }}
        />
      </div>
  );
}

// Main Component
export default function MyGraph() {
  const [selectedNode, setSelectedNode] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleNodeSelect = (node) => {
    setSelectedNode(node);
    // Auto-open sidebar when a node is selected
    if (node && !sidebarOpen) {
      setSidebarOpen(true);
    }
  };

  return (
      <div className="relative w-screen h-screen bg-gray-50">
        <GraphComponent onNodeSelect={handleNodeSelect} />
        <div className="absolute top-0 right-0 h-screen">
          <GraphSidebar
              selectedNode={selectedNode}
              isOpen={sidebarOpen}
              onToggle={() => setSidebarOpen(!sidebarOpen)}
          />
        </div>
      </div>
  );
}