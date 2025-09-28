export default function NodeInfoTab({ selectedNode }) {
    if (!selectedNode) {
        return (
            <div className="p-4 text-gray-500 text-center">
                <p>Select a node to view its information</p>
            </div>
        );
    }

    return (
        <div className="p-4 space-y-6">
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
    );
}