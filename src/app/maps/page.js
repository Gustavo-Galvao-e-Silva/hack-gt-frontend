"use client"
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import GraphCard from '@/components/graph-card';

export default function NotebookWorkspace() {
    const router = useRouter();
    const [workspaces, setWorkspaces] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

     useEffect(() => {
        const fetchWorkspaces = async () => {
            try {
                setLoading(true);
                const response = await fetch(`http://localhost:8000/workspaces/1`);
                if (!response.ok) {
                    throw new Error('Failed to fetch graph data');
                }
                const data = await response.json();
                setWorkspaces(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchWorkspaces();
    }, []);

    if (loading) return <div>Loading workspaces...</div>;
    if (error) return <div>Error: {error}</div>;

    const handleNotebookClick = (workspace) => {
        router.push(`/maps/${workspace.workspacesID}`);
    };

    return (
        <div className="min-h-screen bg-gray-50 p-8">
            <div className="max-w-4xl mx-auto">
                <div className="mb-8">
                    <h1 className="text-3xl font-light text-gray-900 mb-2">Your Workspaces</h1>
                    <p className="text-gray-500">Click on any notebook to open</p>
                </div>

                <div className="space-y-4">
                    {workspaces.map((workspace) => (
                        <GraphCard
                            key={workspace.workspacesID}
                            title={workspace.title}
                            onClick={() => handleNotebookClick(workspace)}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};