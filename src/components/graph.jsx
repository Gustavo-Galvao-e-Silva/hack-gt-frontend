"use client"

import { useState } from 'react';
import dynamic from "next/dynamic";
import "vis-network/styles/vis-network.css";

import GraphSidebar from "@/components/graph-sidebar";

const Graph = dynamic(() => import("react-vis-network-graph"), { ssr: false });

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

function GraphComponent({ onNodeSelect, graphData}) {
    const handleNodeClick = (params) => {
        if (params.nodes.length > 0) {
            const nodeId = params.nodes[0];
            const selectedNode = graphData.nodes.find(node => node.id === nodeId);
            onNodeSelect(selectedNode);
        }
    };

    return (
        <div className="graph component w-full h-full">
            <Graph
                graph={graphData}
                options={options}
                events={{ selectNode: handleNodeClick }}
            />
        </div>
    );
}

// Main Component
export default function MyGraph({ graphData }) {
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
            <GraphComponent onNodeSelect={handleNodeSelect} graphData={graphData}  />
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