import { useState } from "react";
import NodeInfoTab from "@/components/node-info-tab";
import ChatTab from "@/components/chat-tab";

export default function GraphSidebar({ selectedNode, isOpen, onToggle }) {
    const [activeTab, setActiveTab] = useState('info');

    return (
        <div className="relative flex">
            {/* Toggle Button */}
            <button
                onClick={onToggle}
                className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-full bg-white border border-r-0 border-gray-300 rounded-l-md p-2 hover:bg-gray-50 transition-colors z-10 shadow-sm"
            >
                <svg
                    className={`w-4 h-4 text-gray-600 transition-transform duration-200 ${
                        isOpen ? 'rotate-180' : ''
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
            </button>

            {/* Sidebar Content */}
            <div className={`bg-white border-l border-gray-300 flex flex-col h-screen transition-all duration-300 ease-in-out ${
                isOpen ? 'w-80' : 'w-0'
            } overflow-hidden`}>
                {/* Tab Headers */}
                <div className="flex border-b border-gray-200 min-w-80">
                    <button
                        onClick={() => setActiveTab('info')}
                        className={`flex-1 py-3 px-4 text-sm font-medium transition-colors ${
                            activeTab === 'info'
                                ? 'bg-blue-50 text-blue-600 border-b-2 border-blue-600'
                                : 'text-gray-600 hover:text-gray-800 hover:bg-gray-50'
                        }`}
                    >
                        Node Info
                    </button>
                    <button
                        onClick={() => setActiveTab('notes')}
                        className={`flex-1 py-3 px-4 text-sm font-medium transition-colors ${
                            activeTab === 'notes'
                                ? 'bg-blue-50 text-blue-600 border-b-2 border-blue-600'
                                : 'text-gray-600 hover:text-gray-800 hover:bg-gray-50'
                        }`}
                    >
                        Notes
                    </button>
                </div>

                {/* Tab Content */}
                <div className="flex-1 overflow-y-auto min-w-80">
                    {activeTab === 'info' ? (
                        <NodeInfoTab selectedNode={selectedNode} />
                    ) : (
                        <ChatTab />
                    )}
                </div>
            </div>
        </div>
    );
}