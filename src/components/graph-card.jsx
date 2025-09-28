export default function GraphCard({ title, onClick }) {
    return (
        <div
            className="group relative bg-white border border-gray-200 rounded-lg p-6 cursor-pointer transition-all duration-200 hover:border-gray-300 hover:shadow-md hover:-translate-y-1"
            onClick={onClick}
        >
            <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium text-gray-900 group-hover:text-gray-700 transition-colors duration-200">
                    {title}
                </h3>
                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                </div>
            </div>

            {/* Subtle bottom border accent */}
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-400 to-purple-400 opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded-b-lg"></div>
        </div>
    );
};