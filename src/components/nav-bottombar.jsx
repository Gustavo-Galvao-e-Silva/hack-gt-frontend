"use client"
import React, { useState } from 'react';
import { ChartNetwork, Upload } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function BottomNavBar() {
    const router = useRouter();
    const [activeTab, setActiveTab] = useState('upload');

    const navItems = [
        {
            id: 'upload',
            label: 'Upload',
            icon: Upload,
            href: '/'
        },
        {
            id: 'maps',
            label: 'Maps',
            icon: ChartNetwork,
            href: '/maps'
        }
    ];

    const handleNavigation = (itemId, href) => {
        setActiveTab(itemId);
        router.push(href);
    };

    return (
        <div className="min-h-screen bg-gray-50 relative">
            {/* Main content area - this would be your page content */}
            <div className="pb-20 p-6">
                <div className="max-w-md mx-auto">
                    <div className="bg-white rounded-lg p-6 shadow-sm">
                        <p className="text-gray-600">
                            This is your main content area. The bottom navigation bar will stay fixed
                            at the bottom of the screen while users scroll through your content.
                        </p>
                        <div className="mt-4 space-y-2">
                            {Array.from({ length: 10 }, (_, i) => (
                                <div key={i} className="h-16 bg-gray-100 rounded-lg flex items-center px-4">
                                    <span className="text-gray-500">Sample content item {i + 1}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Navigation Bar */}
            <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-50">
                <div className="max-w-md mx-auto px-4">
                    <div className="flex justify-around py-2">
                        {navItems.map((item) => {
                            const Icon = item.icon;
                            const isActive = activeTab === item.id;

                            return (
                                <button
                                    key={item.id}
                                    onClick={() => handleNavigation(item.id, item.href)}
                                    className={`flex flex-col items-center justify-center py-2 px-3 rounded-lg transition-all duration-200 min-w-0 ${
                                        isActive
                                            ? 'text-blue-600 bg-blue-50'
                                            : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                                    }`}
                                >
                                    <Icon
                                        size={24}
                                        className={`mb-1 transition-transform duration-200 ${
                                            isActive ? 'scale-110' : 'scale-100'
                                        }`}
                                    />
                                    <span className={`text-xs font-medium transition-colors duration-200 ${
                                        isActive ? 'text-blue-600' : 'text-gray-500'
                                    }`}>
                    {item.label}
                  </span>
                                    {isActive && (
                                        <div className="absolute bottom-0 w-8 h-1 bg-blue-600 rounded-full" />
                                    )}
                                </button>
                            );
                        })}
                    </div>
                </div>
            </nav>
        </div>
    );
};