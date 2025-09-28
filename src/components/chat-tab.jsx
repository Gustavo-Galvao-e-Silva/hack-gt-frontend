import {useState} from "react";

export default function ChatTab() {
    const [text, setText] = useState('');

    return (
        <div className="p-4 h-full flex flex-col">
            <div className="flex-1 mb-4">
                <h2 className="text-lg font-semibold text-gray-700 mb-2">Notes</h2>
                <p className="text-sm text-gray-500 mb-3">Add your notes or observations here:</p>
                <div className="h-64 border border-gray-300 rounded">
          <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="w-full h-full p-3 border-none outline-none resize-none rounded"
              placeholder="Type your notes here..."
          />
                </div>
            </div>

            <div className="flex gap-2">
                <button
                    onClick={() => setText('')}
                    className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors text-sm"
                >
                    Clear
                </button>
                <button
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors text-sm"
                >
                    Save
                </button>
            </div>
        </div>
    );
}
