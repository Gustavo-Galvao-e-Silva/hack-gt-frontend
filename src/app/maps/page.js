"use client"
import { useRouter } from 'next/navigation';
import GraphCard from '@/components/graph-card';

export default function NotebookWorkspace() {
    const router = useRouter();

    const workspaces = [
        { id: 1, title: "My First Notebook" },
        { id: 2, title: "Data Analysis" },
        { id: 3, title: "ML Project" }
    ];

    const handleNotebookClick = (workspace) => {
        router.push(`/maps/${workspace.id}`);
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
                            key={workspace.id}
                            title={workspace.title}
                            onClick={() => handleNotebookClick(workspace)}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};